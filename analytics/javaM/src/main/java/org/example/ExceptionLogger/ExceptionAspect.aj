//package org.example.ExceptionLogger;
//
//import java.util.HashMap;
//
//class ExceptionStatistic {
//    HashMap<String, HashMap<String, Integer>> throwMap;
//
//    public ExceptionStatistic() {
//        throwMap = new HashMap<String, HashMap<String, Integer>>();
//    }
//
//    public void logException(String functionName, String exceptionName) {
//        if (throwMap.containsKey(functionName)) {
//            HashMap<String, Integer> exceptionMap = throwMap.get(functionName);
//            if (exceptionMap.containsKey(exceptionName)) {
//                exceptionMap.put(exceptionName, exceptionMap.get(exceptionName) + 1);
//            } else {
//                exceptionMap.put(exceptionName, 1);
//            }
//        } else {
//            HashMap<String, Integer> exceptionMap = new HashMap<String, Integer>();
//            exceptionMap.put(exceptionName, 1);
//            throwMap.put(functionName, exceptionMap);
//        }
//    }
//
//}
//public aspect ExceptionAspect {
//    ExceptionStatistic exceptionStatistic = new ExceptionStatistic();
//    pointcut exception() : execution(* *(..));
//
//    after() throwing (Exception e): exception() {
//        exceptionStatistic.logException(thisJoinPoint.getSignature().getName(), e.getClass().getName());
//        System.out.println("Calling function: " + thisJoinPoint.getSignature().getName());
//        System.out.println("Exception thrown: " + e.getClass().getName());
//        System.out.println("Exception message: " + e.getMessage());
//    }
//}
