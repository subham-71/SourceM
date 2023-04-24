package org.example;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class ApiGateway {
    final String api_url;
    final String app_id;

    public ApiGateway(String url) {
        this.api_url = url;
        this.app_id = "test";
    }

    public void send(String api_endpoint, String jsonData) {
        try {
            URL url = new URL(api_url + api_endpoint);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream());
            String jsonWithHeader = "{\"data\": " + jsonData + "}";
//            System.out.println(jsonWithHeader);
            writer.write(jsonWithHeader);
            writer.flush();

            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code : "
                    + conn.getResponseCode() + "\n" + conn.getResponseMessage());
            }

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

}
