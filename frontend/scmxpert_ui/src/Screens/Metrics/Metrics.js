import React from "react";
import { Chart } from "react-google-charts";
import "../Metrics/Metrics.css";
import Architecture from "../../assets/architecture.jpg";
export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "Containers Countries",
  is3D: true,
  backgroundColor: "#E4E9F7",
};
export default function Metrics() {
  return (
    <div className="container mt-3 container-for-desktop">
      <div className="row">
        <div>
          <div class="architecture-container ">
            <div class="component wide">SCMLite Architecture</div>
            <div class="component half-wide">Data Source</div>
            <div class="component half-wide">Stream Processing</div>
            <div class="component half-wide">DataBase</div>
            <div class="component half-wide">Users</div>
            <div class="component">Socket Server</div>
            <div class="arrow">→</div>
            <div class="component">Python Producer</div>
            <div class="arrow">→</div>

            <div class="component">Kafka Broker</div>

            <div class="arrow">→</div>
            <div class="component">Python Consumer</div>
            <div class="arrow">→</div>
            <div class="component">MongoDb</div>
            <div class="arrow">→</div>
            <div class="component">Application</div>

            <div class="component wide">Services</div>
            <div class="component wide">AWS EC2 Instance (t2.micro)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
