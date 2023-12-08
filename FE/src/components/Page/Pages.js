import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import ManageCollaboratorsIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArchiveIcon from '@mui/icons-material/Archive';

const Pages = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" style={{ height: '100%' }}>
        <Grid container spacing={2} style={{ height: '100%' }}>
          <Grid item xs={2} style={{ borderRight: "2px solid grey", height: '100%' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
                <div>
                    <img
                    src="https://hatex.vn/upload/files/member_upload/h16820/files/logo.png"
                    height="180px"
                    width="240px"
                    style={{ border: "none", marginLeft: "-27px", maxHeight: '100%' }}
                    alt="Logo"
                    />
                </div>
            </Link>

            <p style = {{borderTop: "2px solid grey", marginBottom: "30px", marginLeft: "-20px"}}></p>
            <Link to="/network-devices" style={{ textDecoration: 'none' }}>
              <IconButton>
                
                <p style = {{fontSize: "18px"}}><BorderColorIcon style = {{color: "#64D3D7"}}/> <span style={{color: "black"}}>NetWork & Devices</span></p>
              </IconButton>
            </Link>
            <Link to="/move-to" style={{ textDecoration: 'none' }}>
              <IconButton>
                <p style = {{fontSize: "18px"}}><LowPriorityIcon  style = {{color: "#64D3D7"}}/> <span style={{color: "black"}}>Move to...</span></p>
              </IconButton>
            </Link>
            <Link to="/manage-collaborators" style={{ textDecoration: 'none' }}>
              <IconButton>
                <p style = {{fontSize: "18px"}}><ManageCollaboratorsIcon style = {{color: "#64D3D7"}}/> <span style={{color: "black"}}>Manage Collaborator</span></p>
                
              </IconButton>
            </Link>
            <Link to="/archive" style={{ textDecoration: 'none' }}>
              <IconButton>
                <p style = {{fontSize: "18px"}}><ArchiveIcon style = {{color: "#64D3D7"}}/> <span style={{color: "black"}}>Archive</span></p>
              </IconButton>
            </Link>
            <br/>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <IconButton>
                <p style = {{fontSize: "18px", marginTop: "220px"}}><ExitToAppIcon style = {{color: "red"}} /> <span style={{color: "red"}}>Log out</span></p>
              </IconButton>
            </Link>
          </Grid>

          {/* Cột 2 */}
          <Grid item xs={10} style={{ height: '80%' }}>
            <Grid container spacing={2} direction="column" style={{ height: '100%' }}>
              <Grid item style={{ flex: 1 , backgroundColor: "#99F4F7"}}>
                <h1 style = {{textAlign: "center", marginTop: "15px"}}>UWB BKEL TEAM</h1>
              </Grid>
              <Grid item style={{ flex: 2 }}>
                <p style = {{textAlign: "center", marginTop: "15px", fontSize: "30px", fontWeight: "400", color: "#2DBB3B"}}>START DEVICE DISCOVERY <br/> INSTRUCTIONS</p>
                <br/>
                <p style = {{textAlign: "center", fontSize: "20px", fontWeight: "400", color: "#4D564E"}}>Version: 14</p>
              </Grid>
              <Grid item style={{ flex: 4 }}>
                <p style = {{textAlign: "center", marginTop: "15px", fontSize: "25px", fontWeight: "400"}}>Team Name: UWB BKEL TEAM</p>
                <br/>
                <p style = {{textAlign: "center", fontSize: "20px", fontWeight: "400"}}>Teacher: Nguyễn Văn A</p>
                <br/>
                <p style = {{textAlign: "center", fontSize: "20px", fontWeight: "400"}}>Student: Nguyễn Văn A</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Pages;
