import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@mui/material";
import NetworkNameModal from "./NetworkNameModal";
import { Add, AddAPhotoOutlined, AddComment } from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const NetWork = () => {
  const devices = useSelector((state) => state.devices);
  const [networkInfo, setNetworkInfo] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const storedNetworkInfo =
      JSON.parse(localStorage.getItem("networkInfo")) || [];
    setNetworkInfo(storedNetworkInfo);
  }, []);
  // const handleAddNetwork = () {
  //
  // }
  const [modalOpen, setModalOpen] = useState(false);
  const [networkName, setNetworkName] = useState("");

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveNetworkName = ({networkName,position}) => {
    setNetworkName(networkName);
    // Thực hiện các bước khác khi lưu tên mạng (nếu cần)
    const networkInfo1 = {
      name: networkName,
      positions:position,
      devices: devices,
    };
    setNetworkInfo([...networkInfo, networkInfo1]);
    localStorage.setItem(
      "networkInfo",
      JSON.stringify([...networkInfo, networkInfo1])
    );
  };
  const handleView = (room) => {
    navigate(`/move-to/${room}`)
  }
  // console.log(networkInfo);
  return (
    devices && (
      <>
        {networkInfo && networkInfo.length !== 0 &&
          networkInfo.map((network, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid gray",
                borderRadius: "20px",
                width: "100%",
                p: 2,
                mb: 2,
              }}
            >
              <Grid container alignItems="center">
                <Grid item xs={3}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkL0G4odnAAXghIZjKCONG-TYPCbkeNiZPIw&usqp=CAU"
                    width="100px"
                    height="120px"
                    alt="Avatar"
                    style={{
                      width: "100%",
                      borderRadius: "50%",
                      marginBottom: "10px",
                    }}
                  />
                </Grid>
                <Grid item xs={9}>
                  <Grid container>
                    <Grid item xs={12}>
                      {/* Hiển thị tên mạng và nút mở modal */}
                      <Grid container sx={{ position: "relative" }}>
                        <Grid item xs={2} display="flex" alignItems="start">
                          <p>Network Name: </p>
                        </Grid>
                        <Grid
                          item
                          xs={8}
                          // sx={{ position: "absolute", left: "120px", top: "-15px" }}
                        >
                          <p
                            style={{
                              fontSize: "30px",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {" "}
                            {network.name}{" "}
                          </p>
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{display:'flex',justifyContent:"space-between"}} >
                            <Box>
                          <p>
                            Tags:{" "}
                            {
                              devices.filter((device) => device.type === "tag")
                                .length
                            }
                          </p>
                          <p>
                            Anchors:{" "}
                            {
                              devices.filter(
                                (device) => device.type === "anchor"
                              ).length
                            }
                          </p></Box>
                          <Box display='flex' alignItems='center'>
                          <Button onClick={() => handleView(network.name)}>View</Button>
                          </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          ))}
        <Box sx={{
          border: "1px solid gray",
          borderRadius: "20px",
          width: "100%",
          padding: 1,
          mb: 2,
          display:"flex",
          justifyContent:"center"
        }}> 
          <Button variant="outline" onClick={handleOpenModal}>
            <Add />
          </Button>

          <NetworkNameModal
            open={modalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveNetworkName}
          />
        </Box>
      </>
    )
  );
};

export default NetWork;
