package org.example;

class MyException extends Exception {
    MyException( String message ) {
        super( message );
    }
}

public class Main {

    public static int testThrow(int a, int b) {
        try {
            return a/b;
        } catch ( Exception e ) {
            System.out.println( "Exception" );
            return 0;
        }
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
        test();
    }

    public static void main( String[] args ) {
        test();
        int ans = testThrow(12, 0);
//        try {
//            System.out.println(ans);
//        } catch ( Exception e ) {
//            System.out.println( e.getMessage() );
//        }
        testA();
        testA();
        System.out.println( "This is Main!" );
    }
}