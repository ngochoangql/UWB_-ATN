import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import ManageCollaboratorsIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ArchiveIcon from "@mui/icons-material/Archive";
import BoxComponent from "./BoxComponent";
import NetWork from "./NetWork";
import BoxDevice from "./BoxDevice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";

const Page1 = () => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices);
  
  useEffect(() => {
    // dispatch({type:"deviceSaga/getDevices"})

    const intervalId = setInterval(() => {
      dispatch({ type: "deviceSaga/getDevices" });
    }, 10);

    // Clear interval khi component unmount
    return () => clearInterval(intervalId);
  }, []);
  // if (devices) console.log(devices)

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ height: "100vh" }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid
            item
            xs={2}
            style={{ borderRight: "2px solid grey", height: "100%" }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <div>
                <img
                  src="https://hatex.vn/upload/files/member_upload/h16820/files/logo.png"
                  height="180px"
                  width="240px"
                  style={{
                    border: "none",
                    marginLeft: "-27px",
                    maxHeight: "100%",
                  }}
                  alt="Logo"
                />
              </div>
            </Link>

            <p
              style={{
                borderTop: "2px solid grey",
                marginBottom: "30px",
                marginLeft: "-20px",
              }}
            ></p>
            <Link to="/network-devices" style={{ textDecoration: "none" }}>
              <IconButton>
                <p style={{ fontSize: "18px" }}>
                  <BorderColorIcon style={{ color: "#64D3D7" }} />{" "}
                  <span style={{ color: "black" }}>NetWork & Devices</span>
                </p>
              </IconButton>
            </Link>
            <Link to="/move-to" style={{ textDecoration: "none" }}>
              <IconButton>
                <p style={{ fontSize: "18px" }}>
                  <LowPriorityIcon style={{ color: "#64D3D7" }} />{" "}
                  <span style={{ color: "black" }}>Move to...</span>
                </p>
              </IconButton>
            </Link>
            <Link to="/manage-collaborators" style={{ textDecoration: "none" }}>
              <IconButton>
                <p style={{ fontSize: "18px" }}>
                  <ManageCollaboratorsIcon style={{ color: "#64D3D7" }} />{" "}
                  <span style={{ color: "black" }}>Manage Collaborator</span>
                </p>
              </IconButton>
            </Link>
            <Link to="/archive" style={{ textDecoration: "none" }}>
              <IconButton>
                <p style={{ fontSize: "18px" }}>
                  <ArchiveIcon style={{ color: "#64D3D7" }} />{" "}
                  <span style={{ color: "black" }}>Archive</span>
                </p>
              </IconButton>
            </Link>
            <br />
            <Link to="/login" style={{ textDecoration: "none" }}>
              <IconButton>
                <p style={{ fontSize: "18px", marginTop: "220px" }}>
                  <ExitToAppIcon style={{ color: "red" }} />{" "}
                  <span style={{ color: "red" }}>Log out</span>
                </p>
              </IconButton>
            </Link>
          </Grid>
          {/* Cột 2 */}
          <Grid item xs={10} style={{ height: "100%" }}>
            <Grid container spacing={2} direction="row" sx={{ height: "100%" }}>
              <Grid item xs={12} sx={{ backgroundColor: "#99F4F7" }}>
                <h1 style={{ textAlign: "center", marginTop: "15px" }}>
                  NETWORK & DEVICES
                </h1>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ backgroundColor: "#8E272F", textAlign: "center" }}
              >
                <p
                  style={{
                    fontSize: "20px",
                    color: "white",
                    fontWeight: "200",
                  }}
                >
                  {" "}
                  2 unassigned devices found so far
                </p>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacecing={2}
                  direction="column"
                  style={{ height: "100%", marginLeft: "20px" }}
                >
                  <Grid item style={{ flex: 1 }} xs={12}>
                    <p
                      style={{
                        marginTop: "10px",
                        fontWeight: "600",
                        color: "#1C3EAF",
                      }}
                    >
                      NETWORK DETAILS
                    </p>
                  </Grid>
                  <Grid
                    container
                    spacecing={2}
                    direction="row"
                    style={{ height: "100%", flex: "0.5" }}
                  >
                    <Grid item xs={6} sx={{ flex: 2 }}>
                      <p> NETWORK </p>
                    </Grid>
                    <Grid item xs={6} sx={{ flex: 2, pl: 2 }}>
                      <p>DEVICES</p>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacecing={2}
                    direction="row"
                    sx={{ height: "100%", flex: "10" }}
                  >
                    <Grid item xs={6} sx={{ flex: 2, pt: 2 }}>
                      <NetWork />
                    </Grid>
                    <Grid item xs={6} sx={{ flex: 4, p: 2 }}>
                      {devices &&
                        devices.map((device, index) => (
                          <BoxDevice key={index} device={device} />
                          // <></>
                        ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
       
      </Container>
    </>
  );
};

export default Page1;
