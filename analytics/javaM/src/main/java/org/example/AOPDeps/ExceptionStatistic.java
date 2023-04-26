package org.example.AOPDeps;

import java.time.LocalDateTime;
import java.util.ArrayList;

public class ExceptionStatistic {
    String exceptionClass;
    String functionName;
    ArrayList<String> timestamps;

    public ExceptionStatistic(String exceptionClass, String functionName) {
        this.exceptionClass = exceptionClass;
        this.functionName = functionName;
        this.timestamps = new ArrayList<>();
        this.timestamps.add(LocalDateTime.now().toString());
    }

    public void addTimestamp(String timestamp) {
        timestamps.add(timestamp);
    }

    public ArrayList<String> getTimestamps() {
        return timestamps;
    }
}
