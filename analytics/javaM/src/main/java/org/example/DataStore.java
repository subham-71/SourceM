package org.example;

import java.util.ArrayList;
import java.util.HashMap;

public class DataStore {
    static ArrayList<FunctionStatistic> functionStatistics = new ArrayList<>();
    static HashMap<ArrayList<String>, Integer> pathCounter = new HashMap<>();
    static HashMap<String, Long> executionTimer = new HashMap<>();
    static HashMap<String, Integer> executionCounter = new HashMap<>();
    static HashMap<String, HashMap<String, Integer>> throwMap = new HashMap<>();


    public static void addFunctionStatistic(FunctionStatistic functionStatistic) {
        functionStatistics.add(functionStatistic);
        System.out.println(functionStatistic.toString());
    }

    public static void incrementPath(ArrayList<String> path) {
        if (pathCounter.containsKey(path)) {
            pathCounter.put(path, pathCounter.get(path) + 1);
        } else {
            pathCounter.put(path, 1);
        }
//        System.out.println( path.get(0) + " " + path.get(1) + " " + pathCounter.get( path ) );
    }

    public static void incrementExecutionCounter(String functionName) {
        if (executionCounter.containsKey(functionName)) {
            executionCounter.put(functionName, executionCounter.get(functionName) + 1);
        } else {
            executionCounter.put(functionName, 1);
        }
        System.out.println(functionName + " " + executionCounter.get(functionName));
    }

    public static void logExecutionTime(String functionName, long time) {
        executionTimer.put(functionName, time);
        System.out.println(functionName + " " + time);
    }

    public static void logException(String functionName, String exceptionName) {
        if (throwMap.containsKey(functionName)) {
            HashMap<String, Integer> exceptionMap = throwMap.get(functionName);
            if (exceptionMap.containsKey(exceptionName)) {
                exceptionMap.put(exceptionName, exceptionMap.get(exceptionName) + 1);
            } else {
                exceptionMap.put(exceptionName, 1);
            }
        } else {
            HashMap<String, Integer> exceptionMap = new HashMap<String, Integer>();
            exceptionMap.put(exceptionName, 1);
            throwMap.put(functionName, exceptionMap);
        }
    }

}
