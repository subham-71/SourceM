package org.example.StatObjects;

import java.util.ArrayList;

public class FunctionStatistic {
    public String                       functionName;
    public long                         startTime;
    public long                         endTime;
    public ArrayList<FunctionStatistic> children;

    public FunctionStatistic(String functionName, long startTime) {
        this.functionName = functionName;
        this.startTime = startTime;
        this.children = new ArrayList<>()  ;
    }

    public String toString() {
        if (children.isEmpty()) {
            return String.format("%s: %d ", functionName, endTime - startTime);
        } else {
            StringBuilder sb = new StringBuilder();
            sb.append(String.format("%s: %d ", functionName, endTime - startTime));
            for (FunctionStatistic child : children) {
                sb.append(child.toString()).append("\n");
            }
            return sb.toString();
        }
    }
}