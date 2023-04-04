package org.example;

import org.example.ExecutionTime.Client ;

public class Main {

    public static void main( String[] args ) {
        for(int i = 0;i<10;i++){
            Client.testingA();
        }
        Client.testingC();
        System.out.println( "Hello World!" );
//
    }
}