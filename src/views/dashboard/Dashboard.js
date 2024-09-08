import React, { lazy, useEffect, useState } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router';
import { ApiRequest } from '../common/ApiRequest';



const Dashboard = () => {

    const history = useHistory();

    const [error, setError] = useState([]);
    const [success, setSuccess] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [totalEmploye, setTotalEmployee] = useState("");
    const [totalAdmin, setTotalAdmin] = useState("");

    const employeeSearch = async (page = 1)=> {
        setError([]);
        let search = {
          method: "get",
          url: `employee/search?page=${page}`,
        };
        let response = await ApiRequest(search);
        if (response.flag === false) {
          setEmployeeList([]);
          setError(response.message);
        } else {
          if (response.data.status === "OK") {
              setEmployeeList(response.data.data.data);
              setTotalEmployee(response.data.data.total);
          } else {
            setError([response.data.message]);
            setEmployeeList([]);
          }
        }
    }

    const adminSearch = async (page = 1)=> {
        setError([]);
        let search = {
          method: "get",
          url: `admin/get?page=${page}`,
        };
        let response = await ApiRequest(search);
        if (response.flag === false) {
          setError(response.message);
        } else {
          if (response.data.status === "OK") {
              setTotalAdmin(response.data.data.total);
          } else {
            setError([response.data.message]);
          }
        }
    }

    useEffect(() => {
        let flag = localStorage.getItem(`LoginProcess`)
        if(flag != "true"){
            history.push(`/Login`);
        }
        
        employeeSearch();
        adminSearch();
    }, []);

    const delCLick =(name,g)=>{
        alert("You Delete " + name + " He is " + g);
    }

  return (
    <>
        <CRow style={{ columnGap: '20px', justifyContent: 'center' }}>
            <CCol lg="6" style={{ background: '#0d6efd', height: '150px', maxWidth: '45%', boxShadow: '5px 5px 15px', alignContent: 'center'}}>

                <h1 style={{ color: 'white', fontFamily: 'sans-serif'}}>Total Employees: {totalEmploye}</h1>

            </CCol>
            
            <CCol lg="6" style={{ background: '#198754', height: '150px', maxWidth: '45%', boxShadow: '5px 5px 15px', alignContent: 'center' }}>

                <h1 style={{ color: 'white', fontFamily: 'sans-serif'}}>Total Admins: {totalAdmin}</h1>

            </CCol>
        </CRow>

        <CRow style={{ padding: '70px 70px' }}>
            {employeeList.length > 0 &&(
                <table className='table table-bordered'>
                    <thead className='table-dark'>
                        <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>English Skill</th>
                        <th>Japanese Skill</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeList.map((mappedData,index)=>{
                            return(
                                <tr>
                                <td>{index+1}</td>
                                <td>{mappedData.name}</td>
                                <td>{mappedData.email}</td>
                                <td>{mappedData.gender}</td>
                                <td>{mappedData.date_of_birth}</td>
                                <td>{mappedData.english_skill}</td>
                                <td>{mappedData.japanese_skill}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </CRow>


    </>
  )
}

export default Dashboard
