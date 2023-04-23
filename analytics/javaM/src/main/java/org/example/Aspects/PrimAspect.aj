package org.example.Aspects;

import org.example.DataStore;
import org.example.StatObjects.Fstat;
import org.example.StatObjects.FunctionStatistic;

import java.util.Stack;

public aspect PrimAspect extends BaseAspect {
    static Stack<FunctionStatistic> callStack = new Stack<>();
    static Stack<Fstat> cStack = new Stack<>();
    int depth = 0;

    pointcut profile(): !call(* java..*(..)) && (call(* org.example.TestClassInclude.*(..))
        || (call(* *(..)) && within(org.example.TestClassInclude))
        || call(* org.example.testpack.TestClassExclude.*(..))
        || (call(* *(..)) && within(org.example.testpack.TestClassExclude)));

    before(): profile() {
        FunctionStatistic functionStatistic = new FunctionStatistic(
            (thisJoinPoint.getSignature().getDeclaringTypeName() + "." + thisJoinPoint.getSignature().getName()), System.nanoTime());
        callStack.push(functionStatistic);
        cStack.push(new Fstat(
            thisJoinPoint.getSignature().getDeclaringTypeName() + "." + thisJoinPoint.getSignature().getName(),
            System.nanoTime(),
            depth));
        depth++;
    }

    after() returning: profile() {
        if (callStack.isEmpty()) {
            return;
        }
        FunctionStatistic functionStatistic = callStack.pop();
        functionStatistic.endTime = System.nanoTime();
        if (!callStack.isEmpty()) {
            callStack.peek().children.add(functionStatistic);
        } else {
            DataStore.updateFunctionStatistic(functionStatistic);
        }
        Fstat funcStat = cStack.pop();
        funcStat.addEndTime(System.nanoTime());
        depth--;
        DataStore.updateFStatistic(funcStat);
    }
}
