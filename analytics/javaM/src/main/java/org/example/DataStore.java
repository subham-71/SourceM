package org.example;

import com.google.gson.Gson;
import org.example.StatObjects.ExceptionStatistic;
import org.example.StatObjects.ExecutionStatistic;
import org.example.StatObjects.FunctionStatistic;
import org.example.StatObjects.PathStatistic;

import java.io.File;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;

public class DataStore {
    static Gson gson = new Gson();
    static ArrayList<FunctionStatistic> functionStatistics = new ArrayList<>();
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

    public static void addFunctionStatistic(FunctionStatistic functionStatistic) {
        functionStatistics.add(functionStatistic);
        Gson gson = new Gson();

        String json = gson.toJson(functionStatistics);

        saveStatistic(json, "functionStat.json");

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
    }
}
