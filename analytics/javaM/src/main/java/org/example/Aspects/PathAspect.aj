package org.example.Aspects;

import org.example.DataStore;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Stack;

public aspect PathAspect extends BaseAspect {
    Stack<String> methodNameStack = new Stack<>( );

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
    }
}