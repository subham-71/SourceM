package org.example;

import org.example.ExecutionTime.Client ;

public class Main {
    public static void main( String[] args ) {
        System.out.println( "Hello World!" );
        long sum = 0;
        for (long i=0; i<10; i++) {
            Client.testing();
        }
    }
}