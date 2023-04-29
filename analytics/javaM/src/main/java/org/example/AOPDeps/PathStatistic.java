package org.example.AOPDeps;

public class PathStatistic {
    String caller;
    String callee;
    int callCount;

    public PathStatistic(String caller, String callee) {
        this.caller = caller;
        this.callee = callee;
        this.callCount = 1;
    }

    public void incrementCount() {
        this.callCount++;
    }

    public int getCount() {
        return this.callCount;
    }
}
