import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { NavBar } from "./navbar";
import SaveTheDateImage from "../assets/savethedate.png";
import IntroVideo from "../assets/libbywebsite.mp4";

const Root = styled(Box)({
  position: 'relative',
  boxSizing: 'border-box',
  height: '100vh',
  overflowY: 'auto',
});

const VideoContainer = styled(motion.div)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  backgroundColor: "black",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  overflow: "hidden",
});

const Video = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const ImageContainer = styled(motion.div)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  position: "relative",
});

const SaveTheDate = styled("img")({
  maxWidth: "90%",
  height: "auto",
  maxHeight: "80vh",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
});

export const Home = () => {
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    const videoElement = document.getElementById("introVideo");
    if (videoElement) {
      videoElement.onended = () => {
        setShowVideo(false);
      };
    }
  }, []);

  return (
    <Root>
      {showVideo && (
        <VideoContainer
          initial={{ opacity: 1 }}
          animate={{ opacity: showVideo ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <Video id="introVideo" autoPlay muted playsInline>
            <source src={IntroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </Video>
        </VideoContainer>
      )}

      {!showVideo && (
        <>
          <NavBar />
          <ImageContainer>
            <SaveTheDate src={SaveTheDateImage} alt="Save the Date - Libby & Jayson" />
          </ImageContainer>
        </>
      )}
    </Root>
  );
};
