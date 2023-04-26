package org.example;

class MyException extends Exception {
    MyException(String message) {
        super(message);
    }
}

public class Main {

    public static int testThrow(int a, int b) {
        try {
            return a / b;
        } catch (Exception e) {
            System.out.println("Exception");
            return 0;
        }
    }

    public static void test() throws MyException {
        throw new MyException("Exception");
    }

    public static void testA() {
        System.out.println("Pratham, this is not funny");
        try {
            test();
        } catch (MyException e) {
            System.out.println("Exception");
        }
    }

    public static void main(String[] args) {
        int ans = testThrow(12, 0);

        TestClassInclude testClassInclude = new TestClassInclude( );
        testClassInclude.testFunction("Pratham");
        testClassInclude.testFunction("Pratham", "Kundan");

        System.out.println(ans);
        testA();
        testA();
        System.out.println("This is Main!");
    }
}