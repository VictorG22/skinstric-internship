import { useEffect } from "react";


export default function CameraGuard({
  onError,
}: {
  onError: (message: string) => void;
}) {
  useEffect(() => {
    const checkCamera = async () => {
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.enumerateDevices
      ) {
        onError("Camera is not supported on this browser.");
        return;
      }

      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasCamera = devices.some(
          (d) => d.kind === "videoinput"
        );

        if (!hasCamera) {
          onError("No camera was detected on this device.");
        }
      } catch {
        onError("Unable to detect camera availability.");
      }
    };

    checkCamera();
  }, [onError]);

  return null;
}