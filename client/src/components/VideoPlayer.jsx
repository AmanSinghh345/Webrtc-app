import React, { useContext, useEffect } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { SocketContext } from "../Context";

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  useEffect(() => {
    if (myVideo.current && stream) {
      myVideo.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        "@media (max-width: 600px)": {
          flexDirection: "column",
        },
      }}
    >
      {stream && (
        <Paper
          sx={{ padding: "10px", border: "2px solid black", margin: "10px" }}
        >
          <Grid xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || "Name"}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              style={{
                width: "550px",
                height: "auto",
                display: "block",
                backgroundColor: "#000",
              }}
            />
          </Grid>
        </Paper>
      )}

      {callAccepted && !callEnded && (
        <Paper
          sx={{ padding: "10px", border: "2px solid black", margin: "10px" }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call.name || "Name"}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              style={{
                width: "550px",
                height: "auto",
                display: "block",
                backgroundColor: "#000",
              }}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
