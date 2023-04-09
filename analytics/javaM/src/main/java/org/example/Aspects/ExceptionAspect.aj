package org.example.Aspects;

import org.example.DataStore;

public aspect ExceptionAspect extends BaseAspect {
    pointcut handledException(Exception e): handler(*) && args(e) ;

    pointcut exception(): execution(* *(..) throws Exception);

    after() throwing (Exception e): exception() {
        System.out.println("Exception thrown in :" + thisJoinPoint.getSignature().getName());
        System.out.println("Exception Thrown " + e.getClass().getName());
        DataStore.logException(thisJoinPoint.getSignature().getName(), e.getClass().getName());
    }

    before(Exception e): handledException(e) {
        System.out.println("Handling Exception in:" + thisEnclosingJoinPointStaticPart.getSignature().getName());
        System.out.println("Handling Exception:" + e.getClass().getName());
    }
}
