package org.example.AOPDeps.Aspects;

import org.example.AOPDeps.DataStore;

import java.util.ArrayList;
import java.util.Stack;

/**
 * PathAspect
 * This aspect is used to profile the paths taken through the program.
 * It is used to generate the call graph.
 */
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
        // push the current method name onto the stack
        methodNameStack.push(thisJoinPoint.getSignature().toString( ));
    }

    after() returning: pathProfile() && !exclude() {
        // pop the current method name off the stack if the function returns
        methodNameStack.pop();
    }

    after() throwing: pathProfile() && !exclude() {
        // pop the current method name off the stack if the function throws
        methodNameStack.pop();
    }
}