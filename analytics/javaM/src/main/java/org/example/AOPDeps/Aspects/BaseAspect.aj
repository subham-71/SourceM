package org.example.AOPDeps.Aspects;

public abstract aspect BaseAspect {
    public pointcut exclude():
        execution(* *..AOPDeps..*(..));
}
