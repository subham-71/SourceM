package org.example.AOPDeps.Aspects;

import org.example.AOPDeps.DataStore;

public aspect MainStatusAspect {
    pointcut mainMethod(): execution(public static void main(java.lang.String[]));

    before() : mainMethod() {
        DataStore.setMainStatus(true);
    }

    after() returning : mainMethod() {
        DataStore.setMainStatus(false);
    }
}
