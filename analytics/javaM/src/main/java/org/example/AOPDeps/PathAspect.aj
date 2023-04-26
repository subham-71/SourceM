package org.example.AOPDeps;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Stack;

public aspect PathAspect extends BaseAspect {
    Stack<String> methodNameStack = new Stack<>( );

    pointcut profile(): execution(* *(..));

    before(): profile() && !exclude() {
        if (!methodNameStack.empty()) {
            String parentName = methodNameStack.peek();
            ArrayList<String> methodEdge = new ArrayList<>();
            methodEdge.add(parentName);
            methodEdge.add(thisJoinPoint.getSignature().toString());
            DataStore.incrementPath(methodEdge);
        }
        methodNameStack.push(thisJoinPoint.getSignature().toString( ));
    }

    after() returning: profile() && !exclude() {
        methodNameStack.pop();
    }

    after() throwing: profile() && !exclude() {
        methodNameStack.pop();
    }
}