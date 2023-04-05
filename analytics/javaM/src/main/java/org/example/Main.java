package org.example;

class MyException extends Exception {
    MyException(String message) {
        super(message);
    }
}

public class Main {
    public static void test() throws MyException {
        throw new MyException("MyException");
    }

    public static void testA() {
        System.out.println("Pratham, this is not funny");
    }

    public static void main(String[] args) {
        try {
            test();
        } catch (MyException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Hello World!");
        testA();
    }
}