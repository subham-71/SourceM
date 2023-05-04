package org.example.AOPDeps;

import java.io.FileInputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Properties;

/**
 * Class to send data to the API endpoint
 */
public class ApiGateway {
    String api_url;
    String app_id;
    HttpURLConnection conn;

    public ApiGateway(String url) {
        try {
            Properties props = new Properties();
            FileInputStream in = new FileInputStream("../config.properties");
            props.load(in);
            in.close();

            String appId = props.getProperty("appId");
            System.out.println("appId: " + appId);
            if (appId != null) {
                this.app_id = appId;
            }
        } catch (Exception e) {
            throw new RuntimeException("Could not read app id from config.properties. Please make sure it is present.");
        }
        this.api_url = url;
    }

    /**
     * Function to get the URL connection
     * @param api_endpoint the API endpoint to get the URL connection for
     * @return the URL connection
     */
    public HttpURLConnection getUrlConnection(String api_endpoint) {
        try {
            URL url = new URL(api_url + api_endpoint);
            return (HttpURLConnection) url.openConnection();
        } catch (Exception e) {
            throw new RuntimeException("Could not open connection to " + api_url + api_endpoint);
        }
    }

    /**
     * Function to send data to the API endpoint
     * @param api_endpoint the API endpoint to send data to
     * @param jsonData the data to be sent to the API endpoint
     */
    public void send(String api_endpoint, String jsonData) {
        try {
            conn = getUrlConnection(api_endpoint);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream());
            String jsonWithHeader = "{\"data\": " + jsonData + ", \"appId\": \"" + app_id + "\"}";
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
