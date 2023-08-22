import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllApplicant, deleteApplicant } from "../helper/helper";
import { Link, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import toast, { Toaster } from "react-hot-toast";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicTable() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [applicantId, setApplicantId] = useState('');
  const handleOpen = (id) => {
    console.log("asdjflajdf :",id);
    setOpen(true);
    setApplicantId(id);
  };
  const handleClose = () => setOpen(false);

  const handleDeleteApplicant =() => {
    let deleteApplicantPromise =  deleteApplicant({id: applicantId});

    toast.promise(deleteApplicantPromise, {
        loading: 'Checking...',
        success : <b>Deleted Successfully...!</b>,
        error :() => <b>Error in deletion</b>
      });
      setOpen(false);
  };

  const handleEditApplicant =(id)=>{
    navigate(`/applicant/${id}`);
  }

  const handleAddApplicant = () => {
    navigate("/add-applicant");
  };
  useEffect(() => {
    if(!open){
      getAllApplicant().then(({ data }) => {
        setApplicants(data);
      });
    }
  }, [open]);

  useEffect(() => {
    getAllApplicant().then(({ data }) => {
      setApplicants(data);
    });
  }, []);

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }
  function handleProfile(){
    navigate('/profile')
  }

  const handleCloseAppBar = () => {
    setAnchorEl(null);
  };
  return (
    <>
    <AppBar position="static">
        <Toolbar>
          
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseAppBar}
              >
                <MenuItem onClick={handleProfile}>View Profile</MenuItem>
                <MenuItem onClick={userLogout}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Card
        sx={{
          // maxWidth: 900,
          alignItems: "center",
          justify: "center",
          margin: 15,
        }}
        variant="outlined"
      >
        <Button
          variant="contained"
          color="success"
          margin-left={20}
          onClick={() => handleAddApplicant()}
        >
          Create an Applicant
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb: 2}}>
              Delete Confirmation
            </Typography>
            <Divider  />
            <Typography id="modal-modal-description" sx={{ mt: 3 ,mb: 4 }}>
              Are you sure you want to delete this applicant ?
            </Typography>
            <Button
                      variant="outlined"
                      color="primary"
                      margin={2}
                      onClick={() => handleClose()}
                    >
                      Cancel
                    </Button>
            <Button
                      variant="contained"
                      color="error"
                      margin={2}
                      onClick={() => handleDeleteApplicant()}
                    >
                      Delete an applicant
                    </Button>
          </Box>
        </Modal>
        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb: 2, m: 5  }}>
              All Applicants 
            </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 850 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Firstname</TableCell>
                <TableCell align="right">Lastname</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Mobile</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicants.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
                  <TableCell align="right">{row.firstname}</TableCell>
                  <TableCell align="right">{row.lastname}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>

                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{row.mobile}</TableCell>
                  <TableCell align="right">
                    <Chip
                      label={row.status}
                      color={
                        row.status === "PASSED"
                          ? "success"
                          : row.status === "IN PROGRESS"
                          ? "primary"
                          : "error"
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    <Button
                      variant="contained"
                      color="primary"
                      margin={2}
                      onClick={() => handleEditApplicant(row._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      margin={2}
                      onClick={() => handleOpen(row._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
