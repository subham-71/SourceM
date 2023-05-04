package org.example.AOPDeps.Aspects;

/**
 * BaseAspect
 * This class is used to exclude the AOPDeps package from profiling
 */
public abstract aspect BaseAspect {
    public pointcut exclude():
       execution(* *..AOPDeps..*(..));
    public pointcut profile():
        execution(* *..*..*(..));
}
