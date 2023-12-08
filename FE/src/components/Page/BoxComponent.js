import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const BoxComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [networkName, setNetworkName] = useState('');

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleSaveClick = () => {
    console.log('Network Name:', networkName);
    setModalOpen(false);
  };

  const handleCancelClick = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Box style={{ border: "1px solid gray", borderRadius: "20px", width: "80%" }}>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <img
              src="https://png.pngtree.com/element_origin_min_pic/16/11/23/a4a24fb2ac13ee8529cfac396ad6b26b.jpg"
              alt="Avatar"
              style={{ width: '100%', borderRadius: '50%', marginBottom: '10px' }}
            />
          </Grid>
          <Grid item xs={8}>
            <Grid container direction="column" style = {{marginLeft: "10px"}}>
              <Grid item>
                <p style = {{fontSize: "18px", fontWeight: "600", marginTop: "5px"}}>Device with ID 0x9950</p>
              </Grid>
              <Grid item>
                <p style = {{fontSize: "16px", fontWeight: "400", marginTop: "-10px"}}>Anchor: 1</p>
              </Grid>
              <Grid item>
                <p style = {{fontSize: "16px", fontWeight: "400", marginTop: "-10px"}}>Tags: 0</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <IconButton sx = {{color: "green", marginLeft: "20px", marginTop: "-15px", marginBottom: "10px"}} onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
            <IconButton sx = {{color: "red", marginLeft: "20px"}}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Modal open={isModalOpen} onClose={handleCancelClick}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            label="Network Name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={networkName}
            onChange={(e) => setNetworkName(e.target.value)}
          />
          <Button variant="contained" color = "success" onClick={handleSaveClick} style = {{marginLeft: "160px"}}>
            Save
          </Button>
          <Button variant="contained" onClick={handleCancelClick} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  )
};

export default BoxComponent;
