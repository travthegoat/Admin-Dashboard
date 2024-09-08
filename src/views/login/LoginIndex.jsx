import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "./LoginForm.jsx";
import { checkNullOrBlank,checkPassword } from "../common/CommonValidation";
import Loading from "../common/Loading";
import {ApiRequest} from "../common/ApiRequest";


const LoginIndex = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false); // For Loading
    const [success, setSuccess] = useState([]); // for success message
    const [error, setError] = useState([]); // for error message
    const [userCode, setUserCode] = useState(""); // for shop code
    const [password, setPassword] = useState(""); // for password

    let err = [];

    const passwordChange = (e) => {
        setSuccess([]);
        setError([]);
        setPassword(e.target.value);
    }

    const userCodeChange = (e) => {
        setSuccess([]);
        setError([]);
        setUserCode(e.target.value);
    }

    const loginClick = async() => {
     
        if(!checkNullOrBlank(password)){
            err.push("Password cannot be empty!");
        }
        if(!checkNullOrBlank(userCode)){
            err.push("Please fill userCode");
        } 

        if(err.length > 0) {
          setSuccess([]);
          setError(err);
        }else{
          setError([]);
          let saveData = {
            method: "get",
            url: `admin/login`,
            params: {
             user_code : userCode,
            password : password
            },
          };
          setLoading(true);
          let response = await ApiRequest(saveData);
          console.log("response",response);
          if (response.flag === false) {
            setError(response.message);
            setSuccess([]);
          } else {
            if (response.data.status == "OK") {
              history.push(`/Dashboard`)
              localStorage.setItem(`LoginProcess`, "true");
              setError([]);
            } else {
              setError([response.data.message]);
              setSuccess([]);
            }
          }
          setLoading(false);
        }
       
    }
    return(
        <>
        <LoginForm
            loginClick={loginClick}
            passwordChange={passwordChange}
            password={password}
            userCodeChange={userCodeChange}
            userCode={userCode}
            success={success}
            error={error}
        />
        <Loading start={loading} />
        </>
    )
}

export default LoginIndex
