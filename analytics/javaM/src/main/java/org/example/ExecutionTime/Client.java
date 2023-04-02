package org.example.ExecutionTime;

public class Client {
    public static void testing() {

        System.out.println( "I am here" );
    }
    public static void testingA() {

        System.out.println( "I am here" );
        testing();
        testingC();

    }

    public static void testingC() {

        System.out.println( "I am here" );
    }

}
