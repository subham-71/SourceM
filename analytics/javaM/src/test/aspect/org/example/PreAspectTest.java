package org.example;

import org.example.AOPDeps.ApiGateway;
import org.example.AOPDeps.DataStore;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class PreAspectTest {
    static ApiGateway mockApiGateWay;

    @BeforeAll
    static void init() {
        // Mocking the api gateway
        mockApiGateWay = Mockito.mock(ApiGateway.class);
        Mockito.doNothing().when(mockApiGateWay).send(Mockito.anyString(), Mockito.anyString());
        DataStore.setApiGateway(mockApiGateWay);
        // Running the main function
        Main.main(new String[]{});
    }

    @Test
    @Order(1)
    void mainTest() {
        // Checking that the main function ran
        assertEquals(false, DataStore.mainStatus);
    }

    @Test
    @Order(2)
    void checkExecutionCounter() {
        // Checking that the execution counter is correct
        assertEquals(3, DataStore.executionCounter.size());
        String[] functionNames = {
            "void org.example.Main.main(String[])",
            "void org.example.Test.testFunction()",
            "void org.example.Test.testThrows()",
        };

        // Checking that the execution counter contains the correct functions
        for (String functionName : functionNames) {
            assertTrue(DataStore.executionCounter.containsKey(functionName));
        }
    }

    @Test
    @Order(3)
    void testThrows() {
        // Checking that the exception map is correct
        assertEquals(2, DataStore.exceptionMap.keySet().size());
    }

    @Test
    @Order(4)
    void checkPaths() {
        // Checking that the path counter is correct
        assertEquals(2, DataStore.pathCounter.keySet().size());
    }

    @Test
    @Order(5)
    void checkFstat() {
        // Checking that the fstat is correct
        assertEquals(5, DataStore.fStatistics.size());
    }

    @Test
    @Order(6)
    void checkApiGateWay() {
        // Checking that the api gateway was called
        try {
            // Waiting for the api thread to finish
            DataStore.apiThread.join();
            Mockito.verify(mockApiGateWay, Mockito.times(4)).send(Mockito.anyString(), Mockito.anyString());
        } catch (Exception ignored) {
        }
    }
}