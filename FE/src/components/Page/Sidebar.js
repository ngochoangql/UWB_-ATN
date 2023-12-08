// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Sidebar = () => {
  return (
    <Drawer variant="permanent">
      <List>
        <ListItem button component={Link} to="/page1">
          <ListItemText primary="Page 1" />
        </ListItem>
        <ListItem button component={Link} to="/page2">
          <ListItemText primary="Page 2" />
        </ListItem>
        <ListItem button component={Link} to="/page3">
          <ListItemText primary="Page 3" />
        </ListItem>
        {/* Add more links for other pages */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
