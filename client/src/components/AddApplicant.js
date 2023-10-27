import React, { useState } from "react";
import avatar from "../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import useFetch from "../hooks/fetch.hook";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { addApplicant } from "../helper/helper";

import Select from "@mui/material/Select";
import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";


const options = [
  { value: "Inprogress", label: "In Progress" },
  { value: "Passed", label: "Passed" },
  { value: "Failed", label: "Failed" },
];

export default function Profile() {
  const navigate = useNavigate();

  const [status, setStatus] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState(''); 


  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeFirstname = (event) =>{
    setFirstname(event.target.value);
    console.log("burce: ", firstname);
  }
  const handleChangeLastname = (event) =>{
    setLastname(event.target.value);
  }
  const handleChangeEmail = (event) =>{
    setEmail(event.target.value);
  }
  const handleChangeMobile = (event) =>{
    setMobile(event.target.value);
  }
  const handleChangeAddress = (event) =>{
    setAddress(event.target.value);
  }
  
  const onAddApplicant = () =>{
    const applicantData ={firstname, lastname,email,address,mobile,status };
    console.log("burce:  ", applicantData);
    let addApplicantPromise =  addApplicant(applicantData);
    toast.promise(addApplicantPromise, {
        loading: 'Checking...',
        success : <b>Add Successfully...!</b>,
        error :() => <b>Applicant not add</b>
      });
    navigate('/employee');
 
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "45%", paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Applicant</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Add new Applicant.
            </span>
          </div>

          <form className="py-1">
            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="FirstName"
                  required
                  onChange={handleChangeFirstname}
                />
                <input
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="LastName"
                  required
                  onChange={handleChangeLastname}
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Mobile No."
                  required
                  onChange={handleChangeMobile}

                />
                <input
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Email*"
                  required
                  onChange={handleChangeEmail}

                />
              </div>

              <input
                className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="Address"
                required
                onChange={handleChangeAddress}

              />              <input
              className={`${styles.textbox} ${extend.textbox}`}
              type="text"
              placeholder="Status : PASSED / IN PROGRESS / FAIL "
              onChange={handleChangeStatus}

            />
             
              <button className={styles.btn} type="submit" onClick={onAddApplicant}>
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
