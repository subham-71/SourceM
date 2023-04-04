package org.example.Profiler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Stack;

class FunctionStatistic {
    String functionName;
    long startTime;
    long endTime;
    ArrayList<FunctionStatistic> children;

    FunctionStatistic(String functionName, long startTime) {
        this.functionName = functionName;
        this.startTime = startTime;
        this.children = new ArrayList<>()  ;
    }

    public String toString() {
        if (children.isEmpty()) {
            return String.format("%s: %d ", functionName, endTime - startTime);
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
    Stack<String> methodNameStack = new Stack<>();

    pointcut profile(): execution(* *(..));
    pointcut exclude(): execution(* FunctionStatistic.*(..));

    HashMap<ArrayList<String>,Integer> pathCounter = new HashMap<ArrayList<String>,Integer>();

    before(): profile() && !exclude() {
        if(!methodNameStack.empty()){
            String parentName = methodNameStack.peek();
            ArrayList <String> methodEdge = new ArrayList<String>();
            methodEdge.add(parentName);
            methodEdge.add(thisJoinPoint.getSignature().getName());
            if(!pathCounter.containsKey(methodEdge)){
                pathCounter.put(methodEdge,1);
            }
            else{
                pathCounter.put(methodEdge,pathCounter.get(methodEdge)+1);
            }

        }
        methodNameStack.push(thisJoinPoint.getSignature().getName());
        FunctionStatistic functionStatistic = new FunctionStatistic(
            thisJoinPoint.getSignature().getName(), System.nanoTime());
        System.out.println("Calling function: " + functionStatistic.functionName);
        callStack.push(functionStatistic);
    }

    after() returning() : profile() && !exclude() {
        if (callStack.isEmpty()) {
            return;
        }
        methodNameStack.pop();
        FunctionStatistic functionStatistic = callStack.pop();
        functionStatistic.endTime = System.nanoTime();
        System.out.println("Ending function: " + functionStatistic.functionName);
        if (!callStack.isEmpty()) {
            callStack.peek().children.add(functionStatistic);
        } else {
            System.out.println(functionStatistic.toString());
            System.out.println(pathCounter);
        }
    }
}