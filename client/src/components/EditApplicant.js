import React, { useState,useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getApplicantDetailsById, updateApplicant } from "../helper/helper";
import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";



export default function Profile() {
  const id = useParams();
  const navigate = useNavigate();
  const [applicantData, setApplicantData] = useState()
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
  useEffect(() => {
    console.log("APPLICANT ID :  ", id);
    getApplicantDetailsById(id).then(({ data }) => {
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setEmail(data.email);
        setMobile(data.mobile);
        setAddress(data.address);
        setStatus(data.status);
        setApplicantData(data);
    });
  }, []);

  const onEditApplicant = () =>{
    const applicantData ={id,firstname, lastname,email,address,mobile,status };
    console.log("burce:  ", applicantData);
    let updateApplicantPromise = updateApplicant(applicantData);
    console.log("burce1:  ", updateApplicantPromise);

    toast.promise(updateApplicantPromise, {
        loading: 'Checking...',
        success : <b> Update Successfully...!</b>,
        error :() => <b>Applicant not updated</b>
      });
    navigate('/applicant');
 
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
              Edit an Applicant.
            </span>
          </div>

          <form className="py-1">
            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="FirstName"
                  value={firstname}
                  required
                  onChange={handleChangeFirstname}
                />
                <input
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="LastName"
                  value={lastname}
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
                  value={mobile}
                  onChange={handleChangeMobile}

                />
                <input
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Email*"
                  value={email}
                  required
                  onChange={handleChangeEmail}

                />
              </div>

              <input
                className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="Address"
                value={address}
                required
                onChange={handleChangeAddress}

              />             
               <input
              className={`${styles.textbox} ${extend.textbox}`}
              type="text"
              value={status}
              placeholder="Status : PASSED / IN PROGRESS / FAIL "
              onChange={handleChangeStatus}

            />
             
              <button className={styles.btn} type="submit" onClick={onEditApplicant}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
