package org.example.AOPDeps;

import com.google.gson.Gson;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * Class to store data statically while the program runs
 * This class is used to store data that is sent to the API endpoint
 */
public class DataStore {
    public static Thread apiThread;
    public static boolean mainStatus = false;
    public static Gson gson = new Gson();
    public static ApiGateway apiGateway = new ApiGateway("http://143.244.130.133:8000/");
    public static ArrayList<Fstat> fStatistics = new ArrayList<>();
    public static HashMap<ArrayList<String>, PathStatistic> pathCounter = new HashMap<>();
    public static HashMap<String, ExecutionStatistic> executionCounter = new HashMap<>();
    public static HashMap<ArrayList<String>, ExceptionStatistic> exceptionMap = new HashMap<>();

    /**
     * Set the ApiGateway object to be used to send data to the API endpoint
     * @param apiGateway the ApiGateway object to be used to send data to the API endpoint
     */
    public static void setApiGateway(ApiGateway apiGateway) {
        DataStore.apiGateway = apiGateway;
    }

    /**
     * Set the mainStatus to true or false
     * @param status the status to set the mainStatus to
     */
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

    /**
     * Function to push path count to the database
     */
    static synchronized void pushPathCounter() {
        String json = gson.toJson(pathCounter.values());
        apiGateway.send("path-counter/add-path-counter/", json);
        pathCounter.clear();
    }

    /**
     * Function to push execution count to the database
     */
    static synchronized void pushExecutionCounter() {
        String json = gson.toJson(executionCounter.values());
        apiGateway.send("exec-time/add-func-exec/", json);
        executionCounter.clear();
    }

    /**
     * Function to push exception count to the database
     */
    static synchronized void pushExceptionMap() {
        String json = gson.toJson(exceptionMap.values());
        apiGateway.send("exception-throw/add-func-exception/", json);
        exceptionMap.clear();
    }

    /**
     * Function to push function statistics to the database
     */
    static synchronized void pushFStatistics() {
        String json = gson.toJson(fStatistics);
        apiGateway.send("funcn-cycle/add-func-cycle/", json);
        fStatistics.clear();
    }

    /**
     * Function to push all statistics to the database
     */
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

    /**
     * Function to add function statistics to the fStatistics array
     * this function is called by the Aspect class
     * @param functionStatistic the function statistics to be added
     */
    public static void updateFStatistic(Fstat functionStatistic) {
        fStatistics.add(functionStatistic);
    }

    /**
     * Function to increment the path counter
     * this function is called by the Aspect class
     * @param path the path to be incremented
     */
    public static void incrementPath(ArrayList<String> path) {
        if (pathCounter.containsKey(path)) {
            pathCounter.get(path).incrementCount();
        } else {
            pathCounter.put(path, new PathStatistic(path.get(0), path.get(1)));
        }
    }

    /**
     * Function to increment the execution counter
     * this function is called by the Aspect class
     * @param functionName the function name to be incremented
     */
    public static void incrementExecutionCounter(String functionName) {
        if (executionCounter.containsKey(functionName)) {
            executionCounter.get(functionName).incrementCount();
        } else {
            executionCounter.put(functionName, new ExecutionStatistic(functionName));
        }
    }

    /**
     * Function to log the execution time of a function
     * this function is called by the Aspect class
     * @param functionName the function name to be logged
     * @param time the execution time of the function
     */
    public static void logExecutionTime(String functionName, long time) {
        if (executionCounter.containsKey(functionName)) {
            executionCounter.get(functionName).incrementCount();
        } else {
            executionCounter.put(functionName, new ExecutionStatistic(functionName));
        }
        executionCounter.get(functionName).addTime(time);
    }

    /**
     * Function to log an exception
     * this function is called by the Aspect class
     * @param exceptions the exception to be logged
     */
    public static void logException(ArrayList<String> exceptions) {
        if (exceptionMap.containsKey(exceptions)) {
            exceptionMap.get(exceptions).addTimestamp(LocalDateTime.now().toString());
        } else {
            exceptionMap.put(exceptions, new ExceptionStatistic(exceptions.get(0), exceptions.get(1)));
        }
    }
}
