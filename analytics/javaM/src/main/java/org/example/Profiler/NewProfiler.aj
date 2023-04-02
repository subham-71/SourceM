//package org.example.Profiler;
//
//import java.util.ArrayList;
//
//public aspect Profiler {
//    Struct Node {
//        String methodName;
//        ArrayList<String> children;
//    }
////
//    ArrayList<String> listOfMethods = new ArrayList<>();
//    HashMap<String, String> parent = new HashMap<>();
//    int methodCounter = 0;
//
//    pointcut beforeProfiler(): execution(* *(..));
//    pointcut afterProfiler(): execution(* *(..));
//
//    before(): beforeProfiler() {
//
//        listOfMethods.add( thisJoinPoint.getSignature().toString() );
//        methodCounter++;
//    }
//
//    after() returning(): afterProfiler() {
//        methodCounter--;
//        if ( methodCounter == 0 ) {
//            System.out.println( "This is the STACK" );
//            for ( int i=0; i<listOfMethods.size(); i++ ) {
//                System.out.println( listOfMethods.get(i) );
//            }
//        } else {
//
//        }
//    }
//    ////    class FunctionStatistic {
//////        String functionName;
//////        long startTime;
//////        long endTime;
//////        ArrayList<FunctionStatistic> children;
//////
//////        FunctionStatistic(String functionName, long startTime) {
//////            this.functionName = functionName;
//////            this.startTime = startTime;
//////            this.children = new ArrayList<>();
//////        }
//////    }
////
////// static Stack<FunctionStatistic> callStack = new Stack<>();
////    static Stack<String> callStackString = new Stack<>();
////
//////    public String Print( FunctionStatistic something ) {
//////        System.out.println(something.children);
//////        if (something.children.isEmpty()) {
//////            return String.format("%s: %d", something.functionName, something.endTime - something.startTime);
//////        } else {
//////            String rs = "";
//////            rs = String.format("%s: %d", something.functionName, something.endTime - something.startTime);
//////            for (FunctionStatistic child : something.children) {
//////                rs = rs + Print(child) + "\n";
//////            }
//////            return rs;
//////        }
//////    }
////
////    pointcut profile(): execution(* *(..));
////
////    before(): profile() {
//////        FunctionStatistic functionStatistic = new FunctionStatistic(
//////            thisJoinPoint.getArgs().toString(), System.nanoTime());
//////        callStack.push(functionStatistic);
//////        System.out.println(functionStatistic);
//////        System.out.println(functionStatistic.children);
////          callStackString.push(thisJoinPoint.getSignature().toString());
////    }
////
////    after() returning() : profile() {
////
////        //FunctionStatistic functionStatistic = callStack.pop();
////        String functionName = callStackString.pop();
//////        functionStatistic.endTime = System.nanoTime();
//////        while(!callStack.isEmpty()){
//////            System.out.println(functionStatistic.children);
//////        }
//////        if (!callStack.isEmpty()) {
//////            callStack.peek().children.add(functionStatistic);
//////            System.out.println("After function call");
//////        } else {
//////            //System.out.println(Print(functionStatistic));
//////            System.out.println("Ending")  ;
//////        }
////
////        if(!callStackString.isEmpty()) {
////            String method = callStackString.pop();
////            method += functionName + "\n";
////            callStackString.push(method);
////        }
////        else{
////            System.out.println(functionName);
////        }
////    }
//}
