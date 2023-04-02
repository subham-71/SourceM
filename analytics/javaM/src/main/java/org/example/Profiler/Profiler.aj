package org.example.Profiler;

import java.util.ArrayList;
import java.util.Stack;

class FunctionStatistic {
    String functionName;
    long startTime;
    long endTime;
    ArrayList<FunctionStatistic> children;

    FunctionStatistic(String functionName, long startTime) {
        this.functionName = functionName;
        this.startTime = startTime;
        this.children = new ArrayList<>();
    }

    public String toString() {
        if (children.isEmpty()) {
            return String.format("%s: %d", functionName, endTime - startTime);
        } else {
            StringBuilder sb = new StringBuilder();
            sb.append(String.format("%s: %d", functionName, endTime - startTime));
            for (FunctionStatistic child : children) {
                sb.append(child.toString()).append("\n");
            }
            return sb.toString();
        }
    }
}

public aspect Profiler {
    static Stack<FunctionStatistic> callStack = new Stack<>();

    pointcut profile(): execution(* *(..));
    pointcut exclude(): execution(* FunctionStatistic.*(..));

    before(): profile() && !exclude() {
        FunctionStatistic functionStatistic = new FunctionStatistic(
            thisJoinPoint.getSignature().getName(), System.nanoTime());
        System.out.println("Calling function: " + functionStatistic.functionName);
        callStack.push(functionStatistic);
    }

    after() returning() : profile() && !exclude() {
        if (callStack.isEmpty()) {
            return;
        }
        FunctionStatistic functionStatistic = callStack.pop();
        functionStatistic.endTime = System.nanoTime();
        System.out.println("Ending function: " + functionStatistic.functionName);
        if (!callStack.isEmpty()) {
            callStack.peek().children.add(functionStatistic);
        } else {
            System.out.println(functionStatistic.toString());
        }
    }
}