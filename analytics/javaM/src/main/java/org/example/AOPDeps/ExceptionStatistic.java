package org.example.AOPDeps;

import java.time.LocalDateTime;
import java.util.ArrayList;

/**
 * ExceptionStatistic
 * This class is used to store data about exceptions that are thrown
 */
public class ExceptionStatistic {
    String exceptionClass;
    String functionName;
    ArrayList<String> timestamps;

    /**
     * Constructor for ExceptionStatistic
     * @param exceptionClass the class of the exception
     * @param functionName the function that the exception was thrown in
     */
    public ExceptionStatistic(String exceptionClass, String functionName) {
        this.exceptionClass = exceptionClass;
        this.functionName = functionName;
        this.timestamps = new ArrayList<>();
        this.timestamps.add(LocalDateTime.now().toString());
    }

    /**
     * add a timestamp to the timestamps array
     * @param timestamp the timestamp to be added
     */
    public void addTimestamp(String timestamp) {
        timestamps.add(timestamp);
    }
}
