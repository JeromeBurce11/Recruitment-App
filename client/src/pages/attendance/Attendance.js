import React from "react";
import {
    Tabs, TabList, TabPanels, Tab, TabPanel, Card, CardBody,Text,Heading
} from '@chakra-ui/react';
import AttendanceList from './AttendanceList';
export default function BasicTable() {
    return (
        <>
            <Tabs orientation="vertical" size='md' height='100%'>
                <TabList width={250} bg='papayawhip'>
                    <Tab >Attendance List</Tab>
                    <Tab>Attendance Correction Request</Tab>
                    <Tab>Shift Schedule</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Card>
                            <CardBody>
                                <Heading size='md' textTransform='uppercase'>
                                    Attendance List
                                </Heading>
                                <Text>Here is your basic information details</Text>
                            </CardBody>
                        </Card>
                        <Card mt={5}>
                            <CardBody>
                                <AttendanceList/>
                            </CardBody>
                        </Card>
                    </TabPanel>
                    <TabPanel>
                    </TabPanel>
                    <TabPanel>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}
