package org.example.ExecutionTime;

import org.example.DataStore;

import java.util.HashMap;


public aspect ClientAspect {
    HashMap<String, Long> executionTimer = new HashMap<>();

    pointcut executionCounter(): execution(* *(..));
    pointcut recordTime(): execution(* *(..));
    pointcut recordTimeAfter(): execution(* *(..));
    pointcut exclude(): execution(* DataStore.*(..)) || execution(* FunctionStatistic.*(..));

    before(): recordTime() && !exclude() {
        String methodName = thisJoinPoint.getSignature().toString();
        long   tempTime;

        if ( !executionTimer.containsKey( methodName ) ) {
            tempTime = 0;
        }
        else {
            tempTime = executionTimer.get( methodName );
        }

        tempTime -= System.nanoTime();

        DataStore.incrementExecutionCounter( methodName );
        executionTimer.put( methodName, tempTime );
    }

    after() returning(): recordTimeAfter() && !exclude() {
        String methodName = thisJoinPoint.getSignature().toString();
        long   tempTime   = executionTimer.get( methodName );

        tempTime += System.nanoTime();

        DataStore.logExecutionTime( methodName, tempTime );
        executionTimer.put( methodName, tempTime );
    }
}
