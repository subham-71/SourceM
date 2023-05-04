package org.example.AOPDeps.Aspects;

import org.example.AOPDeps.DataStore;
import org.example.AOPDeps.Fstat;

import java.util.Stack;

/**
 * ProfilerAspect
 * this aspect that profiles the execution of the program
 */
public aspect ProfilerAspect extends BaseAspect {
    static Stack<Fstat> cStack = new Stack<>();
    int depth = 0;
    int call_id = 0;

    before(): profile() && !exclude() {
        String parent = "None";
        int parent_id = -1;
        if (!cStack.isEmpty()) {
            parent = cStack.peek().name;
            parent_id = cStack.peek().call_id;
        }
        // Pushing a new function call onto the stack
        cStack.push(new Fstat(
            call_id++,
            thisJoinPoint.getSignature().toString(),
            parent,
            parent_id,
            System.nanoTime(),
            depth));
        depth++;
    }

    after() returning: profile() && !exclude() {
        if (cStack.isEmpty()) {
            return;
        }
        Fstat funcStat = cStack.pop();
        funcStat.addEndTime(System.nanoTime());
        depth--;
        // Update the function statistics if the function returns
        DataStore.updateFStatistic(funcStat);
    }

    after() throwing: profile() && !exclude() {
        if (cStack.isEmpty()) {
            return;
        }
        Fstat funcStat = cStack.pop();
        funcStat.addEndTime(System.nanoTime());
        depth--;
        // Update the function statistics if the function throws
        DataStore.updateFStatistic(funcStat);
    }
}
