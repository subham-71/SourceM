package org.example.StatObjects;

public class Fstat {
    String name;
    int depth;
    long start_time;
    long end_time;

    public Fstat(String name, long start_time, int depth) {
        this.depth = depth;
        this.name = name;
        this.start_time = start_time;
    }

    public void addEndTime(long end_time) {
        this.end_time = end_time;
    }
}
