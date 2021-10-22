import { me } from "appbit";
import * as messaging from "messaging";

export const disableAppTimeout = () => {
  console.log("Disabling app timeout");
  me.appTimeoutEnabled = false;
};

export const postHeartRate = (heartRate) => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({
      command: "heart-rate",
      heartRate,
    });
  }
};
