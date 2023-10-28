import React, { useEffect, useState } from "react";
import { getAllApplicant, deleteApplicant } from "../../helper/helper";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from '../../components/confirmation_alert/DeleteConfirmation';
import toast from "react-hot-toast";

import {
    Badge, Button, Table, 
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

export default function BasicTable() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

    const [applicants, setApplicants] = useState([]);
    const [employeeId, setEmployeeId] = useState('');
   
    const closeDeleteConfirmation = () => {
        setDeleteConfirmationOpen(false);
      };

    const handleDeleteConfirmation = (id) => {
        console.log("asdjflajdf :", id);
        setDeleteConfirmationOpen(true);
        setEmployeeId(id);
    };
  
    const handleEditApplicant = (id) => {
        navigate(`/applicant/${id}`);
    }

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



    return (
        <>
          <DeleteConfirmation isOpen={isDeleteConfirmationOpen} closeDeleteConfirmation={closeDeleteConfirmation} id={employeeId}/>
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
                                        onClick={() => handleDeleteConfirmation(row._id)}
                                    >
                                        Delete
                                    </Button></Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}
