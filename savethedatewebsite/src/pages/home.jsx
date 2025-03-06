import { useState, useEffect, useRef } from "react";
import { styled } from "@mui/system";
import { Box, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import { motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { NavBar } from "./navbar";
import { BrownButton } from "./brownbutton";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase-config";
import SaveTheDateImage from "../assets/savethedate.png";
import IntroVideo from "../assets/libbywebsite.mp4";
import ClearIcon from "@mui/icons-material/Clear";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const Root = styled(Box)({
  position: "relative",
  boxSizing: "border-box",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflowY: "auto",
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

const ContentWrapper = styled(Box)({
  display: "flex",
  width: "100%",
  height: "100vh",
});

const HalfContainer = styled(Box)({
  width: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "1rem",
  gap: "1rem",
});

const ImageContainer = styled(motion.div)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  perspective: "1000px",
  cursor: "pointer",
  transform: "translateZ(75px)",
  transformStyle: "preserve-3d",
});

const SaveTheDate = styled(motion.img)({
  maxWidth: "80%",
  height: "auto",
  maxHeight: "80vh",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
});

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.5rem",
  width: "100%",
  maxWidth: "400px",
});

const RowContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  width: "100%",
});

const Input = styled(TextField)({
  width: "100%",
  borderRadius: "50px",
  "& .MuiInputBase-root": {
    borderRadius: "50px",
  },
});

export const Home = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadMessage, setDownloadMessage] = useState("");
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };


  useEffect(() => {
    const videoElement = document.getElementById("introVideo");
    if (videoElement) {
      videoElement.onended = () => {
        setShowVideo(false);
      };
    }
  }, []);

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!firstName || !lastName || !email) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const inviteesRef = collection(db, "invitees");
      const q = query(
        inviteesRef,
        where("firstName", "==", firstName.toLowerCase()),
        where("lastName", "==", lastName.toLowerCase()),
        where("email", "==", email)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setErrorMessage("An invitee with these details already exists. Please check your details and try again.");
        return;
      }

      await addDoc(inviteesRef, {
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email,
        rsvpBool: false,
      });

      setSuccessMessage("Invitee added successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (error) {
      console.error("Error adding invitee:", error);
      setErrorMessage("Failed to add invitee. Please try again.");
    }
  };

  const handleSaveDate = () => {
    setDownloadMessage("Downloading calendar event...");
    const event = {
      title: "Libby & Jayson - Save the Date",
      start: "2026-03-28T17:30:00",
      end: "2026-03-28T23:00:00",
    };
    
    const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${event.title}\nDTSTART:${event.start.replace(/[-:]/g, "")}\nDTEND:${event.end.replace(/[-:]/g, "")}\nLOCATION:${event.location}\nEND:VEVENT\nEND:VCALENDAR`;
    
    const blob = new Blob([icsData], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "save-the-date.ics";
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloadMessage(""), 3000);
  };

  return (
    <Root>
      {showVideo && (
        <VideoContainer initial={{ opacity: 1 }} animate={{ opacity: showVideo ? 1 : 0 }} transition={{ duration: 1 }}>
          <Video id="introVideo" autoPlay muted playsInline>
            <source src={IntroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </Video>
        </VideoContainer>
      )}
      {!showVideo && (
        <>
          <NavBar />
          <ContentWrapper>
            <HalfContainer>
              <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transformStyle: "preserve-3d",
                  transform,
                }}
                className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
              >
                <ImageContainer onClick={handleSaveDate}>
                  <SaveTheDate src={SaveTheDateImage} alt="Save the Date - Libby & Jayson" />
                </ImageContainer>
              </motion.div>
              <BrownButton text="Save to Calendar" onClick={handleSaveDate} />
              {downloadMessage && <Typography color="success">{downloadMessage}</Typography>}
            </HalfContainer>
            <HalfContainer>
              <FormContainer>
                <Typography variant="h4" align="center">Save Your Details!</Typography>
                <Typography align="center">Please enter your contact details</Typography>
                <RowContainer>
                  <Input label="First Name" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setFirstName("")}> <ClearIcon /> </IconButton>
                      </InputAdornment>
                    ),
                  }} />
                  <Input label="Last Name" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setLastName("")}> <ClearIcon /> </IconButton>
                      </InputAdornment>
                    ),
                  }} />
                </RowContainer>
                <Input label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setEmail("")}> <ClearIcon /> </IconButton>
                    </InputAdornment>
                  ),
                }} />
                <BrownButton text="Submit" onClick={handleSubmit} />
                {successMessage && <Typography color="success">{successMessage}</Typography>}
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
              </FormContainer>
            </HalfContainer>
          </ContentWrapper>
        </>
      )}
    </Root>
  );
};
