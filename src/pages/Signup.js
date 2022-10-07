import React, {useEffect} from "react";
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {useNavigate} from "react-router-dom"
import {auth} from '../firebase-config'

function Signup (props){
    useEffect(() => {
        props.setLoginToggleButtonOff(false)
        props.setSignupButtonToggleOff(true)
    }, [])

    let emailRef = React.createRef();
    let passRef = React.createRef();
    let usernameRef = React.createRef();
    let navigate = useNavigate();

    const handleSignup = () => {
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const pass = passRef.current.value;
        createUserWithEmailAndPassword(auth, email, pass)
        .then((userCred) => {
            updateProfile(userCred.user, {
                displayName: username
            }).then(() => navigate('/login'))
        }).catch(err => console.log(err))
    }

    return (
        // <div class="container">
            <div className="register" class="container col-8">
                <div class="input-group mb-3">
                    <input type="text" ref={usernameRef} class="form-control" placeholder="Username" id="username"></input>
                </div>
                <div class="input-group mb-3">
                    <input type="text" ref={emailRef} class="form-control" placeholder="Email" id="email"></input>
                </div>
                <div class="input-group mb-3">
                    <input type="password" ref={passRef} class="form-control" placeholder="Password"></input>
                </div>
                <div class="mt-3 text-center">
                    <button  class="btn btn-outline-success me-3" onClick={handleSignup}>Sign Up</button>
                </div>
            </div>
        // </div>
    )
}

export default Signup