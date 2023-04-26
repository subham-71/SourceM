package org.example.AOPDeps;

public class Fstat {
    public String parent;
    public int parent_id;
    public int  call_id;
    public String name;
    public int depth;
    public long start_time;
    public long end_time;

    public Fstat(int call_id, String name, String parent_name, int parent_id, long start_time, int depth) {
        this.parent = parent_name;
        this.parent_id = parent_id;
        this.call_id = call_id;
        this.depth = depth;
        this.name = name;
        this.start_time = start_time;
    }

    public void addEndTime(long end_time) {
        this.end_time = end_time;
    }
}
