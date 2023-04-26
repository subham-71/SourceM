package org.example.AOPDeps;

public abstract aspect BaseAspect {
    public pointcut exclude():
        execution(* *..AOPDeps..*(..));
}
