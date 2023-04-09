package org.example;

class MyException extends Exception {
    MyException( String message ) {
        super( message );
    }
}

public class Main {

    public static void testThrow() throws Exception {
        throw new MyException( "an Exception" );
    }

    public static void test() {
        try {
            throw new MyException( "Exception" );
        } catch ( Exception e ) {
            System.out.println( e.getMessage() );
        }
    }

    public static void testA() {
        System.out.println( "Pratham, this is not funny" );
    }

    public static void main( String[] args ) {
        test();
        try {
            testThrow();
        } catch ( Exception e ) {
            System.out.println( e.getMessage() );
        }
        testA();
        testA();
        System.out.println( "This is Main!" );
    }
}