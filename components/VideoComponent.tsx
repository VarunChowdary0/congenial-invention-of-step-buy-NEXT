'use-client'

import { Media } from "@/types/item";
import React, { useEffect, useRef, useState } from "react";

interface curr{
    media : Media
}
const VideoComponent:React.FC<curr> = ({ media }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [poster, setPoster] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Wait for metadata to load (to get duration)
    video.addEventListener("loadedmetadata", () => {
      const randomTime = 1; // Get a random timestamp

      // Seek to the random frame
      video.currentTime = randomTime;

      video.addEventListener("seeked", captureFrame);
    });

    const captureFrame = () => {
      const video = videoRef.current;
      if (!video) return;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setPoster(canvas.toDataURL("image/jpeg")); // Convert frame to base64 image
    };
  }, [media.link]);

  return (
    <video
      ref={videoRef}
      src={media.link}
      controls
      muted
      poster={poster || ""}
      className="w-full h-full object-cover"
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoComponent;