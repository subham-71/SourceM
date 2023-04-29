package org.example;

public class Main {
    public static void main(String[] args) {
        Test test = new Test();
        test.testFunction();
        test.testFunction();

        try {
            test.testThrows();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        try {
            test.testThrows();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}