package org.example.AOPDeps.Aspects;

import org.example.AOPDeps.DataStore;

import java.util.ArrayList;
import java.util.Stack;

public aspect PathAspect extends BaseAspect {
    Stack<String> methodNameStack = new Stack<>( );

    pointcut pathProfile(): execution(* *(..));

    before(): pathProfile() && !exclude() {
        if (!methodNameStack.empty()) {
            String parentName = methodNameStack.peek();
            ArrayList<String> methodEdge = new ArrayList<>();
            methodEdge.add(parentName);
            methodEdge.add(thisJoinPoint.getSignature().toString());
            DataStore.incrementPath(methodEdge);
        }
        methodNameStack.push(thisJoinPoint.getSignature().toString( ));
    }

    after() returning: pathProfile() && !exclude() {
        methodNameStack.pop();
    }

    after() throwing: pathProfile() && !exclude() {
        methodNameStack.pop();
    }
}