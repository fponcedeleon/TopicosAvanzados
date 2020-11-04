/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { setSession } from "../scripts/utils/session";
import { verifyAccount } from "../scripts/services/user";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading.js";

const VerifyAccForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();
  const userId = window.location.href.slice(window.location.href.length - 24);
  useEffect(() => {
    verifyAccount(userId)
      .then(res => {
        setSession(res.token);
        history.push('/')
        setIsLoading(false);
        alert('Successfully validated');
        window.location.reload();
      })
      .catch(() => {
        setIsLoading(false);
        alert('An error occured. Please try again')
      });
  }, [userId, history, isLoading]);

  return (
    <>
      <div>
        {isLoading && <Loading />}
      </div>
    </>
  )
}

export default VerifyAccForm;