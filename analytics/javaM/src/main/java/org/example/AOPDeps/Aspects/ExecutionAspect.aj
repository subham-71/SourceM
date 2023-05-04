package org.example.AOPDeps.Aspects;

import org.example.AOPDeps.DataStore;

import java.util.HashMap;

/**
 * ExecutionAspect
 * Aspect for counting the number of times a method is executed and the time it takes to execute.
 */
public aspect ExecutionAspect extends BaseAspect {
    HashMap<String, Long> executionTimer = new HashMap<>();

    pointcut executionCounter(): execution(* *(..));
    pointcut recordTime(): execution(* *(..));

    before(): recordTime() && !exclude() {
        String methodName = thisJoinPoint.getSignature().toString();
        long tempTime;

        if (!executionTimer.containsKey(methodName)) {
            tempTime = 0;
        } else {
            tempTime = executionTimer.get(methodName);
        }

        tempTime -= System.nanoTime();

        executionTimer.put(methodName, tempTime);
        // adding data to the datastore
        DataStore.incrementExecutionCounter(methodName);
    }

    after() returning(): recordTime() && !exclude() {
        String methodName = thisJoinPoint.getSignature().toString();
        long tempTime = executionTimer.get(methodName);

        tempTime += System.nanoTime();

        executionTimer.put(methodName, tempTime);
        // adding data to the datastore
        DataStore.logExecutionTime(methodName, tempTime);
    }

    after() throwing(): recordTime() && !exclude() {
        String methodName = thisJoinPoint.getSignature().toString();
        long tempTime = executionTimer.get(methodName);

        tempTime += System.nanoTime();

        executionTimer.put(methodName, tempTime);
        // adding data to the datastore
        DataStore.logExecutionTime(methodName, tempTime);
    }
}
