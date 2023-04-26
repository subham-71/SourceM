package org.example.Aspects;

import org.example.DataStore;

public aspect MainStatusAspect {
    pointcut mainMethod(): execution(public static void main(String[]));

    before() : mainMethod() {
        DataStore.setMainStatus(true);
    }

    after() returning : mainMethod() {
        DataStore.setMainStatus(false);
    }
}
