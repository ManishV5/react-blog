import React, { useEffect } from "react";
import {auth, provider} from '../firebase-config'
import {signInWithPopup, signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from "react-router-dom"

function Login({setIsAuth, setUsername, setLoginToggleButtonOff, setSignupButtonToggleOff}){
    useEffect(() => {
        setLoginToggleButtonOff(true)
        setSignupButtonToggleOff(false)
    }, [])

    let emailRef = React.createRef();
    let passRef = React.createRef();
    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true)
            localStorage.setItem('username', auth.currentUser.displayName)
            setIsAuth(true)
            setUsername(auth.currentUser.displayName)
            navigate("/")
        })
    }
    
    const loginWIthEmailPass = () => {
        const email = emailRef.current.value;
        const password = passRef.current.value;
        signInWithEmailAndPassword(auth, email, password).then((result) => {
            localStorage.setItem("isAuth", true)
            localStorage.setItem('username', auth.currentUser.displayName)
            setUsername(auth.currentUser.displayName)
            setIsAuth(true)
            navigate("/")
        }).catch((e) => {
            console.log(e)
        })
    }

    return(
        <div class="container d-flex justify-content-center col-8 mt-5">
            <div className="loginWithPass">
                <div class="input-group mb-3">
                    <input type="text" ref={emailRef} class="form-control" placeholder="Email" id="email"></input>
                </div>
                <div class="input-group mb-3">
                    <input type="password" ref={passRef} class="form-control" placeholder="Password" id="pass"></input>
                </div>
                <div class="mt-3 text-center">
                    <button  class="btn btn-outline-success me-3" onClick={loginWIthEmailPass}>Login</button>
                </div>
                <div class="mt-3 text-center">
                    <button class="btn btn-outline-success me-3" onClick={signInWithGoogle}>Sign in with Google</button>
                </div>
            </div>
        </div>
    )
}

export default Login