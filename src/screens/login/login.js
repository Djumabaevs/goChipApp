import React from 'react';
import LoginWithFingerprint from './components/loginFingerprint';
import LoginWithOTP from './components/loginOTP';

const Login = (props) => {
        const [authType, setAuth]  = React.useState("Fingerprint");
        if(authType === "Fingerprint"){
            return <LoginWithFingerprint  setAuth={setAuth} onLogin={props.onLogin}/>
        }if(authType === "OTP"){
            return <LoginWithOTP  setAuth={setAuth} onLogin={props.onLogin} phone={props.phone} env={props.env}/>
        }
        return null;
}

export default Login;
