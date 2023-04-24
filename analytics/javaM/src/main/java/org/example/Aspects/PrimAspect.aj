package org.example.Aspects;

import org.example.DataStore;
import org.example.StatObjects.Fstat;

import java.util.Stack;

public aspect PrimAspect extends BaseAspect {
    static Stack<Fstat> cStack = new Stack<>();
    int depth = 0;
    int call_id = 0;

    pointcut profile(): execution(* *(..)) && !exclude();
//        || (call(* *(..)) && within(org.example.TestClassInclude))
//        || call(* org.example.testpack.TestClassExclude.*(..))
//        || (call(* *(..)) && within(org.example.testpack.TestClassExclude)));

    before(): profile() {
        String parent = "None";
        int parent_id = -1;
        if (!cStack.isEmpty()) {
            parent = cStack.peek().name;
            parent_id = cStack.peek().call_id;
        }
        cStack.push(new Fstat(
            call_id++,
            thisJoinPoint.getSignature().getDeclaringTypeName() + "." + thisJoinPoint.getSignature().getName(),
            parent,
            parent_id,
            System.nanoTime(),
            depth));
        depth++;
    }

    after() returning: profile() {
        if (cStack.isEmpty()) {
            return;
        }
        Fstat funcStat = cStack.pop();
        funcStat.addEndTime(System.nanoTime());
        depth--;
        DataStore.updateFStatistic(funcStat);
    }

    after() throwing: profile() {
        if (cStack.isEmpty()) {
            return;
        }
        Fstat funcStat = cStack.pop();
        funcStat.addEndTime(System.nanoTime());
        depth--;
        DataStore.updateFStatistic(funcStat);
    }
}
