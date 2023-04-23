package org.example.Aspects;

public aspect SecurityAspect extends BaseAspect {
    pointcut securityCheck() : call(* org.example.TestClassInclude.*(..)) && args(..);

    before() : securityCheck() {
//        System.out.println("Class: " + thisJoinPoint.getSignature().getDeclaringTypeName());
//        System.out.println("Function: " + thisJoinPoint.getSignature().getName());

        Object args[]  = thisJoinPoint.getArgs();
        for (Object arg : args) {
            if (arg instanceof String) {
                String str = (String) arg;
                // Check SQL keywords maybe?
            }
//            System.out.println("Arg: " + arg);
        }
    }
}
