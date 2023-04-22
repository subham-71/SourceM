package org.example.testpack;

import org.example.TestClassInclude;

public class TestClassExclude {
    public void testFunction(String a) {
        System.out.println("Hello World" + a);
        TestClassInclude testClassInclude = new TestClassInclude();
        testClassInclude.testFunction("Pratham in included class from excluded class");
        testFunction("Pratham", "Kundan");
    }

    public void testFunction(String a, String b) {
        System.out.println("Hello World" + a + " " + b);
    }
}
