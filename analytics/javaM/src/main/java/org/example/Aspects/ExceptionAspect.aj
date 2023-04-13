package org.example.Aspects;

import org.example.DataStore;

import java.util.ArrayList;

public aspect ExceptionAspect extends BaseAspect {
    pointcut handledException(Exception e): handler(*) && args(e) ;

    pointcut exception(): execution(* *(..) throws Exception) || execution(* *(..));

    after() throwing (Exception e): exception() {
        ArrayList<String> exceptions = new ArrayList<>();
        exceptions.add(e.getClass().getName());
        exceptions.add(thisJoinPoint.getSignature().getName());
        DataStore.logException(exceptions);
    }

    before(Exception e): handledException(e) {
        ArrayList<String> exceptions = new ArrayList<>();
        exceptions.add(e.getClass().getName());
        exceptions.add(thisEnclosingJoinPointStaticPart.getSignature().getName());
        DataStore.logException(exceptions);
    }
}
