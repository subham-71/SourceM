package org.example.AOPDeps;

public class ExecutionStatistic {
    String functionName;
    int executionCount;
    long timeExecuted;

    public ExecutionStatistic(String functionName) {
        this.functionName = functionName;
        this.executionCount = 1;
        this.timeExecuted = 0;
    }

    public void incrementCount() {
        this.executionCount++;
    }

    public void addTime(long time) {
        this.timeExecuted += time;
    }
}
