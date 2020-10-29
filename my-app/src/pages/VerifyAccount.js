import React, { useEffect } from 'react';
import { setSession } from "../scripts/utils/session";
import { verifyAccount } from "../scripts/services/user";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading.js";

const VerifyAccForm = () => {
    let history = useHistory();
    const userId = window.location.href.slice(window.location.href.length - 24);
    useEffect(() => {
        verifyAccount(userId)
            .then(res => {
                console.log(res);
                // if (res.)
                setSession(res.token);
                history.push('/')
                alert('Successfully validated');
                window.location.reload();
            })
            .catch(err => alert('An error occured. Please try again'));
    }, [userId]);

    return (
        <div>
            <Loading />
        </div>
    )
}

export default VerifyAccForm;