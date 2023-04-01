package org.example.ExecutionTime;

import java.util.HashMap;


public aspect ClientAspect {
    HashMap<String, Double> executionCounter = new HashMap<String, Double>();

    pointcut executionCounter(): execution(* *(..));
    pointcut recordTime(): execution(* *(..));
    pointcut recordTimeAfter(): execution(* *(..));

    before(): recordTime() {

        System.out.println("\n == ========================== ==\n rec tim before");

        String funcName = String.valueOf(thisJoinPoint.getSignature());
        Double tempTime ;

        if(!executionCounter.containsKey(funcName)){
            tempTime =0.0;
        }
        else{
            tempTime = executionCounter.get(funcName);
        }

        tempTime-=System.nanoTime()/1000000000.0;

        executionCounter.put(funcName,tempTime);
        System.out.println(funcName + tempTime);

        System.out.flush();
    }

    after() returning(): recordTimeAfter() {
        System.out.println("\n ==============================\n rec tim after");

        String funcName = String.valueOf(thisJoinPoint.getSignature());
        Double tempTime = executionCounter.get(funcName);

        tempTime +=  System.nanoTime()/1000000000.0;

        executionCounter.put(funcName,tempTime);
        System.out.println(funcName + tempTime);

        System.out.flush();
    }



}
