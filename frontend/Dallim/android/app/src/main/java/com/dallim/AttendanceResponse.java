package com.dallim;



public class AttendanceResponse {
    private String status;
    private AttendanceData data;
    private String message;

    public String getStatus() {
        return status;
    }

    public AttendanceData getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setData(AttendanceData data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    // getters and setters

    public static class AttendanceData {
        private String[] attendances;

        public String[] getAttendances() {
            return attendances;
        }

        public void setAttendances(String[] attendances) {
            this.attendances = attendances;
        }
    }
}
