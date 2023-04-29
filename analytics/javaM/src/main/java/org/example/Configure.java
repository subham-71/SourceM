package org.example;

import com.google.gson.Gson;

import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

class ProfilerConfig {
    ArrayList<String> args;
}

class Config {
    String packageName;
    ProfilerConfig profilerConfig;
}

public class Configure {
    final static String baseBuilder = "package org.example.AOPDeps.Aspects;\n" +
        "public abstract aspect BaseAspect {\n" +
        "    public pointcut exclude():\n" +
        "       execution(* *..AOPDeps..*(..));\n" +
        "    public pointcut profile():\n" +
        "        %s;\n" +
        "}";

    final static String appIdBuilder = "package org.example.AOPDeps;\n" +
        "public class AppId {\n" +
        "    public static final String APP_ID = \"%s\";\n" +
        "}";

    public static String profilerPointcut(ProfilerConfig config) {
        StringBuilder sb = new StringBuilder();

        if (config.args.size() == 0) return "!execution(* *(..))";

        for (String className : config.args) {
            if (sb.length() > 0) sb.append(" || ");
            sb.append(String.format("execution(* *..%s..*(..))", className));
        }

        return sb.toString();
    }

    public static void baseAspectMaker(String configPath, String outputPath) {
        Gson gson = new Gson();
        try {
            String profilerPointcut = "execution(* *(..))";

            try {
                Config config = gson.fromJson(new FileReader(configPath), Config.class);
                profilerPointcut = profilerPointcut(config.profilerConfig);
            } catch (Exception e) {
                System.out.println("config.json not found, using default config");
            }

            String baseAspect = String.format(baseBuilder, profilerPointcut);
            // Write baseAspect to AOPDeps/Aspect/BaseAspect.aj

            PrintWriter out = new PrintWriter(outputPath);
            out.println(baseAspect);
            out.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void appIdClassMaker(String AppId, String outputPath) {
        try {
            String AppIdClass = String.format(appIdBuilder, AppId);
            // Write AppIdClass to AOPDeps/AppId.java
            PrintWriter out = new PrintWriter(outputPath);
            out.println(AppIdClass);
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

//    public static void main(String[] args) {
//        baseAspectMaker("config.json", ".\\src\\main\\java\\org\\example\\AOPDeps\\Aspects\\BaseAspect.aj");
//        appIdClassMaker("org.academic", ".\\src\\main\\java\\org\\example\\AOPDeps\\AppId.java");
//    }
}