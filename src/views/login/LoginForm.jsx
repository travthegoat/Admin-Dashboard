import { CButton, CCard, CCardBody, CCol, CImg, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CLabel, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import SuccessError from '../common/SuccessError';
import $ from 'jquery';

const LoginForm = (props) => {
    let { loginClick,passwordChange,password,userCodeChange,userCode,success,error } = props;

    const [screenSize, setScreenSize] = useState(Math.round(window.devicePixelRatio * 100));

    useEffect(() => {

        $(window).resize(() => {
            setScreenSize(Math.round(window.devicePixelRatio * 100));
        })
        console.log(screenSize);

    }, []);

    const enterHandle = (e) => {
        if (e.keyCode === 13) {
            const currentInput = document.activeElement;
            if (currentInput.type === 'text') {
                const passwordInput = document.querySelector('input[type="password"]');
                passwordInput.focus();
            } else {
                loginClick();
                localStorage.setItem(`LoginProcess`, "true");
                e.preventDefault();
            }
        } 
    }

    return (
        <>

            {screenSize <= 150 && (
                <div className='login-container min-vh-100'>
                    <CRow>
                        <CCol lg='6' className='login-bg' style={{paddingTop: 20, paddingLeft: 25}}>
                            <SuccessError success={success} error={error}/>
                        </CCol>

                        <CCol lg='6' className='login-wraper'>
                            <CImg src={"/image/main-logo.png"} className='login-logo' />

                            <CRow className='login-input-container'>
                                <CInput type='text' placeholder='Enter Your User Code' className='login-input' value={userCode} onChange={userCodeChange} onKeyDown={enterHandle} />
                                <CInput type='password' placeholder='Enter Your Password' className='login-input' value={password} onChange={passwordChange} onKeyDown={enterHandle} />
                            </CRow>

                            <CRow className='justify-content-center' style={{ marginTop: '40px'}}>
                                <CButton className='login-btn btn btn-danger' onClick={loginClick}>Login</CButton>
                            </CRow>
                        </CCol>
                    </CRow>
                </div>
            )}

            {screenSize > 150 && (
                <div className='login-container' style={{ maxWidth: '100%' }}>
                    <CRow>
                        <CCol className='login-wraper'>
                            <CImg src={"/image/main-logo.png"} className='login-logo' />
                            <SuccessError success={success} error={error}/>


                            <CRow className='login-input-container'>
                                <CInput type='text' placeholder='Enter Your User Code' className='login-input' value={userCode} onChange={userCodeChange} onKeyDown={enterHandle} />
                                <CInput type='password' placeholder='Enter Your Password' className='login-input' value={password} onChange={passwordChange} onKeyDown={enterHandle} />
                            </CRow>

                            <CRow className='justify-content-center' style={{ marginTop: '40px'}}>
                                <CButton className='login-btn btn btn-danger' onClick={loginClick}>Login</CButton>
                            </CRow>
                        </CCol>
                    </CRow>
                </div>
            )}

        </>
    )
}

export default LoginForm
