package org.example.Aspects;

import org.example.DataStore;
import org.example.StatObjects.FunctionStatistic;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Stack;

public aspect ProfilerAspect extends BaseAspect {
    static Stack<FunctionStatistic> callStack = new Stack<>();
    Stack<String> methodNameStack = new Stack<>( );
    long startTime = 0;

    pointcut profile(): execution(* *(..));

    HashMap<ArrayList<String>, Integer> pathCounter = new HashMap<>();

    before(): profile() && !exclude() {
        if (!methodNameStack.empty()) {
            String parentName = methodNameStack.peek();
            ArrayList<String> methodEdge = new ArrayList<>();
            methodEdge.add(parentName);
            methodEdge.add(thisJoinPoint.getSignature().toString());
            DataStore.incrementPath(methodEdge);
            if (!pathCounter.containsKey(methodEdge)) {
                pathCounter.put(methodEdge, 1);
            } else {
                pathCounter.put(methodEdge, pathCounter.get(methodEdge) + 1);
            }

        }
        methodNameStack.push(thisJoinPoint.getSignature().toString( ));
        FunctionStatistic functionStatistic = new FunctionStatistic(
            thisJoinPoint.getSignature().toString(), System.nanoTime());
        callStack.push(functionStatistic);
    }

    after() returning(): profile() && !exclude() {
        if (callStack.isEmpty()) {
            return;
        }
        methodNameStack.pop();
        FunctionStatistic functionStatistic = callStack.pop();
        functionStatistic.endTime = System.nanoTime();
        if (!callStack.isEmpty()) {
            callStack.peek().children.add(functionStatistic);
        } else {
            DataStore.updateFunctionStatistic(functionStatistic);
        }

        if (System.nanoTime() - startTime > 10 * 1e9) {
            DataStore.updateFunctionStatistic(callStack.firstElement());
            startTime = System.nanoTime();
        }
    }

    after() throwing (Exception e): profile() && !exclude() {
        if (callStack.isEmpty()) {
            return;
        }
        methodNameStack.pop();
        FunctionStatistic functionStatistic = callStack.pop();
        functionStatistic.endTime = System.nanoTime();
        if (!callStack.isEmpty()) {
            callStack.peek().children.add(functionStatistic);
        } else {
            System.out.println(functionStatistic.toString());
            System.out.println(pathCounter);
        }
    }
}