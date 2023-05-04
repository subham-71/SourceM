package org.example.AOPDeps;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;

import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;

import static org.junit.jupiter.api.Assertions.*;

class ApiGatewayTest {

    static HttpURLConnection mockConn;
    static ApiGateway apiGateway;
    static ApiGateway apiGatewayUnderTest;

    static OutputStream mockOutStream;

    @BeforeAll
    static void init() throws Exception {
        apiGateway = new ApiGateway("http://localhost:8080");
        // Making a spy class to ensure function is being called
        apiGatewayUnderTest = Mockito.spy(apiGateway);
        // Mocking the connection and output stream
        mockConn = Mockito.mock(HttpURLConnection.class);
        mockOutStream = Mockito.mock(OutputStream.class);

        // Mocking the functions that are called in the send function
        Mockito.when(apiGatewayUnderTest.getUrlConnection(Mockito.anyString())).thenReturn(mockConn);
        Mockito.when(mockConn.getOutputStream()).thenReturn(mockOutStream);
        Mockito.when(mockConn.getResponseCode()).thenReturn(200).thenReturn(400);
        Mockito.when(mockConn.getResponseMessage()).thenReturn("testMessage");
    }
    @Test
    void send() throws Exception {
        // Testing the send function
        assertEquals("abcd1234", apiGateway.app_id);
        apiGatewayUnderTest.send("/test", "{\"test\": \"test\"}");

        // Verifying that the functions were called
        apiGatewayUnderTest.send("/test", "{\"test\": \"test\"}");
        Mockito.verify(mockConn, Mockito.times(2)).setRequestMethod("POST");
        Mockito.verify(mockConn, Mockito.times(2)).setRequestProperty("Content-Type", "application/json");
        Mockito.verify(mockConn, Mockito.times(2)).setDoOutput(true);
        Mockito.verify(mockConn, Mockito.times(2)).getOutputStream();
        Mockito.verify(mockConn, Mockito.times(3)).getResponseCode();
        Mockito.verify(mockConn, Mockito.times(1)).getResponseMessage();
    }


}