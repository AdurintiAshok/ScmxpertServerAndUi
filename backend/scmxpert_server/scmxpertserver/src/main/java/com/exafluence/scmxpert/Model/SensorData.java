package com.exafluence.scmxpert.Model;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document(collection = "DeviceStream")
public class SensorData {

    private double
            Battery_Level;

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    private int
            Device_ID;
    private  String timestamp;


    private double
            First_Sensor_temperature;
    private String Route_From;
    private String Route_To;

    public double getBattery_Level() {
        return Battery_Level;
    }

    public void setBattery_Level(double battery_Level) {
        Battery_Level = battery_Level;
    }

    public int getDevice_ID() {
        return Device_ID;
    }

    public void setDevice_ID(int device_ID) {
        Device_ID = device_ID;
    }

    public double getFirst_Sensor_temperature() {
        return First_Sensor_temperature;
    }

    public void setFirst_Sensor_temperature(double first_Sensor_temperature) {
        First_Sensor_temperature = first_Sensor_temperature;
    }

    public String getRoute_From() {
        return Route_From;
    }

    public void setRoute_From(String route_From) {
        Route_From = route_From;
    }

    public String getRoute_To() {
        return Route_To;
    }

    public void setRoute_To(String route_To) {
        Route_To = route_To;
    }
}

