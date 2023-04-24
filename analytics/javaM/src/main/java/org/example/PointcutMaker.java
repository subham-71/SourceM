package org.example;

import com.google.gson.Gson;

import java.io.FileReader;
import java.util.ArrayList;

class ProfilerConfig {
    Boolean enabled;
    long interval;
    ArrayList<String> classes;
}

class SecurityConfig {
    Boolean enabled;
    ArrayList<String> classes;
}

class Config {
    String app_id;
    String packageName;
    ProfilerConfig profilerConfig;
    SecurityConfig securityConfig;
}

public class PointcutMaker {
    final static String builder = "public abstract aspect BaseAspect {\n" +
        "    public pointcut exclude():\n" +
        "        execution(* org.example.DataStore.*(..))\n" +
        "        || execution(* org.example.StatObjects.FunctionStatistic.*(..))\n" +
        "        || execution(* org.example.StatObjects.PathStatistic.*(..))\n" +
        "        || execution(* org.example.StatObjects.ExecutionStatistic.*(..))\n" +
        "        || execution(* org.example.StatObjects.ExceptionStatistic.*(..));\n" +
        "    public pointcut profiler():\n" +
        "        %s;\n" +
        "    public pointcut security():\n" +
        "        %s;\n" +
        "}\n";

    public static void main1(String[] args) {
        System.out.println("Hello World!");
        Gson gson = new Gson();
        try {
            Config config = gson.fromJson(new FileReader("manifest.json"), Config.class);

            StringBuilder sb = new StringBuilder();
            if (!config.profilerConfig.enabled) sb.append(String.format("!within(%s..*)", config.packageName));
            else {
                for (String className : config.profilerConfig.classes) {
                    if (sb.length() > 0) sb.append(" || ");
                    sb.append(String.format("call(* %s.*(..))\n" +
                        "|| (call(* *(..)) && within(%s))", className, className));
                }
            }

            System.out.println(sb.toString());

            StringBuilder sb2 = new StringBuilder();
            if (!config.profilerConfig.enabled) sb2.append(String.format("!within(%s..*)", config.packageName));
            else {
                for (String className : config.securityConfig.classes) {
                    if (sb2.length() > 0) sb2.append(" || ");
                    sb2.append(String.format("call(* %s.*(..))", className));
                }
            }
            sb2.append(" && args(..)");
            String baseAspect = String.format(builder, sb, sb2);
            System.out.println(baseAspect);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
