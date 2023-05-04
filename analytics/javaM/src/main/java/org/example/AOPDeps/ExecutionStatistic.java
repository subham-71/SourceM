package org.example.AOPDeps;

/**
 * ExecutionStatistic
 * This class is used to store data about functions that are executed
 */
public class ExecutionStatistic {
    String functionName;
    int executionCount;
    long timeExecuted;

    /**
     * Constructor for ExecutionStatistic
     * @param functionName the name of the function
     */
    public ExecutionStatistic(String functionName) {
        this.functionName = functionName;
        this.executionCount = 1;
        this.timeExecuted = 0;
    }

    /**
     * Function to increment the execution count
     */
    public void incrementCount() {
        this.executionCount++;
    }

    /**
     * Function to add time to the timeExecuted variable
     * @param time the time to be added
     */
    public void addTime(long time) {
        this.timeExecuted += time;
    }
}
