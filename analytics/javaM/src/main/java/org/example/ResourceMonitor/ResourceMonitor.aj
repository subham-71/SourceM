//package org.example.ResourceMonitor;
//
//import com.sun.management.OperatingSystemMXBean;
//
//import java.lang.management.ThreadMXBean;
//
//import java.util.Stack;
//
//public aspect ResourceMonitor {
//    Stack<Double> cpuLoadList = new Stack<>();
//    Stack<Long> freeMemory = new Stack<>();
//
//    pointcut getResources(): execution(* *(..));
//
//    before(): getResources() {
//        OperatingSystemMXBean osBean     = (OperatingSystemMXBean) java.lang.management.ManagementFactory.getOperatingSystemMXBean();
//        ThreadMXBean          threadBean = java.lang.management.ManagementFactory.getThreadMXBean();
//        double cpuLoad = osBean.getProcessCpuLoad();
//        if ( cpuLoad != -1 ) {
//            cpuLoadList.push( cpuLoad );
//        }
//        freeMemory.push( osBean.getFreeMemorySize() );
//    }
//
//    after() returning(): getResources() {
//        OperatingSystemMXBean osBean     = (OperatingSystemMXBean) java.lang.management.ManagementFactory.getOperatingSystemMXBean();
//        ThreadMXBean          threadBean = java.lang.management.ManagementFactory.getThreadMXBean();
//        System.out.println( "System CPU load: " + osBean.getCpuLoad() );
//        System.out.println( "Thread CPU load: " + threadBean.getCurrentThreadCpuTime() / 1e9 );
//        System.out.println( "Process CPU load: " + osBean.getProcessCpuLoad() );
//        System.out.println( "Free memory: " + osBean.getFreeMemorySize() );
//    }
//}
