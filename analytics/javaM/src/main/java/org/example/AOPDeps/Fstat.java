package org.example.AOPDeps;

/**
 * Fstat
 * This class is used to store data about functions that are executed
 */
public class Fstat {
    public String parent;
    public int parent_id;
    public int  call_id;
    public String name;
    public int depth;
    public long start_time;
    public long end_time;

    /**
     * Constructor for Fstat
     * @param call_id the call id of the function
     * @param name the name of the function
     * @param parent_name the name of the parent function
     * @param parent_id the call id of the parent function
     * @param start_time the start time of the function
     * @param depth the depth of the function
     */
    public Fstat(int call_id, String name, String parent_name, int parent_id, long start_time, int depth) {
        this.parent = parent_name;
        this.parent_id = parent_id;
        this.call_id = call_id;
        this.depth = depth;
        this.name = name;
        this.start_time = start_time;
    }

    /**
     * Function to add time to the end_time variable
     * @param end_time the time to be added
     */
    public void addEndTime(long end_time) {
        this.end_time = end_time;
    }
}
