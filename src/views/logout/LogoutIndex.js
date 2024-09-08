import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Confirmation from "../common/Confirmation";
const LogoutIndex = () => {
  let history = useHistory();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => {
    setShowConfirmation(false);
    history.goBack();
  }

  const logoutClick = () => {
    localStorage.clear();
    history.push('/login')
  }

  useEffect(() => {
    setShowConfirmation(true);
  }, []);

  return <>
        <Confirmation
            show={showConfirmation}
            type="save"
            content="Are you sure you want to log out?"
            okButton="Log out"
            cancelButton="Cancel"
            saveOK={logoutClick}
            cancel={handleCancel}
        />
  </>;
};

export default LogoutIndex;
