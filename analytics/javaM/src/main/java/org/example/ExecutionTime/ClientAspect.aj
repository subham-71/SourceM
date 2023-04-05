package org.example.ExecutionTime;

import java.util.HashMap;


public aspect ClientAspect {
    HashMap<String, Long> executionTimer = new HashMap<String, Long>();
    HashMap<String, Integer> executionCounter = new HashMap<String, Integer>();

    pointcut executionCounter(): execution(* *(..));
    pointcut recordTime(): execution(* *(..));
    pointcut recordTimeAfter(): execution(* *(..));

    before(): recordTime() {

        System.out.println("\n ============ Recording Time Before ==================\n");

        String methodName = thisJoinPoint.getSignature().toString();
        long tempTime ;

        if( !executionCounter.containsKey(methodName)){
            executionCounter.put(methodName,1);
        }
        else{
            executionCounter.put(methodName,executionCounter.get(methodName)+1);
        }

        if( !executionTimer.containsKey(methodName) ){
            tempTime = 0;
        }
        else{
            tempTime = executionTimer.get(methodName);
        }

        tempTime -= System.nanoTime();

        executionTimer.put(methodName,tempTime);
        System.out.println(methodName + " " + tempTime);

        System.out.flush();
    }

    after() returning(): recordTimeAfter() {
        System.out.println("\n =============== Recording Time After ===============\n");

        String methodName = thisJoinPoint.getSignature().toString();
        long tempTime = executionTimer.get(methodName);

        tempTime +=  System.nanoTime();

        executionTimer.put(methodName,tempTime);
        System.out.println(methodName + " " + tempTime);

        System.out.flush();
    }
}
