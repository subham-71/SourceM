package org.example.Aspects;

public abstract aspect BaseAspect {
    public pointcut exclude():
        execution(* *..DataStore.*(..))
        || execution(* *..StatObjects.FunctionStatistic.*(..))
        || execution(* *..StatObjects.Fstat.*(..))
        || execution(* *..StatObjects.PathStatistic.*(..))
        || execution(* *..StatObjects.ExecutionStatistic.*(..))
        || execution(* *..StatObjects.ExceptionStatistic.*(..))
        || execution(* *..ApiGateway.*(..));
}
