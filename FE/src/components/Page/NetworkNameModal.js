import { useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const NetworkNameModal = ({ open, onClose, onSave }) => {
  const [networkName, setNetworkName] = useState("");
  const [position, setPosition] = useState("");
  const handleSave = () => {
    onSave({networkName,position});
    setNetworkName(""); // Reset networkName after saving
    setPosition("")
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="network-name-modal"
      aria-describedby="enter-network-name"
      
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          backgroundColor: "white",
          padding: 16,
          borderRadius: 8,
        }}
      >
        <h2 id="network-name-modal">Name</h2>
        <TextField
          label="Network Name"
          variant="outlined"
          fullWidth
          value={networkName}
          onChange={(e) => setNetworkName(e.target.value)}
          sx={{ marginBottom: 16 }}
        />
        <h2 id="network-position-modal">Positions Object In Room</h2>
        <TextField
          label="Positions Object In Room"
          variant="outlined"
          fullWidth
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          sx={{ marginBottom: 16 }}
        />
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default NetworkNameModal;
