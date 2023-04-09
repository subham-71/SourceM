package org.example.Aspects;

public abstract aspect BaseAspect {
    public pointcut exclude(): execution(* org.example.DataStore.*(..))
            || execution(* org.example.FunctionStatistic.*(..));
}
