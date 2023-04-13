package org.example.Aspects;

import org.example.DataStore;
import org.example.StatObjects.FunctionStatistic;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Stack;

public aspect ProfilerAspect extends BaseAspect {
    static Stack<FunctionStatistic> callStack = new Stack<>();
    Stack<String> methodNameStack = new Stack<>( );

    pointcut profile(): execution(* *(..));

    HashMap<ArrayList<String>, Integer> pathCounter = new HashMap<>();

    before(): profile() && !exclude() {
        if (!methodNameStack.empty()) {
            String parentName = methodNameStack.peek();
            ArrayList<String> methodEdge = new ArrayList<>();
            methodEdge.add(parentName);
            methodEdge.add(thisJoinPoint.getSignature().getName());
            DataStore.incrementPath(methodEdge);
            if (!pathCounter.containsKey(methodEdge)) {
                pathCounter.put(methodEdge, 1);
            } else {
                pathCounter.put(methodEdge, pathCounter.get(methodEdge) + 1);
            }

        }
        methodNameStack.push(thisJoinPoint.getSignature().getName( ));
        FunctionStatistic functionStatistic = new FunctionStatistic(
            thisJoinPoint.getSignature().getName(), System.nanoTime());
//        System.out.println("Calling function: " + functionStatistic.functionName);
        callStack.push(functionStatistic);
    }

    after() returning(): profile() && !exclude() {
        if (callStack.isEmpty()) {
            return;
        }
        methodNameStack.pop();
        FunctionStatistic functionStatistic = callStack.pop();
        functionStatistic.endTime = System.nanoTime();
//        System.out.println("Ending function: " + functionStatistic.functionName);
        if (!callStack.isEmpty()) {
            callStack.peek().children.add(functionStatistic);
        } else {
            DataStore.addFunctionStatistic(functionStatistic);
//            System.out.println(functionStatistic.toString());
//            System.out.println(pathCounter);
        }
    }

    after() throwing (Exception e): profile() && !exclude() {
        if (callStack.isEmpty()) {
            return;
        }
        methodNameStack.pop();
        FunctionStatistic functionStatistic = callStack.pop();
        functionStatistic.endTime = System.nanoTime();
//        System.out.println("Ending function: " + functionStatistic.functionName);
        if (!callStack.isEmpty()) {
            callStack.peek().children.add(functionStatistic);
        } else {
            System.out.println(functionStatistic.toString());
            System.out.println(pathCounter);
        }
    }
}