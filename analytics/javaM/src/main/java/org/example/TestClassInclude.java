package org.example;

import org.example.testpack.TestClassExclude;

public class TestClassInclude {
    public void testFunction(String a) {
        System.out.println("Hello World" + a);
        TestClassExclude testClassExclude = new TestClassExclude();
        testClassExclude.testFunction("Pratham in excluded class from included class", ".");
        testFunction("Pratham", "Kundan");
    }

    public void testFunction(String a, String b) {
        System.out.println("Hello World" + a + " " + b);
    }
}
