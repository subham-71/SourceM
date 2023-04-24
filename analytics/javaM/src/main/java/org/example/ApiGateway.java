package org.example;

import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class ApiGateway {
    final String api_url;
    final String app_id;

    public ApiGateway(String url) {
        this.api_url = url;
        this.app_id = "appId2";
    }

    public void send(String api_endpoint, String jsonData) {
        try {
            URL url = new URL(api_url + api_endpoint);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream());
            String jsonWithHeader = "{\"data\": " + jsonData + ", \"appId\": \"" + app_id + "\"}";
//            System.out.println(jsonWithHeader);
            writer.write(jsonWithHeader);
            writer.flush();

            if (conn.getResponseCode() != 200) {
                System.out.println(jsonWithHeader);
                throw new RuntimeException("Failed : HTTP error code : "
                    + conn.getResponseCode() + "\n" + conn.getResponseMessage() + "\n" + api_endpoint);
            }

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

}
