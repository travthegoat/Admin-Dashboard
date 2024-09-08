import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CImg,
  CInput,
  CRow,
  CSelect
} from '@coreui/react'
import { useHistory } from 'react-router'
import Loading from "../../common/Loading";
import SuccessError from "../../common/SuccessError"; 
import { ApiRequest } from "../../common/ApiRequest";
import NPagination from '../../common/pagination/NPagination';
import { checkNullOrBlank } from '../../common/CommonValidation';
import Confirmation from '../../common/Confirmation';

const AdminRegAndListIndex = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [admin,setAdmin]=useState([])
  const [totalRow, setTotalRow] = useState(1); // for user list table rows
  const [currentPage, setCurrentPage] = useState(); // for user list table current page
  const [lastPage, setLastPage] = useState(""); // for user list table last page
  const [updateID, setUpdateID] = useState(localStorage.getItem(`Update`));
  const [loading, setLoading] = useState(false); // For Loading
  const [updateStatus, setUpdateStatus] = useState(false); //for update status
  const [error, setError] = useState([]); // for error message
  const [success, setSuccess] = useState([]); // for success message
  const [total, setTotal] = useState(""); // total rows
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => {
    setShowConfirmation(false);
  }

  const err = [];

  const startIndex = (currentPage - 1) * 10 + 1;


  useEffect(()=> {
    let flag = localStorage.getItem(`LoginProcess`)
    if (flag == "true") {
      console.log("Login process success")
    } else {
      history.push(`/Login`);
    }

    (async () => {
      setLoading(true);
        await search(); 
      setLoading(false);
    })();

  },[])
 

  const search = async (page = 1)=> {
    
    let search = {
      method: "get",
      url: `admin/get?page=${page}`,
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setAdmin([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
          setAdmin(response.data.data.data);
          setCurrentPage(response.data.data.current_page);
          setLastPage(response.data.data.last_page);
          setTotalRow(response.data.data.total);
        
      } else {
        setError([response.data.message]);
        setAdmin([]);
      }
    }

  }

  const tempSearch = async (page)=> {
    let search = {
      method: "get",
      url: `admin/get?page=${page}`,
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setAdmin([]);;
    } else {
      if (response.data.status === "OK") {
          setAdmin(response.data.data.data);
          setCurrentPage(response.data.data.current_page);
          setLastPage(response.data.data.last_page);
          setTotalRow(response.data.data.total);
      } else {
        setAdmin([]);
      }
    }

  }

  const pagination = (i) => {
    setCurrentPage(i);
    tempSearch(i);
  }


  const userNameChange = (e) => {
    setUserName(e.target.value);
  }

  const passwordChange = (e) => {
    setPassword(e.target.value);
  }

  const reset = () => {
    setUserName("");
    setPassword("");
  }

  const validate = () => {
    if (!checkNullOrBlank(userName)) {
        err.push('Please fill username');
    }

    if (!checkNullOrBlank(password)) {
        err.push('Please fill password');
    }
  }

  const saveClick = async() => {
    validate();

    if (err.length > 0) {
        setSuccess([]);
        setError(err);
        setShowConfirmation(false);
    } else {
        setError([]);
        setLoading(true);
        setUpdateStatus(false);
        let saveData = {
        
          method: "post",
          url: `admin/save`,
          params: {
           name : userName,
          password: password,
          },
        };
        let response = await ApiRequest(saveData);
        if (response.flag === false) {
          setError(response.message);
          setSuccess([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
          if (response.data.status == "OK") {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            setSuccess([response.data.message]);
            reset();
            search();
            setError([]);
            setShowConfirmation(false);
          } else {
            setError([response.data.message]);
            setSuccess([]);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }
        }
        setLoading(false);
    }
  }




  const editClick = async(id) => {
    setUpdateStatus(true);
    setUpdateID(id);
    let saveData = {
      method: "get",
      url: `admin/edit/${id}`,
    };
    let response = await ApiRequest(saveData);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setUserName(response.data.data.name);
        setPassword(response.data.data.password);
        setError([]);
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);

  }

  const delClick = async (id) => {
    setLoading(true);
    let obj = {
        method: 'delete',
        url: `admin/delete/${id}`,
    };
    let res = await ApiRequest(obj);
    setLoading(false);
    if (res.flag === false) {
        setSuccess([]);
        setError(res.message);
      } else {
        if (res.data.status === "OK") {
          let page = currentPage;
          setSuccess([res.data.message]);
          if (admin.length - 1 == 0) {
            page = currentPage - 1;
          }
          tempSearch(page);
          setError([]);
        } else {
          setError([res.data.message]);
          setSuccess([]);
        }
      }
  }


  const updateClick = async() => {
    validate();

    if (err.length > 0) {
        setError(err);
        setSuccess([]);
        setShowConfirmation(false);
    } else {
        setLoading(true);
        setUpdateStatus(false);
        let saveData = {
        
          method: "post",
          url: `admin/update/${updateID}`,
          params: {
           name : userName,
          password: password,
          },
        };
        let response = await ApiRequest(saveData);
        if (response.flag === false) {
          setError(response.message);
          setSuccess([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
          if (response.data.status == "OK") {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            setSuccess([response.data.message]);
            reset();
            search();
            setError([]);
            setShowConfirmation(false);
          } else {
            setError([response.data.message]);
            setSuccess([]);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }
        }
        setLoading(false);
    }

  }
  return (
    <>
      <CRow>
        <CCol xs="12">
        <SuccessError success={success} error={error} />
          <CCard>
            <CCardHeader>
              <h4 className='m-0'>Admin Registeration</h4>
            </CCardHeader>
            <CCardBody>
              
              <CRow style={{ marginTop: "10px" }}>
                <CCol lg="6">
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>UserName</p>
                    </CCol>
                    <CCol lg="7">
                      <CInput type="text" value={userName} onChange={userNameChange} />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
               

                </CCol>


                <CCol lg="6">
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className='mt-2'>Password</p>
                    </CCol>
                    <CCol lg="7">
                      <CInput type="password" value={password} onChange={passwordChange} />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow style={{ justifyContent: "center" }} className="mt-4">
              { updateStatus == false && (
    <CButton className="form-btn" onClick={() => setShowConfirmation(true)}>
      Save
    </CButton>
  )}
{
  updateStatus == true && (
    <CButton className="form-btn" onClick={() => setShowConfirmation(true)}>
      Update
    </CButton>
  )}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


      <CRow className="mt-3">
        <CCol xs="12">
          <CCard>
            <CCardHeader>
              <h4 className='m-0'>Admin List</h4>
            </CCardHeader>
            <CCardBody>
            <CRow>
        <CCol>
        {admin.length > 0 && (
          <>
          <p className='mb-0 font-weight-bold' style={{ textAlign: 'end'}}>Total : {totalRow} row(s)</p>
          <div className='overflow'>
            <table className='table table-bordered'>
              <thead className='thead-dark'>
                <tr>
                  <th className="text-center" width={50} >No</th>
                  <th className='text-center' width={250}>UserName</th>
                  <th className='text-center' width={250}>UserCode</th>
                  <th className='text-center' width={250}>Password</th>
                  <th className='text-center' width={80} colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {admin.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td width={50} className="text-center">{startIndex + index}</td>
                      <td className="text-center" width={120}>{data.name}</td>
                      <td className="text-center" width={120}>{data.user_code}</td>
                      <td className="text-center" width={120}> {data.password}</td>
                      {/* <td width={200} className='text-center'>
                        <label onClick={() => editClick(data.id)} className='emp-table-btn btn-edit' style={{ marginRight: '26px', width: '25%' }}>Edit</label>
                        <label onClick={() => delClick(data.id)} className='emp-table-btn btn-del' style={{ width: '25%' }}>Delete</label>
                      </td> */}
                      <td style={{ textAlign:"center"}}>
                              <div className="user-before">
                                <CImg
                                  src="/image/Edit-Component-inactive.svg"
                                  onClick={() => {
                                    editClick(data.id);
                                  }}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    cursor: "pointer",
                                  }}
                                ></CImg>
                                <CImg
                                  className="user-after"
                                  src="/image/Edit-Component-active.svg"
                                  onClick={() => {
                                    editClick(data.id);
                                  }}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    cursor: "pointer",
                                  }}
                                ></CImg>
                              </div>
                            </td>

                            <td style={{ textAlign:"center"}}>
                              <div className="user-before">
                                <CImg
                                  src="/image/Delete-Component-inactive.svg"
                                  onClick={() => {
                                    let res = prompt("Do you want to delete?");
                                    if (res === "yes") {
                                      delClick(data.id);
                                    }
                                  }}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    cursor: "pointer",
                                  }}
                                ></CImg>
                                <CImg
                                  className="user-after"
                                  src="/image/Delete-Component-active.svg"
                                  onClick={() => {
                                    delClick(data.id);
                                  }}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    cursor: "pointer",
                                  }}
                                ></CImg>
                              </div>
                            </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          </>
        )}
        </CCol>
      </CRow>
            </CCardBody>
      {totalRow > 10 &&
        <NPagination
          activePage={currentPage}
          pages={lastPage}
          currentPage={currentPage}
          totalPage={lastPage}
          pagination={pagination}
        />
      }
          </CCard>
        </CCol>
      </CRow>
      {updateStatus ? (
            <Confirmation
              show={showConfirmation}
              type="save"
              content="Are you sure you want to update?"
              okButton="Update"
              cancelButton="Cancel"
              saveOK={updateClick}
              cancel={handleCancel}
            />
      ) : (
        <Confirmation
            show={showConfirmation}
            type="save"
            content="Are you sure you want to save?"
            okButton="Save"
            cancelButton="Cancel"
            saveOK={saveClick}
            cancel={handleCancel}
        />
      )}

    </>
  )
}

export default AdminRegAndListIndex;