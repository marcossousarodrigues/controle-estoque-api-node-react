import React, { useContext, useEffect, useState } from 'react'
import styles from './User.module.css'
import logo from '../images/cart.svg'
import NavBar from '../../components/NavBar'
import { useProduct } from '../../hooks/useProduct'
import { Context } from '../../context/UserContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../../utils/api'

const EditUser = () => {
  const {httpRequest} = useProduct();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [permission, setPermission] = useState('');
  const [blocked, setBlocked] = useState('');
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const [image, setImage] = useState('');
  const [dataUser, setDataUser] = useState({});
  const [preview, setPreview] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(null);


  const navigate = useNavigate();

  
  const { id } = useParams();

  console.log(id)
  
  const {update} = useContext(Context)

  useEffect(()=>{
    const findUser = async () =>
    {
      const res = await api.get(`/user/find/${id}`);
      console.log(res.data.user)
      if(res.data.user)
      {
        setDataUser(res.data.user)

        setName(res.data.user.name)
        setEmail(res.data.user.email)
        document.querySelector('#permission').value = res.data.user.permission
        setPermission(res.data.user.permission)
        document.querySelector('#blocked').value = res.data.user.blocked
        setBlocked(res.data.user.blocked)
        // setPassword(res.data.user.password)
        // setConfirmpassword(res.data.user.password)
        
        console.log(res.data.user.blocked)
      }

    }
    findUser();
  }, []);



  const handleSubmit = async (e) =>{
    e.preventDefault();
    const message = document.querySelector("#message");
    const idName = document.querySelector("#name");
    const idEmail = document.querySelector("#email");
    const idPermission = document.querySelector('#permission');
    const idBlocked = document.querySelector("#blocked")
    const idPassword = document.querySelector("#password");
    const idConfPass = document.querySelector("#confirmpassword");

    idName.style.border = 'none'
    idEmail.style.border = 'none'
    idPermission.style.border = 'none'
    idBlocked.style.border = 'none'
    idPassword.style.border = 'none'
    idConfPass.style.border = 'none'

    
    if(!name)
    {
      message.innerHTML = "O campo nome é obrigatorio, por vafor preencher!"
      idName.style.border = '3px solid red';
      idName.focus();
      return;
    }

    if(!email)
    {
      message.innerHTML = "O campo email é obrigatorio, por vafor preencher!"
      idEmail.style.border = '3px solid red';
      idEmail.focus();
      return;
    }

    if(!permission)
    {
      message.innerHTML = "O campo permissão do usuário é obrigatorio, por vafor preencher!"
      idPermission.style.border = '3px solid red';
      idPermission.focus();
      return;
    }

    if(!blocked)
    {
      message.innerHTML = "O campo permissão do usuário é obrigatorio, por vafor preencher!"
      idBlocked.style.border = '3px solid red';
      idBlocked.focus();
      return;
    }

    if(password && !confirmpassword)
    {
      message.innerHTML = "A confirmação da senha é obrigatoria"
      idConfPass.style.border = '3px solid red';
      idConfPass.focus();
      return
    }

    if(!password && confirmpassword)
    {
      message.innerHTML = "A senha é obrigatoria"
      idPassword.style.border = '3px solid red';
      idPassword.focus();
      return
    }
 
    if( ( password && confirmpassword ) && ( password !== confirmpassword ) )
    {
      message.innerHTML = "Senha não conferem"
      idPassword.style.border = '3px solid red';
      idConfPass.style.border = '3px solid red';
      return;
    }
    
    if( ( password && confirmpassword ) && ( password === confirmpassword ) && (password.length < 6) )
    {
      message.innerHTML = "O campo senha e/ou confirmação de senha precisam ter pelo menos 6 caracteres"
      idPassword.style.border = '3px solid red';
      idConfPass.style.border = '3px solid red';
      return;
    }

    const  user = {
      userid: id, name, email, permission, blocked, image
    }
     
    setIsSubmitting(true);

    setTimeout( async () => {
      await update(user)
      setIsSubmitting(false);
      navigate('/user/list')
    }, "2000");
   
  }
  

  return (
    <>
    <div className={styles.container}>
          <p id='message'></p>
          <h2><ion-icon name="person-circle-outline"></ion-icon></h2>
          <h2>Editar usuário</h2>
          
            
          <div className={styles.profile_user}>

              {(dataUser.image || preview) && (
                <img src={preview ? URL.createObjectURL(preview)
                : `http://localhost:3000/images/${dataUser.image}`} />
              )}
              <label htmlFor="image">Imagem de perfil do usuário</label>
              <input type="file" 
                id='image'
                onChange={(e)=>{
                  setImage(e.target.files[0])
                  setPreview(e.target.files[0])
                }}
                />

          </div>
      <section className="col-12 d-flex justify-content-center">
            <form className="d-flex col-12 row" onSubmit={handleSubmit} >
              <div className="col-lg-3 col-12">
                <label htmlFor="name">Nome</label>
                <input className="px-2 d-block w-100"
                id='name'
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                />
              </div>
              <div className="col-lg-3 col-12">
                <label htmlFor="fantasy">Email</label>
                <input className="px-2 d-block w-100"
                  id='email'
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                />
              </div>
              <div className="col-lg-3 col-12">
                <label htmlFor="email">Permissão do usuário</label>
                <select id='permission' onChange={(e)=>{setPermission(e.target.value)}}>
                    <option value=""></option>
                    <option value="1"  >1 - administrador</option>
                    <option value="2">2 - cadastrar/alterar/excluir</option>
                    <option value="3">3 - cadastrar/alterar</option>
                    <option value="4">4 - cadastrar</option>
                    <option value="5">5 - consultar</option>
                </select>
              </div>
              <div className="col-lg-3 col-12">
                <label htmlFor="cnpj">Bloqueado</label>
                  <select id='blocked' onChange={(e)=>{setBlocked(e.target.value)}}>
                    <option value=""></option>
                    <option value="1">1 - Sim</option>
                    <option value="2">2 - Não</option>
                  </select>
              </div>
              <div className="col-lg-3 col-12">
                <label htmlFor="password">Senha</label>
                <input className="px-2 d-block w-100"
                  type='password'
                  id='password'
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
              </div>

              <div className="col-lg-3 col-12">
                <label htmlFor="price">Confirmar senha</label>
                <input className="px-2 d-block w-100" 
                type='password'
                id='confirmpassword'
                value={confirmpassword}
                onChange={(e)=>{setConfirmpassword(e.target.value)}}
                />
              </div>

              <div className="col-lg-3 mt-4 col-12">
                <button className="btn btn-primary d-flex justify-content-center align-items-center" type="submit" style={{ height: '40px', width: '100%' }}>
                {isSubmitting ? <span className="loader"></span>
                  : <span>Atualizar</span>
                }
                </button>
              </div>
            
            </form>
          </section>

    </div>
    
    </>
  )
}

export default EditUser