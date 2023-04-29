package org.example;

import org.example.AOPDeps.DataStore;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class MainTest {
    @BeforeAll
    static void init() {
        Main.main(new String[]{});
    }

    @Order(1)
    @Test
    void mainTest() {
        assertEquals(false, DataStore.mainStatus);
    }

    @Order(2)
    @Test
    void checkExecutionCounter() {
        assertEquals(3, DataStore.executionCounter.size());
        String[] functionNames = {
            "void org.example.Main.main(String[])",
            "void org.example.Tes.testFunction()",
            "void org.example.Tes.testThrows()",
        };

        for (String functionName : functionNames) {
            assertTrue(DataStore.executionCounter.containsKey(functionName));
        }
    }

    @Order(3)
    @Test
    void testThrows() {
        assertEquals(2, DataStore.exceptionMap.keySet().size());
    }

    @Order(4)
    @Test
    void checkPaths() {
        assertEquals(2, DataStore.pathCounter.keySet().size());
    }

    @Order(5)
    @Test
    void checkFstat() {
        assertEquals(5, DataStore.fStatistics.size());
    }

}