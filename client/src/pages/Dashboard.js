import React from "react";
import { useNavigate } from "react-router-dom";
import Attendance from './attendance/Attendance';
import Employee from '../pages/Employee';
import {Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'

export default function BasicTable() {
  const navigate = useNavigate();
 
  function userLogout() {
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <>
      <Tabs>
        <TabList>
          <Tab> Dasboard Posting
          </Tab>
          <Tab > Employee
          </Tab>
          <Tab >Time Attendance (DTR)</Tab>
          <Tab>Leaves</Tab>
          <Tab >Finance</Tab>
          <Tab >View Profile</Tab>
          <Tab onClick={userLogout}>Logout</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
          </TabPanel>
          <TabPanel>
           <Employee/>
          </TabPanel>
          <TabPanel>
            <Attendance/>
          </TabPanel>
        </TabPanels>
      </Tabs>


    </>
  );
}
