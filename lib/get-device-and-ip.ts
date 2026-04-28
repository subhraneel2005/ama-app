import FingerprintJS from "@fingerprintjs/fingerprintjs";

export async function getDeviceAndIp() {
  // device fingerprint
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  const deviceID = result.visitorId;

  // get ip
  const ipRes = await fetch("https://api.ipify.org?format=json");
  const ipData = await ipRes.json();

  const ip = ipData.ip;

  return {
    deviceID,
    ip,
  };
}