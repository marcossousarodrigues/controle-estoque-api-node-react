import React, { useState, useContext, useEffect } from 'react'
import styles from './User.module.css'
import logo from '../images/cart.svg'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/UserContext'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();

  const navigate = useNavigate();
  const {authenticated, responseText} = useContext(Context)


  useEffect(()=>{  
    
    if(authenticated)
    {
      navigate('/product/create')
    }
  }, [authenticated])
   

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    const message = document.querySelector('#message')
    if(!email)
    {
      message.innerHTML = 'Campo e-mail é obrigatorio, por favor preencher!'
      return;
    }

    if(!password)
    {
      message.innerHTML = 'Campo senha é obrigatorio, por favor preencher!'
      return;
    }

    const user = {
      email, password
    }
  
    const authUserValid = await login(user);
    
    if(authUserValid.valid)
    {
      window.location.reload()
      navigate('product/create')
    }
    else
    {
      message.innerHTML = authUserValid.message;
    }


  }


  return (
    <>
    <div className={`d-flex align-items-center ${styles.logo}`}>
        <div className={styles.logo}>
            <img src={logo} width={60} className="me-3" />
            <h3 className="mb-0"><u style={{ textDecorationColor: '#808080', textDecorationThickness: '2.5px', textUnderlineOffset: '10px' }}>Sistema mercearia</u></h3>
        </div> 
      </div>
    <div className={styles.container}>
          <form className={`${styles.form} ${styles.form_login}`} onSubmit={handleSubmit}>
          <p id='message'></p>
            <h2>Login</h2>
            <div className={styles.container_group_items_form}>
          
            <label htmlFor="email">Email</label>
            <input type="email"
            placeholder='Digite seu nome' 
            onChange={(e)=>{setEmail(e.target.value)}}
            />
           
            <label htmlFor="password">Senha</label>
            <input type="password" placeholder='Digite seu nome'
            onChange={(e)=>{setPassword(e.target.value)}}
            />

            </div>
            <input type="submit" value="Entra" />
          </form>
    </div>
    
    </>
  )
}

export default Login