import React,{ useEffect, useState } from 'react';
import '../css/Home.css';
import '../js/Home.js';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal.js';

const Home = (props) => {
    const [registerModal, setRegisterModal] = useState(false);
    const [loginModal, setLoginModal] = useState(false);

  return (
    <div>
      <div className="container">
        <div className="title-container">
            <div className="logo">
                <img src="https://images.vexels.com/media/users/3/137615/isolated/svg/5af2a9cbd8cd93aa90889fbc05656cb5.svg" alt="logo" />
            </div>
            <div>
                <div className="brand-title">RapidXcel Logistics</div>
                
                <div className="tagline"></div>
            </div>
        </div>
        <div className="buttons">
            <button className="button" onClick={() => { setRegisterModal(true) }} id="registerBtn">Sign In/Register</button>
            <button className="button" onClick={() => { setLoginModal(true) }} id="loginBtn">Login</button>
        </div>
    </div>

    { registerModal && <RegisterModal enableRegisterModal={setRegisterModal} enableLoginModal={setLoginModal}/>}
    { loginModal && <LoginModal enableLoginModal={setLoginModal} enableRegisterModal={setRegisterModal}  setLogin={props.setLogin} /> }
    </div>
  );
}

export default Home;
