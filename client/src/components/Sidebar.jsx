import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
  Box,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@mui/icons-material";
import { SocketContext } from "../Context";

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);

console.log('My ID:', me); // Debugging line to check the value of 'me'
  const [idToCall, setIdToCall] = useState("");

  return (
    <Container
      sx={{
        width: "600px",
        margin: "35px 0",
        padding: 0,
        "@media (max-width: 600px)": {
          width: "80%",
        },
      }}
    >
      <Paper
        elevation={10}
        sx={{ padding: "10px 20px", border: "2px solid black" }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Grid
            container
            sx={{
              width: "100%",
              "@media (max-width: 600px)": {
                flexDirection: "column",
              },
            }}
          >
            {/* Account Info */}
            <Grid item xs={12} md={6} sx={{ padding: "20px" }}>
              <Typography gutterBottom variant="h6">
                Account Info
              </Typography>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <CopyToClipboard text={me}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                  sx={{ marginTop: "20px" }}
                >
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>

            {/* Make a Call */}
            <Grid  xs={12} md={6} sx={{ padding: "20px" }}>
              <Typography gutterBottom variant="h6">
                Make a call
              </Typography>
              <TextField
                label="ID to call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
              />
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PhoneDisabled fontSize="large" />}
                  fullWidth
                  onClick={leaveCall}
                  sx={{ marginTop: "20px" }}
                >
                  Hang Up
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Phone fontSize="large" />}
                  fullWidth
                  onClick={() => callUser(idToCall)}
                  sx={{ marginTop: "20px" }}
                >
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
        {children}
      </Paper>
    </Container>
  );
};

export default Sidebar;
