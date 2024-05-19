import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../../assets/theme.css'
import './login.css'
import config from '../../../config';
import axios from 'axios';

function LoginSignUp({ background = true }) {
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className='login'>
        {
          login ? <Login setLogin={setLogin} /> : <SignUp setLogin={setLogin} />
        }
      </div>
      {
        background && <div className='login-background'></div>
      }
    </>
  )
}

function Login({ setLogin }) {
  const [error, setError] = useState({ userName: false, password: false });
  const [loggedIn, setLoggedin] = useState(false);
  const [info, setInfo] = useState({ userName: '', password: '' })

  const onLogin = async () => {
    

    const currentError = await axios.post(`${config.backend}/user/authenticate`, { info });
    console.log(currentError); 
    if (!currentError.data.userName && !currentError.data.password) {
      setLoggedin(true);
      return;
    }
    setError(currentError.data);
  }


  if (loggedIn)
    return (<Navigate to='/home' />)
  return (
    <>
      <p className='m-primary login-label d-flex align-items-center'>Login</p>
      <input className={`m-primary ${error.userName && 'login-error'} login-input`} placeholder='Username'
        value={info.userName} onChange={(e) => setInfo({ ...info, userName: e.target.value.trim() })}></input>
      {
        error.userName && <div className='login-error-message'>username does not exists</div>
      }
      <input className={`m-primary ${error.password && 'login-error'} login-input`} style={error.userName ? { marginTop: '0.75rem' } : {}} placeholder='Password'
        value={info.password} onChange={(e) => setInfo({ ...info, password: e.target.value.trim() })}></input>

      {
        error.password && <div className='login-error-message'>password does not exists</div>
      }

      < div className='container-fluid row p-0 m-0 mt-4' autoSelect='off'>
        <div className='col login-secondary-button ' onClick={() => setLogin(false)}>Sign   Up</div>
        <div className='col m-button login-primary-button' onClick={() => onLogin()}>Login</div>


      </div >

    </>
  )
}

function SignUp({ setLogin }) {
  const [error, setError] = useState({userName: false, password: false}); 
  const [info, setInfo] = useState({userName: '', password: '', confirmPassword: ''}); 
  const [signUp, setSignUp] = useState(false); 


  const onSignUp = async () => {
    
    const currentError = await axios.post(`${config.backend}/user/register`, { info });
    console.log(currentError); 
    if (!currentError.data.userName && !currentError.data.password) {
      setSignUp(true);
      return;
    }
    setError(currentError.data);
  }

  if(signUp)
    return <Navigate to={`/home?userName=${info.userName}`}/>
  return (
    <>
      <p className='m-primary login-label d-flex align-items-center mb-4'>Sign Up</p>
      <input className={`m-primary ${error.userName && 'login-error'} login-input`} placeholder='Username'
        onBlur={(e) => setInfo({...info, userName: e.target.value.trim()})}></input>
      {
        error.userName && <div className='login-error-message mt-1'>username isen't available</div>
      }
      <input className={`m-primary login-input ${error.password && 'login-error'}`} style={error.userName ? { marginTop: '0.75rem' } : {}}
        placeholder='Password' onChange={(e) => setInfo({...info, password: e.target.value.trim()})}></input>

      <input className={`m-primary login-input ${error.password ? 'login-error' : 'mb-4'}`}
        placeholder='Confirm Password' onChange={(e) => setInfo({...info, confirmPassword: e.target.value.trim()})}></input>
      {
        error.password && <div className='login-error-message mt-1 mb-3'>password do not match</div>
      }

      <div className='container-fluid row p-0 m-0'>
        <div className='col login-secondary-button ' onClick={() => setLogin(true)}>Login</div>
        <div className='col m-button login-primary-button' onClick={() => onSignUp()}>Sign Up</div>
      </div>

    </>
  )
}
export default LoginSignUp; 