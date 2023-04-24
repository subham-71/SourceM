package org.example;

import com.google.gson.Gson;
import org.example.StatObjects.*;

import java.io.File;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;

public class DataStore {
    static Gson gson = new Gson();

    static ApiGateway apiGateway = new ApiGateway("http://localhost:8000/");
    static ArrayList<FunctionStatistic> functionStatistics = new ArrayList<>();
    static ArrayList<Fstat> fStatistics = new ArrayList<>();
    static HashMap<ArrayList<String>, PathStatistic> pathCounter = new HashMap<>();
    static HashMap<String, ExecutionStatistic> executionCounter = new HashMap<>();

    static void saveStatistic(String json, String fileName) {
        try {
            PrintWriter pw = new PrintWriter(new File(fileName));
            pw.write(json);
            pw.close();
        } catch (Exception ignored) { }
    }

    static HashMap<ArrayList<String>, ExceptionStatistic> exceptionMap = new HashMap<>();

    public static void updateFunctionStatistic(FunctionStatistic functionStatistic) {
        functionStatistics.add(functionStatistic);
        Gson gson = new Gson();

        String json = gson.toJson(functionStatistics);
//        System.out.println(json);
        saveStatistic(json, "functionStat.json");

    }

    public static void updateFStatistic(Fstat functionStatistic) {
        fStatistics.add(functionStatistic);
        Gson gson = new Gson();

        String json = gson.toJson(fStatistics);
//        System.out.println(json);
        saveStatistic(json, "fStat.json");

    }

    public static void incrementPath(ArrayList<String> path) {
        if (pathCounter.containsKey(path)) {
            pathCounter.get(path).incrementCount();
        } else {
            pathCounter.put(path, new PathStatistic(path.get(0), path.get(1)));
        }

        String json = gson.toJson(pathCounter.values());

        saveStatistic(json, "pathStat.json");
    }

    public static void incrementExecutionCounter(String functionName) {
        if (executionCounter.containsKey(functionName)) {
            executionCounter.get(functionName).incrementCount();
        } else {
            executionCounter.put(functionName, new ExecutionStatistic(functionName));
        }
    }

    public static void logExecutionTime(String functionName, long time) {
        executionCounter.get(functionName).addTime(time);
        String json = gson.toJson(executionCounter.values());

        saveStatistic(json, "executionStat.json");
        if (executionCounter.size() > 5) {
            apiGateway.send("exec-time/add-func-exec/", json);
            executionCounter.clear();
        }
    }

    public static void logException(ArrayList<String> exceptions) {
        if (exceptionMap.containsKey(exceptions)) {
            exceptionMap.get(exceptions).addTimestamp(LocalDateTime.now().toString());
        } else {
            exceptionMap.put(exceptions, new ExceptionStatistic(exceptions.get(0), exceptions.get(1)));
        }
        Gson gson = new Gson();
        String json = gson.toJson(exceptionMap.values());

        saveStatistic(json, "exceptionStat.json");
        if (exceptionMap.size() > 5) {
            apiGateway.send("exception/add-exception/", json);
            exceptionMap.clear();
        }
    }
}
