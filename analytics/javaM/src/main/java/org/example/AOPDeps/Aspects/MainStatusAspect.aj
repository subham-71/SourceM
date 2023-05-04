package org.example.AOPDeps.Aspects;

import org.example.AOPDeps.DataStore;

/**
 * MainStatusAspect
 * Weaves the main function. To be used to check if the main function has started.
 */
public aspect MainStatusAspect {
    pointcut mainMethod(): execution(public static void main(java.lang.String[]));

    before() : mainMethod() {
        DataStore.setMainStatus(true);
    }

    after() returning : mainMethod() {
        DataStore.setMainStatus(false);
    }
}
