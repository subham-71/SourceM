package org.example.Aspects;

public abstract aspect BaseAspect {
    public pointcut exclude():
        execution(* org.example.DataStore.*(..))
        || execution(* org.example.StatObjects.FunctionStatistic.*(..))
        || execution(* org.example.StatObjects.Fstat.*(..))
        || execution(* org.example.StatObjects.PathStatistic.*(..))
        || execution(* org.example.StatObjects.ExecutionStatistic.*(..))
        || execution(* org.example.StatObjects.ExceptionStatistic.*(..));
}
