import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NetworkWifiIcon from "@mui/icons-material/NetworkWifi";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import "./boxdevice.css";
import { hexToDecimalLittleEndian, littleEndian } from "../../untils/untils";
import { Save } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
const BoxDevice = ({ device }) => {
  // console.log(device)
  const [isModalOpen, setModalOpen] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState(device);
  const updateState = (field, value) => {
    setDeviceInfo((prev) => ({ ...prev, [field]: value }));
  };

  const [uwbFirmwareUpdateChecked, setUwbFirmwareUpdateChecked] = useState(
    deviceInfo.operation[6] === "1" ? true : false
  );
  const [ledChecked, setLedChecked] = useState(
    deviceInfo.operation[5] === "1" ? true : false
  );
  const [initiatorChecked, setInitiatorChecked] = useState(
    deviceInfo.operation[8] === "1" ? true : false
  );
  const [stationDetectionChecked, setStationDetectionChecked] = useState(
    deviceInfo.operation[4] === "1" ? true : false
  );
  const [locationChecked, setLocationChecked] = useState(
    deviceInfo.operation[10] === "1" ? true : false
  );
  const [customNetwork, setCustomNetwork] = useState("");
  const [uwb, setUwb] = useState(
    deviceInfo.operation.substr(1, 2) === "00"
      ? "off"
      : deviceInfo.operation.substr(1, 2) === "01"
      ? "passive"
      : "active"
  );
  const [nodeType, setNodeType] = useState(deviceInfo.type);
  const [x, setX] = useState(deviceInfo.x);
  const [y, setY] = useState(deviceInfo.y);
  const [z, setZ] = useState(deviceInfo.z);
  const [save, setSave] = useState(false)
   // const handleChange = (event) => {
  //   setNetwork(event.target.value);
  // };

  const handleCustomNetworkChange = (event) => {
    setCustomNetwork(event.target.value);
  };
  const handleEditClick = () => {
    setModalOpen(true);
  };

  const dispatch = useDispatch();
  const intToHexWithPadding = (number) => {
    // Kiểm tra nếu số âm, thì chuyển thành số dương và lấy số bù 1
    let kt = 1;
    if (number < 0) {
      kt = 0;
      number = Math.abs(number) - 2;
    }
    // console.log(number)
    // Chuyển số nguyên thành số hex
    var hex = number.toString(16);

    // Thêm số 0 vào trước cho đủ 8 chữ số
    while (hex.length < 8) {
      hex = "0" + hex;
    }
    if (kt ===1 ){
      let newHex1 = ""
      for (let i=0;i<hex.length;i+=2){
        newHex1 = hex.slice(i,i+2) + newHex1
      }
      return newHex1;
    }
    let bin = number.toString(2)
    while (bin.length < 32) {
      bin = "0" + bin;
    }
    let newBin = ""
    for (let i=0;i<bin.length;i++){
      if (bin.slice(i,i+1) === "0")
           newBin = newBin + "1"
      else
      newBin = newBin + "0"
    }
    const newHex = parseInt(newBin,2).toString(16).toUpperCase() 
    let newHex1 = ""
    for (let i=0;i<newHex.length;i+=2){
      newHex1 = newHex.slice(i,i+2) + newHex1
    }
    return newHex1;
  };
  // console.log(intToHexWithPadding( x.slice(0,1) === "-" ? -1*parseInt(x.slice(1,x.length)) : parseInt(x)));
  // console.log(intToHexWithPadding( x*1000))
  const handleSave = () => {
   setSave(true)
    
  };
  useEffect(() => {
    if (save === true){
      console.log("t")
      const operation =
      (nodeType === "anchor" ? "1" : "0") +
      (uwb === "off" ? "00" : uwb === "passive" ? "01" : "10") +
      deviceInfo.operation.substr(3, 1) +
      (stationDetectionChecked ? "1" : "0") +
      (ledChecked ? "1" : "0") +
      (uwbFirmwareUpdateChecked ? "1" : "0") +
      deviceInfo.operation.substr(7, 1) +
      (initiatorChecked ? "1" : "0") +
      deviceInfo.operation.substr(9, 1) +
      (locationChecked ? "1" : "0") +
      deviceInfo.operation.substr(11, 5);

    console.log(operation);
    // const a = {
    //   "type":nodeType,

    // }
    let binaryString = operation; // Chuỗi nhị phân

    let hexResult = "";
    for (let i = 0; i < binaryString.length; i += 8) {
      // Lấy cặp 8 kí tự nhị phân
      let binaryChunk = binaryString.substr(i, 8);

      // Chuyển đổi chuỗi nhị phân thành số nguyên
      let decimalValue = parseInt(binaryChunk, 2);

      // Chuyển đổi số nguyên thành chuỗi hexa và thêm vào kết quả
      hexResult += decimalValue.toString(16).padStart(2, "0");
    }
      dispatch({
        type: "actionSaga/addAction",
        payload: {
          operation: hexResult,
          location: intToHexWithPadding( x*1000)+intToHexWithPadding( y*1000)+intToHexWithPadding( z*1000)+"64",
          status: "true",
          addr: device.addr,
          type: device.type,
        },
      });
      setOpenSnackbar(true);
      setModalOpen(false)
      setSave(false)
    }
  },[save])
  const handleCancelClick = () => {
    setModalOpen(false);
  };
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  // console.log(littleEndian('00002710'))
  // console.log(hexToDecimalLittleEndian(deviceInfo.location.substr(2,8)))
  return (
    <>
    <Snackbar
    open={openSnackbar}
    autoHideDuration={6000} // Thời gian hiển thị Snackbar (6 giây trong ví dụ)
    onClose={handleSnackbarClose}
  >
    <Alert onClose={handleSnackbarClose} severity="success">
      Cập nhật thành công!
    </Alert>
  </Snackbar>
      <Box
        sx={{ border: "1px solid gray", borderRadius: "20px", width: "100%", p:2,mb:2 }}
      >
        <Grid container alignItems="center">
          <Grid item xs={2}>
            {device.type === "tag" ? (
              <div className="shape circle "></div>
            ) : (
              device.type === "anchor" && (
                <div className="shape triangle "></div>
              )
            )}
          </Grid>
          <Grid item xs={8}>
            <Grid container direction="column" sx={{ marginLeft: "10px" }}>
              <Grid item>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginTop: "5px",
                  }}
                >
                  {device.name}
                </p>
              </Grid>
              <Grid item>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginTop: "5px",
                  }}
                >
                  {device.addr}
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} display='flex' justifyContent='space-between' br={2}>
            <IconButton sx={{
              color: "blue",
              marginLeft: "20px",
              marginBottom: "10px",
            }}>
              {device.location && (
                <LocationOnIcon
                  
                />
              )}
            </IconButton>
      
            <IconButton sx={{
              color: "green",
              marginLeft: "20px",
              marginBottom: "10px",
            }}
            onClick={handleEditClick}
            >
              <EditIcon/>
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Modal open={isModalOpen} onClose={handleCancelClick}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={deviceInfo.name}
            onChange={(e) => updateState("name", e.target.value)}
            sx={{ marginTop: "-5px" }}
          />
          <p style={{ fontWeight: "600" }}>
            ID: 0xDECA183BD840D6B8 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; BLE:{" "}
            {device.addr}
          </p>

          <TextField
            label="Node Type"
            fullWidth
            variant="outlined"
            margin="normal"
            select
            value={nodeType}
            onChange={(e) => setNodeType(e.target.value)}
            sx={{ marginTop: "-5px" }}
          >
            <MenuItem value="anchor">Anchor</MenuItem>
            <MenuItem value="tag">Tag</MenuItem>
          </TextField>
          <TextField
            label="UWB"
            fullWidth
            variant="outlined"
            margin="normal"
            select
            value={uwb}
            onChange={(e) => setUwb(e.target.value)}
          >
            <MenuItem value="active">active</MenuItem>
            <MenuItem value="off">off</MenuItem>
            <MenuItem value="passive">passive</MenuItem>
          </TextField>
          <FormControlLabel
            control={
              <Checkbox
                checked={uwbFirmwareUpdateChecked}
                onChange={() =>
                  setUwbFirmwareUpdateChecked(!uwbFirmwareUpdateChecked)
                }
              />
            }
            label="UWB FIRMWARE UPDATE"
          />
          <br />
          <FormControlLabel
            control={
              <Checkbox
                checked={ledChecked}
                onChange={() => setLedChecked(!ledChecked)}
              />
            }
            label="LED"
          />
          <br />
          {deviceInfo.type === "anchor" ? (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={initiatorChecked}
                    onChange={() => setInitiatorChecked(!initiatorChecked)}
                  />
                }
                label="INITIATOR"
              />
              <p style={{ fontWeight: "600" }}>POSITION (M)</p>
              <Grid container spacing={2} sx={{ marginTop: "-30px" }}>
                <Grid item xs={4}>
                  <TextField
                    label="X"
                    variant="outlined"
                    margin="normal"
                    value={x}
                    onChange={(e) => setX(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Y"
                    variant="outlined"
                    margin="normal"
                    value={y}
                    onChange={(e) => setY(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Z"
                    variant="outlined"
                    margin="normal"
                    value={z}
                    onChange={(e) => setZ(e.target.value)}
                  />
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={stationDetectionChecked}
                    onChange={() => setStationDetectionChecked(!ledChecked)}
                  />
                }
                label="STATIONARY DETECTION"
              />
              <br />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={locationChecked}
                    onChange={() => setLocationChecked(!ledChecked)}
                  />
                }
                label="LOCATION ENGINE"
              />
              <br />
            </>
          )}

          <Button
            variant="contained"
            onClick={handleSave}
            color="success"
            sx={{ marginLeft: "360px" }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            onClick={handleCancelClick}
            sx={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default BoxDevice;
