import { NavBar } from "./navbar";
import { styled } from "@mui/system";
import { BrownButton } from "./brownbutton";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useState } from "react";
import { Box, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const Root = styled(Box)({
  position: "relative",
  boxSizing: "border-box",
  height: "100vh",
});

const Container = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
  width: "50%",
  margin: "0 auto",
  flexDirection: "column",
});

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.5rem",
  width: "100%",
  padding: "2rem",
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

export const RSVP = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!firstName || !lastName || !email) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      // Query Firebase to check if an invitee with the same details already exists
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

      // If no duplicate, add the invitee
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

  return (
    <Root>
      <NavBar />
      <Container>
        <Typography variant="h4" align="center">
          We need to keep in touch!
        </Typography>
        <FormContainer>
          <Typography align="center">Please enter your contact details</Typography>
          
          {/* Row for First Name & Last Name */}
          <RowContainer>
            <Input
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setFirstName("")}
                      sx={{ p: 0.5, "& .MuiSvgIcon-root": { fontSize: 18 } }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Input
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setLastName("")}
                      sx={{ p: 0.5, "& .MuiSvgIcon-root": { fontSize: 18 } }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </RowContainer>

          {/* Email Field */}
          <Input
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setEmail("")}
                    sx={{ p: 0.5, "& .MuiSvgIcon-root": { fontSize: 18 } }}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Submit Button */}
          <BrownButton text="Submit" onClick={handleSubmit} />

          {/* Success & Error Messages */}
          {successMessage && (
            <Typography variant="body2" color="success" align="center">
              {successMessage}
            </Typography>
          )}
          {errorMessage && (
            <Typography variant="body2" color="error" align="center">
              {errorMessage}
            </Typography>
          )}
        </FormContainer>
      </Container>
    </Root>
  );
};
