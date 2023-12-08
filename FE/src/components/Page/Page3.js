// Page3.js
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link, useParams } from "react-router-dom";
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
import { useRef } from "react";
import { useState } from "react";
import { Button, Switch, TextField } from "@mui/material";

const Page3 = () => {
  const { room } = useParams();
  const now = new Date();
  const canvasRef = useRef(null);
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const [ob, setOb] = useState([]);
  const [size, setSize] = useState(null);

  // { x: 4.05, y: 0, x1: 0.105, y1: 3.61, ob_name: "tuong" },
  // { x: 4.155, y: 3.6, x1: 6.49, y1: 0.01, ob_name: "tuong" },
  // { x: 8.33, y: 0, x1: 0.08, y1: 3.61, ob_name: "tuong" },
  // { x: 10.635, y: 0, x1: 0.105, y1: 3.61, ob_name: "tuong" },
  // { x: 10.74, y: 0, x1: 0.6, y1: 2.03, ob_name: "T1" },
  // { x: 14, y: 0, x1: 0.7, y1: 3.025, ob_name: "T1" },
  // { x: 14, y: 3.74, x1: 0.69, y1: 0.1, ob_name: "tuong" },
  // { x: 4.77, y: 4.99, x1: 0.5, y1: 3.63, ob_name: "T2" },
  // { x: 6.54, y: 4.9, x1: 1.81, y1: 0.5, ob_name: "T2" },
  // { x: 6.54, y: 5.4, x1: 1.65, y1: 3.25, ob_name: "B1" },
  // { x: 10.27, y: 4.9, x1: 1.81, y1: 0.5, ob_name: "T2" },
  // { x: 10.37, y: 5.4, x1: 1.65, y1: 3.25, ob_name: "B1" },
  // { x: 0, y: 0.6, x1: 1.205, y1: 2.205, ob_name: "B1" },
  // { x: 13.96, y: 3.84, x1: 0.74, y1: 4.78, ob_name: "B1" },
  // { x: 0, y: 5.39, x1: 1.205, y1: 2.205, ob_name: "B1" },

  const devices = useSelector((state) => state.devices);
  const oldDevices = useSelector((state) => state.oldDevices);
  const [grid, setGrid] = useState(false);
  const [del, setDel] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const ob1 = JSON.parse(
      localStorage.getItem("networkInfo")
        ? localStorage.getItem("networkInfo")
        : []
    );
    // console.log(JSON.parse(JSON.parse(ob1)[0].postions))
    for (let i = 0; i < ob1.length; i++) {
      if (ob1[i].name === room) {
   
        // console.log(JSON.parse(ob1[i].positions))
        const position = JSON.parse(ob1[i].positions);
        setOb(position.location);
        setSize(position.size);

        // context.fillStyle = "gray";
        // context.fillRect(0, 0, 10, 10);
      }
    }

    return () =>
      dispatch({
        type: "actionSaga/localization",
        payload: { status: "false" },
      });
    // dispatch({
    //   type: "oldDevices/setoldDevices",
    //   payload: { status: "false" },
    // });
  }, []);
  useEffect(() => {
    if (grid === true) {
      dispatch({
        type: "actionSaga/localization",
        payload: { status: "true" },
      });
      console.log("----");
    }
    if (grid === false) {
      dispatch({
        type: "actionSaga/localization",
        payload: { status: "false" },
      });
    }
  }, [grid]);
  useEffect(() => {
    if (del == true){
      dispatch({
        type: "actionSaga/delLocation"
      });
    }
  },[del])
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (grid === true) {
        
        dispatch({ type: "deviceSaga/getDevices", payload: devices });
        if (devices!== null){
          const tag =  devices.filter(item => item.type === "tag")
          // console.log(tag[0])
        dispatch({ type: "actionSaga/location", payload: {location:{x:tag[0].x,y:tag[0].y,z:tag[0].z},time:Date.now() }});
        }
        
      }
    }, 100);
    // Clear interval khi component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [grid, devices]);
  const drawCanvas = () => {
  
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const f = 60;
    context.font = "16px Arial";
    // Clear canvas
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    context.fillStyle = "gray";
    context.fillRect(-39, -41.4, canvasWidth, canvasHeight);
    // context.translate(10,0)
    // context.translate(9, 41.4);
    // // Clear canvas
    context.clearRect(0, 0, canvasWidth - 78, canvasHeight - 82.8);

    // Your drawing logic here
    if (ob.length > 0) {
      // console.log(ob);
      ob.forEach((item) => {
        context.fillStyle =
          item.ob_name === "tuong"
            ? "gray"
            : item.ob_name === "T1"
            ? "wheat"
            : item.ob_name === "T2"
            ? "goldenrod"
            : "thistle";
        context.fillRect(item.x * f, item.y * f, item.x1 * f, item.y1 * f);
        //4.05 , 0 , 0.105 , 3.61
      });
    }

    if (devices) {
      devices.forEach((device) => {
        if (device.type === "anchor") {
          context.fillStyle = "red";
          context.fillRect(device.x * f, device.y * f, 10, 10);
          const text = device.name.substr(2, 4);
          const textWidth = context.measureText(text).width;
          context.fillStyle = "black";
          context.fillText(
            text,
            device.x * f - textWidth / 2 + 18,
            device.y * f + 25
          );
        }
        if (device.type === "tag") {
          context.fillStyle = "black";
          const x = device.x * f < 0 ? 0 : device.x * f;
          const y = device.y * f < 0 ? 0 : device.y * f;
          context.fillRect(x, y, 10, 10);
          const text = device.name.substr(2, 4);
          context.fillStyle = "blue";
          context.fillText(text, x + 10, y + 10);
        }
      });
    }
  };

  const animateCanvas = () => {
    drawCanvas();
    requestAnimationFrame(animateCanvas);
  };

  useEffect(() => {
    if (size) {

      animateCanvas();
    }
  }, [devices, ob, size]);
  useEffect(() => {
    if (size) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.translate(39, 41.4);
     
    }
  }, [size]);
  const save = () => {
    setOb([...ob, { x, y, x1, y1 }]);
  };
  const handleChange = (event) => {
    console.log(event.target.checked);
    setGrid(event.target.checked);
  };
  const handleDel = (event) => {
    console.log(event.target.checked);
    setDel(event.target.checked);
  };
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" style={{ height: "100%" }}>
        <Grid container spacing={2} style={{ height: "100%" }}>
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
            <Grid container>
              <Grid item xs={12} style={{ height: "100%" }}>
                <p>
                  Mouse Coordinates: ({mouseCoordinates.x}, {mouseCoordinates.y}
                  )
                </p>
                <Switch
                  checked={grid}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Switch
                  checked={del}
                  onChange={handleDel}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <canvas
                  ref={canvasRef}
                  style={{ border: "2px solid black" }}
                  width={size ? size.width : "78"}
                  height={size ? size.height : "82.8"}
                ></canvas>
              </Grid>

              {/* <Grid item xs={12} style={{ height: "100%" }}>
                <TextField value={x} onChange={(e) => setX(e.target.value)} />
              </Grid>
              <Grid item xs={12} style={{ height: "100%" }}>
                <TextField value={y} onChange={(e) => setY(e.target.value)} />
              </Grid>
              <Grid item xs={12} style={{ height: "100%" }}>
                <TextField value={x1} onChange={(e) => setX1(e.target.value)} />
              </Grid>
              <Grid item xs={12} style={{ height: "100%" }}>
                <TextField value={y1} onChange={(e) => setY1(e.target.value)} />
                <Grid item xs={12} style={{ height: "100%" }}>
                  <Button onClick={save} variant="contained">
                    Save
                  </Button>
                </Grid>
                  </Grid>*/}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Page3;
