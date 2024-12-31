import React, { useState, useEffect } from 'react';
import '../css/Home.css';
import Alert from './Alert';

const RegisterModal = (props) => {
    const [alert, setalert] = useState({ status: false, msg: '', type: '' });
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    function closeModal() {
        props.enableRegisterModal(false);
    }

    function switchtoLogin() {
        props.enableLoginModal(true);
        props.enableRegisterModal(false);
    }

    async function registerUser(event) {
        event.preventDefault();
        try {
            if (password === confirmPassword) {

                const response = await fetch("http://127.0.0.1:5000/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        role,
                        username,
                        email,
                        password
                    })
                })
                const data = await response.json();

                if (!response.ok) {
                    setalert({
                        status: true,
                        type: Object.keys(data)[0],
                        msg: data[Object.keys(data)[0]]
                    })
                    console.log("Some Error Occured");
                }
                else {
                    setalert({
                        status: true,
                        type: Object.keys(data)[0],
                        msg: data[Object.keys(data)[0]]
                    })
                }
            }
            else {
                setalert({
                    status:true,
                    type:"danger",
                    msg:"Password not Matched.Try Again"
                })
            }
        }
        catch (err) {
            console.error(err);
        }

    }

    useEffect(() => {
      if(alert.status){
        const timer = setTimeout(()=> {
            setalert({
                status:false
            })
            if(alert.type === "success"){
                props.enableLoginModal(true);
                props.enableRegisterModal(false);
            }
        },3000)
     
        return () => clearTimeout(timer);
    }
    }, [alert.status]);

    return (
        <div className="modal" id="modal">
            <div className="modal-content" id="modalContent">
                <h1>Register</h1>
                <form onSubmit={registerUser}>
                    <div className="input-box">
                        <label htmlFor="select your role">Select your Role</label>
                        <select id="select your role" name="role" onChange={(e) => { setRole(e.target.value) }} required>
                            <option value="">select your role</option>
                            <option value="inventory manager">Inventory Manager</option>
                            <option value="supplier">Supplier</option>
                            <option value="customer">Customer</option>
                            <option value="courier service">Courier Service</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} required />
                    </div>
                    <div className="input-box">
                        <input type="email" id="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} required />
                    </div>
                    <div className="input-box">
                        <input type="password" id="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} required />
                    </div>
                    <div className="input-box">
                        <input type="password" id="confirmPassword" placeholder="Confirm Password" onChange={(e) => { setConfirmPassword(e.target.value) }} required />
                    </div>
                    <button type="submit" className="manualbtn">Register</button>
                    <div className="register-link">
                        <p>Already have an account? <button onClick={switchtoLogin} id="switchToLogin">Login</button></p>
                    </div>
                </form>
                <span className="close" onClick={closeModal} id="closeModal">&times;</span>
                {alert.status && <Alert type={alert.type} msg={alert.msg} />}
            </div>
        </div>
    );
}

export default RegisterModal;
