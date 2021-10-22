import * as document from "document";
import * as messaging from "messaging";
import { HeartRateSensor } from "heart-rate";
import { disableAppTimeout, postHeartRate } from "../utils";

disableAppTimeout();

messaging.peerSocket.addEventListener("open", () => {
  console.log("Peer socket is open");
});

messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});

const initHeartRateSensor = () => {
  const heartRate = document.getElementById("heart-rate");

  const hrm = new HeartRateSensor();

  hrm.addEventListener("reading", () => {
    heartRate.text = `${hrm.heartRate}`;
    postHeartRate(hrm.heartRate);
  });

  hrm.start();
};
initHeartRateSensor();
