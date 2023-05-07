package org.example.AOPDeps;

import com.google.gson.Gson;

import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;

public class DataStore {
    public static Thread apiThread;
    public static boolean mainStatus = false;
    public static Gson gson = new Gson();
//  public   static ApiGateway apiGateway = new ApiGateway("https://sourcem.onrender.com/");
    public static ApiGateway apiGateway = new ApiGateway("http://143.244.130.133:8000/");
    public static ArrayList<Fstat> fStatistics = new ArrayList<>();
    public static HashMap<ArrayList<String>, PathStatistic> pathCounter = new HashMap<>();
    public static HashMap<String, ExecutionStatistic> executionCounter = new HashMap<>();
    public static HashMap<ArrayList<String>, ExceptionStatistic> exceptionMap = new HashMap<>();

    public static void setApiGateway(ApiGateway apiGateway) {
        DataStore.apiGateway = apiGateway;
    }

    public static void setMainStatus(boolean status) {
        if (status) {
            mainStatus = true;

            apiThread = new Thread(() -> {
                while (mainStatus) {
                    try {

                        pushStatistic();
                        Thread.sleep(10000);
                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    }
                }
                pushStatistic();
            });
            apiThread.start();
        } else {
            mainStatus = false;
        }
    }

    static synchronized void pushPathCounter() {
        String json = gson.toJson(pathCounter.values());
        apiGateway.send("path-counter/add-path-counter/", json);
        pathCounter.clear();
    }

    static synchronized void pushExecutionCounter() {
        String json = gson.toJson(executionCounter.values());
        apiGateway.send("exec-time/add-func-exec/", json);
        executionCounter.clear();
    }

    static synchronized void pushExceptionMap() {
        String json = gson.toJson(exceptionMap.values());
        apiGateway.send("exception-throw/add-func-exception/", json);
        exceptionMap.clear();
    }

    static synchronized void pushFStatistics() {
        String json = gson.toJson(fStatistics);
        apiGateway.send("funcn-cycle/add-func-cycle/", json);
        fStatistics.clear();
    }

    static void pushStatistic() {
        System.out.println("Pushing statistic");
        if (pathCounter.size() > 0) {
            pushPathCounter();
        }
        if (executionCounter.size() > 0) {
            pushExecutionCounter();
        }
        if (exceptionMap.size() > 0) {
            pushExceptionMap();
        }
        if (fStatistics.size() > 0) {
            pushFStatistics();
        }
    }

    public static void updateFStatistic(Fstat functionStatistic) {
        fStatistics.add(functionStatistic);
    }

    public static void incrementPath(ArrayList<String> path) {
        if (pathCounter.containsKey(path)) {
            pathCounter.get(path).incrementCount();
        } else {
            pathCounter.put(path, new PathStatistic(path.get(0), path.get(1)));
        }
    }

    public static void incrementExecutionCounter(String functionName) {
        if (executionCounter.containsKey(functionName)) {
            executionCounter.get(functionName).incrementCount();
        } else {
            executionCounter.put(functionName, new ExecutionStatistic(functionName));
        }
    }

    public static void logExecutionTime(String functionName, long time) {
        if (executionCounter.containsKey(functionName)) {
            executionCounter.get(functionName).incrementCount();
        } else {
            executionCounter.put(functionName, new ExecutionStatistic(functionName));
        }
        executionCounter.get(functionName).addTime(time);
    }

    public static void logException(ArrayList<String> exceptions) {
        if (exceptionMap.containsKey(exceptions)) {
            exceptionMap.get(exceptions).addTimestamp(LocalDateTime.now().toString());
        } else {
            exceptionMap.put(exceptions, new ExceptionStatistic(exceptions.get(0), exceptions.get(1)));
        }
    }
}
