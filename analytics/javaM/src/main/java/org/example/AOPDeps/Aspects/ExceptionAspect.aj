package org.example.AOPDeps.Aspects;

import org.example.AOPDeps.DataStore;

import java.util.ArrayList;

/**
 * ExceptionAspect
 * It logs the exception to the DataStore.
 */
public aspect ExceptionAspect extends BaseAspect {
    pointcut handledException(Exception e): handler(*) && args(e) && !within(*..AOPDeps..*);

    pointcut exception(): execution(* *(..) throws java.lang.Exception) || execution(* *(..));

    after() throwing (Exception e): exception() && !exclude() {
        ArrayList<String> exceptions = new ArrayList<>();
        exceptions.add(e.getClass().getName());
        exceptions.add(thisJoinPoint.getSignature().toString());
        // add the exception to the DataStore
        DataStore.logException(exceptions);
    }

    before(Exception e): handledException(e){
        ArrayList<String> exceptions = new ArrayList<>();
        exceptions.add(e.getClass().getName());
        exceptions.add(thisEnclosingJoinPointStaticPart.getSignature().toString());
        // add the exception to the DataStore
        DataStore.logException(exceptions);
    }
}
