package org.example.AOPDeps;

/**
 * PathStatistic
 * This class is used to store data about paths that are executed
 */
public class PathStatistic {
    String caller;
    String callee;
    int callCount;

    /**
     * Constructor for PathStatistic
     * @param caller the name of the caller function
     * @param callee the name of the callee function
     */
    public PathStatistic(String caller, String callee) {
        this.caller = caller;
        this.callee = callee;
        this.callCount = 1;
    }

    /**
     * Function to increment the path count between the caller and callee
     */
    public void incrementCount() {
        this.callCount++;
    }
}
