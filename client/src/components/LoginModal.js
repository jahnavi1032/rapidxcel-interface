import React,{ useState,useEffect } from 'react';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

const LoginModal = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({status:false,msg:'',type:''});
    

    function closeModal(){
        props.enableLoginModal(false);
    }
    
    function switchtoRegister(){
        props.enableLoginModal(false);
        props.enableRegisterModal(true);

    }

    async function loginUser(event){
        event.preventDefault();
        try{

            const response = await fetch("http://127.0.0.1:5000/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
            body:JSON.stringify({
                username,
                password
            })
        })
        
        if(!response.ok){
            console.log("Some Error Occured");
        }
        
        const token = await response.json();
        if(token["access_token"]){
            localStorage.setItem("uid",token["access_token"])
            setAlert({
                status:true,
                type:"success",
                msg:"Logged in Successfully"
            })
            props.setLogin(false)
            navigate('/dashboard');
        }
        else{
            setAlert({
                status:true,
                type:Object.keys(token)[0],
                msg:token[Object.keys(token)[0]]
            })
        }
            
    }   
        catch(err){
            console.error(err);
        }
    }   
    
    useEffect(() => {
        if (alert.status) {
          const timer = setTimeout(() => {
            setAlert({ status: false, msg: "" });
          }, 3000);
    
          return () => clearTimeout(timer);
        }
      }, [alert.status])


    return (
        <div>
            <div className="modal" id="modal">
                <div className="modal-content" id="modalContent">
                    <h1>Login</h1>
                    <form onSubmit={loginUser}>
                    <div className="input-box">
                        <input type="text" placeholder="Username" name='username' onChange={(event) => { setUsername(event.target.value) }} required />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} required />
                    </div>
                    <button type="submit" className="manualbtn">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <button onClick={switchtoRegister} id="switchToRegister">Register</button></p>
                    { alert.status && <Alert type={alert.type} msg={alert.msg}/>}
                    </div>
                </form>
                </div>
                <span className="close" onClick={closeModal} id="closeModal">&times;</span>
            </div>
        </div>
    );
}

export default LoginModal;
