package org.example;

public class Main {
    public static void main(String[] args) {
        Tes tes = new Tes();
        tes.testFunction();
        tes.testFunction();

        try {
            tes.testThrows();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        try {
            tes.testThrows();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}