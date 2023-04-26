package org.example;

import com.google.gson.Gson;
import org.example.StatObjects.ExceptionStatistic;
import org.example.StatObjects.ExecutionStatistic;
import org.example.StatObjects.Fstat;
import org.example.StatObjects.PathStatistic;

import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;

public class DataStore {
    static boolean mainStatus = false;
    static Gson gson = new Gson();
    static ApiGateway apiGateway = new ApiGateway("https://sourcem.onrender.com/");
    static ArrayList<Fstat> fStatistics = new ArrayList<>();
    static HashMap<ArrayList<String>, PathStatistic> pathCounter = new HashMap<>();
    static HashMap<String, ExecutionStatistic> executionCounter = new HashMap<>();
    static HashMap<ArrayList<String>, ExceptionStatistic> exceptionMap = new HashMap<>();

    public synchronized static void setMainStatus(boolean status) {
        if (status) {
            mainStatus = true;

            Thread apiThread = new Thread(() -> {
                while (mainStatus) {
                    try {
                        System.out.println("In the wrong place");
                        pushStatistic();
                        Thread.sleep(10000);
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    }
                }
                pushStatistic();
            });
            apiThread.start();

            System.out.println("Main started");
        } else {
            mainStatus = false;
            System.out.println("Main ended");
        }
    }

    static synchronized void pushStatistic() {
        System.out.println("Pushing statistic");
        if (pathCounter.size() > 0) {
            String json = gson.toJson(pathCounter.values());
            apiGateway.send("path-counter/add-path-counter/", json);
            pathCounter.clear();
            saveStatistic(json, "pathStat.json");
        }
        if (executionCounter.size() > 0) {
            String json = gson.toJson(executionCounter.values());
            apiGateway.send("exec-time/add-func-exec/", json);
            executionCounter.clear();
            saveStatistic(json, "executionStat.json");
        }
        if (exceptionMap.size() > 0) {
            String json = gson.toJson(exceptionMap.values());
            apiGateway.send("exception-throw/add-func-exception/", json);
            exceptionMap.clear();
            saveStatistic(json, "exceptionStat.json");
        }
        if (fStatistics.size() > 0) {
            String json = gson.toJson(fStatistics);
            apiGateway.send("funcn-cycle/add-func-cycle/", json);
            fStatistics.clear();
            saveStatistic(json, "fStat.json");
        }
    }

    static synchronized void saveStatistic(String json, String fileName) {
        try {
            PrintWriter pw = new PrintWriter(fileName);
            pw.write(json);
            pw.close();
        } catch (Exception ignored) {
        }
    }

    public synchronized static void updateFStatistic(Fstat functionStatistic) {
        fStatistics.add(functionStatistic);
    }

    public synchronized static void incrementPath(ArrayList<String> path) {
        if (pathCounter.containsKey(path)) {
            pathCounter.get(path).incrementCount();
        } else {
            pathCounter.put(path, new PathStatistic(path.get(0), path.get(1)));
        }
    }

    public synchronized static void incrementExecutionCounter(String functionName) {
        if (executionCounter.containsKey(functionName)) {
            executionCounter.get(functionName).incrementCount();
        } else {
            executionCounter.put(functionName, new ExecutionStatistic(functionName));
        }
    }

    public synchronized static void logExecutionTime(String functionName, long time) {
        if (executionCounter.containsKey(functionName)) {
            executionCounter.get(functionName).incrementCount();
        } else {
            executionCounter.put(functionName, new ExecutionStatistic(functionName));
        }
        executionCounter.get(functionName).addTime(time);
    }

    public synchronized static void logException(ArrayList<String> exceptions) {
        if (exceptionMap.containsKey(exceptions)) {
            exceptionMap.get(exceptions).addTimestamp(LocalDateTime.now().toString());
        } else {
            exceptionMap.put(exceptions, new ExceptionStatistic(exceptions.get(0), exceptions.get(1)));
        }
    }
}
