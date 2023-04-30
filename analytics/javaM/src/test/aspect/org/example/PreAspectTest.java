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
        mockApiGateWay = Mockito.mock(ApiGateway.class);
        Mockito.doNothing().when(mockApiGateWay).send(Mockito.anyString(), Mockito.anyString());
        DataStore.setApiGateway(mockApiGateWay);
        Main.main(new String[]{});
    }

    @Test
    @Order(1)
    void mainTest() {
        assertEquals(false, DataStore.mainStatus);
    }

    @Test
    @Order(2)
    void checkExecutionCounter() {
        assertEquals(3, DataStore.executionCounter.size());
        String[] functionNames = {
            "void org.example.Main.main(String[])",
            "void org.example.Test.testFunction()",
            "void org.example.Test.testThrows()",
        };

        for (String functionName : functionNames) {
            assertTrue(DataStore.executionCounter.containsKey(functionName));
        }
    }

    @Test
    @Order(3)
    void testThrows() {
        assertEquals(2, DataStore.exceptionMap.keySet().size());
    }

    @Test
    @Order(4)
    void checkPaths() {
        assertEquals(2, DataStore.pathCounter.keySet().size());
    }

    @Test
    @Order(5)
    void checkFstat() {
        assertEquals(5, DataStore.fStatistics.size());
    }

    @Test
    @Order(6)
    void checkApiGateWay() {
        try {
            DataStore.apiThread.join();
            Mockito.verify(mockApiGateWay, Mockito.times(4)).send(Mockito.anyString(), Mockito.anyString());
        } catch (Exception ignored) {
        }
    }
}