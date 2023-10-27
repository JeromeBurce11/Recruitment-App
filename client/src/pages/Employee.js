import React, { useEffect, useState } from "react";
import { getAllApplicant, deleteApplicant } from "../helper/helper";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import toast from "react-hot-toast";
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CameraCapture from "../components/camera_capture/camera";
import {
  Tabs, TabList, TabPanels, Tab, TabPanel, Badge, Button, Table, Image,
  Card, CardHeader, CardBody, CardFooter, Stack, StackDivider, Text, Box, Heading, Grid, GridItem,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { grey } from "@mui/material/colors";


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
  const [isCameraOpen, setCameraOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [applicantId, setApplicantId] = useState('');
  const openCamera = () => {
    setCameraOpen(true);
  };

  const closeCamera = () => {
    setCameraOpen(false);
  };
  const handleOpen = (id) => {
    console.log("asdjflajdf :", id);
    setOpen(true);
    setApplicantId(id);
  };
  const handleClose = () => setOpen(false);

  const handleDeleteApplicant = () => {
    let deleteApplicantPromise = deleteApplicant({ id: applicantId });

    toast.promise(deleteApplicantPromise, {
      loading: 'Checking...',
      success: <b>Deleted Successfully...!</b>,
      error: () => <b>Error in deletion</b>
    });
    setOpen(false);
  };

  const handleEditApplicant = (id) => {
    navigate(`/applicant/${id}`);
  }

  const handleAddApplicant = () => {
    navigate("/add-applicant");
  };
  useEffect(() => {
    if (!open) {
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

  function userLogout() {
    localStorage.removeItem('token');
    navigate('/')
  }
  function handleProfile() {
    navigate('/profile')
  }
  

  const handleCloseAppBar = () => {
    setAnchorEl(null);
  };
  
  return (
    <>
      <Tabs>
        <TabList>
          <Tab><IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          </Tab>
          <Tab >
            <Menu>
              <MenuButton >
                Core
              </MenuButton>
              <MenuList>
                <MenuItem>Company Profile</MenuItem>
                <MenuItem>Employee Profile</MenuItem>
              </MenuList>
            </Menu>
          </Tab>
          <Tab onClick={handleProfile}>Time Attendance</Tab>
          <Tab onClick={handleProfile}>Activity</Tab>
          <Tab onClick={handleProfile}>Finance</Tab>
          <Tab onClick={handleProfile}>View Profile</Tab>
          <Tab onClick={userLogout}>Logout</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>


            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb: 2 }}>
                  Delete Confirmation
                </Typography>
                <Divider />
                <Typography id="modal-modal-description" sx={{ mt: 3, mb: 4 }}>
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

            <Card
              sx={{
                alignItems: "center",
                justify: "center",
                margin: 15,
                marginTop: 10
              }}
              variant="outlined"
            >
              <TableContainer>
                <Table variant='simple'>
                  <TableCaption>User Details</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Lastname</Th>
                      <Th>Email</Th>
                      <Th >Address</Th>
                      <Th >Mobile</Th>
                      <Th >Status</Th>
                      <Th >Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {applicants.map((row) => (
                      <Tr>
                        <Td>{row.firstname}</Td>
                        <Td>{row.lastname}</Td>
                        <Td>{row.email}</Td>
                        <Td>{row.address}</Td>
                        <Td>{row.mobile}</Td>
                        <Td> <Badge
                          colorScheme={
                            row.status === "PASSED"
                              ? "green"
                              : row.status === "IN PROGRESS"
                                ? "purple"
                                : "red"
                          }
                        > {row.status} </Badge></Td>
                        <Td>{" "}
                          <Button

                            colorScheme='green'
                            marginRight={2}
                            onClick={() => handleEditApplicant(row._id)}
                          >
                            Edit
                          </Button>
                          <Button
                            colorScheme='red'
                            onClick={() => handleOpen(row._id)}
                          >
                            Delete
                          </Button></Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Card>
          </TabPanel>
          <TabPanel>
            <Grid
              h='200px'
              templateRows='repeat(2, 1fr)'
              templateColumns='repeat(5, 1fr)'
              gap={4}
            >
              <GridItem rowSpan={2} colSpan={1}>
                <Card >
                  <CardHeader>
                    <Image
                      borderRadius='full'
                      boxSize='100px'
                      src='https://bit.ly/dan-abramov'
                      alt='Dan Abramov'
                    />
                  </CardHeader>

                  <CardBody marginBottom={400}>
                    <Stack divider={<StackDivider />} spacing='4'>
                      <Box>

                        <Heading size='sm' textTransform='uppercase'>
                          Jerome Burce
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                          Software Developer
                        </Text>
                        <Text pt='2' fontSize='sm'>
                          23-0622
                        </Text>
                        <CameraCapture isOpen={isCameraOpen} closeCamera={closeCamera}/>
                        <Button
                          colorScheme='orange'
                          onClick={()=>openCamera()}
                        >
                          Scan QR Code
                        </Button>
                        <Heading size='sm' pt='2' textTransform='uppercase'>
                          Employment Info
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                          Talleco
                        </Text>
                        Social Media Accounts:
                      </Box>


                    </Stack>
                  </CardBody>
                </Card></GridItem>
              {/* <GridItem colSpan={2} bg='papayawhip' />
              <GridItem colSpan={2} bg='papayawhip' /> */}
              <GridItem colSpan={4} >
                <Tabs>
                  <TabList >
                    <Tab >Personal</Tab>
                    <Tab>Employment Data</Tab>
                    <Tab>Attendance List</Tab>
                    <Tab>Employee Request</Tab>
                    <Tab>Feeds</Tab>
                    <Tab>Leave Balance</Tab>

                  </TabList>

                  <TabPanels>
                    <TabPanel>

                      <Tabs orientation="vertical" size='md'>
                        <TabList width={250} bg='papayawhip'>
                          <Tab >Basic Information</Tab>
                          <Tab>Address</Tab>
                          <Tab>Contact</Tab>
                          <Tab>Family & Dependant</Tab>
                          <Tab>Education</Tab>
                          <Tab>Bank List</Tab>
                          <Tab>Skill</Tab>
                        </TabList>

                        <TabPanels>
                          <TabPanel>
                            <Card>

                              <CardBody>
                                <Heading size='sm' textTransform='uppercase'>
                                  Basic information
                                </Heading>
                                <Text>Here is your basic information details</Text>
                              </CardBody>
                            </Card>
                            <Card mt={5}>

                              <CardBody>
                                <Heading size='sm' textTransform='uppercase'>
                                  Employment Data
                                </Heading>
                                <Text>Your data related to company</Text>
                                <Text>Username</Text>
                                <Text>22-0690</Text>
                                <Text>Username will be used for login</Text>

                              </CardBody>
                            </Card>
                            <Card mt={5}>

                              <CardBody>
                                <Heading size='sm' textTransform='uppercase'>
                                  Personal Data
                                </Heading>
                                <Text>Your Personal data details</Text>

                                <Text color={grey[500]} as='b'>Fullname</Text>
                                <Text>Jerome Burce</Text>
                                <Text color={grey[500]} as='b'>Nickname</Text>
                                <Text>Jerome Burce</Text>
                                <Box padding='5'>
                                  <Divider />
                                </Box>
                                <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                                  <GridItem w='100%' h='10' >
                                    <Text color={grey[500]} as='b'>Birth Place</Text>
                                    <Text>Palo, Leyte</Text>
                                  </GridItem>
                                  <GridItem w='100%' h='10'  >
                                    <Text color={grey[500]} as='b'>Birth Date</Text>
                                    <Text>11 May 2001</Text>
                                  </GridItem>
                                  <GridItem w='100%' h='10'  >
                                    <Text color={grey[500]} as='b'>Gender</Text>
                                    <Text>Male</Text>
                                  </GridItem>
                                </Grid>
                                <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                                  <GridItem w='100%' h='10' >
                                    <Text color={grey[500]} as='b'>Religion</Text>
                                    <Text>Roman Catholic</Text>
                                  </GridItem>
                                  <GridItem w='100%' h='10'  >
                                    <Text color={grey[500]} as='b'>Marital Status</Text>
                                    <Text>Single</Text>
                                  </GridItem>
                                  <GridItem w='100%' h='10'  ></GridItem>
                                </Grid>
                                <Box padding='5'>
                                  <Divider />
                                </Box>

                              </CardBody>
                            </Card>
                          </TabPanel>
                          <TabPanel>
                            <Card>

                              <CardBody>
                                <Heading size='sm' textTransform='uppercase'>
                                  Address
                                </Heading>
                                <Text>Here is your address detail</Text>
                              </CardBody>
                            </Card>
                            <Card mt={5}>

                              <CardBody>
                                <Heading size='sm' textTransform='uppercase'>
                                  Current Address
                                </Heading>
                                <Text>U. Aviola Street Carreta Cebu City Cebu Philippines 6000</Text>
                              </CardBody>
                            </Card>
                          </TabPanel>
                          <TabPanel>
                            <Card>

                              <CardBody>
                                <Heading size='sm' textTransform='uppercase'>
                                  Contact
                                </Heading>
                              </CardBody>
                            </Card>
                            <Card mt={5}>

                              <CardBody>
                                <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                                  <GridItem w='100%' h='10' >
                                    <Text color={grey[500]} as='b'>Phone / Mobile Phone</Text>
                                    <Text>+63929171694</Text>
                                  </GridItem>
                                  <GridItem w='100%' h='10'  >
                                    <Text color={grey[500]} as='b'>Ext</Text>
                                    <Text>11 May 2001</Text>
                                  </GridItem>
                                  <GridItem w='100%' h='10'  >
                                    <Text color={grey[500]} as='b'>
                                      Email *
                                    </Text>
                                    <Text>j.burce@jobtarget.com</Text>
                                  </GridItem>
                                </Grid>
                              </CardBody>
                            </Card>
                          </TabPanel>
                        </TabPanels>
                      </Tabs>

                    </TabPanel>
                    <TabPanel>
                      <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                      <TableContainer>
                        <Table variant='simple'>
                          <TableCaption>User Details</TableCaption>
                          <Thead>
                            <Tr>
                              <Th>Lastname</Th>
                              <Th>Email</Th>
                              <Th >Address</Th>
                              <Th >Mobile</Th>
                              <Th >Status</Th>
                              <Th >Action</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {applicants.map((row) => (
                              <Tr>
                                <Td>{row.firstname}</Td>
                                <Td>{row.lastname}</Td>
                                <Td>{row.email}</Td>
                                <Td>{row.address}</Td>
                                <Td>{row.mobile}</Td>
                                <Td> <Badge
                                  colorScheme={
                                    row.status === "PASSED"
                                      ? "green"
                                      : row.status === "IN PROGRESS"
                                        ? "purple"
                                        : "red"
                                  }
                                > {row.status} </Badge></Td>
                                <Td>{" "}
                                  <Button

                                    colorScheme='green'
                                    marginRight={2}
                                    onClick={() => handleEditApplicant(row._id)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    colorScheme='red'
                                    onClick={() => handleOpen(row._id)}
                                  >
                                    Delete
                                  </Button></Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                        </TableContainer>
                    </TabPanel>
                  </TabPanels>
                </Tabs></GridItem>
            </Grid>

          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>


    </>
  );
}
