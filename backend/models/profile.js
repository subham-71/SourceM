class Profile {
        constructor(parent, parent_id, call_id, name, depth, start_time, end_time) {
                this.parent = parent;
                this.parent_id = parent_id;
                this.call_id = call_id;
                this.name = name;
                this.depth = depth;
                this.start_time = start_time;
                this.end_time = end_time;
        }
    }
    
module.exports = Profile;