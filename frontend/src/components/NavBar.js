import React, { useContext, useEffect, useState } from 'react'
import logo from '../pages/images/cart.svg'
import styles from './NavBar.module.css'
import { Link } from 'react-router-dom'
import { Context } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate(); 
  const {authenticated, logout, userName, userPermission} = useContext(Context)
   useEffect(()=>{
      if(!authenticated)
      {
        // navigate('/')
      }
   }, [])

  return (
      <>
      {authenticated &&
      <nav className="navbarCustom py-3 container-fluid">
        <div className="container">
          <div className={`d-flex align-items-center ${styles.container_header}`}>
            <div className={styles.logo}>
              <img src={logo} width={60} className="me-3" />
        
              <h3 className="mb-0"><u style={{ textDecorationColor: '#808080', textDecorationThickness: '2.5px', textUnderlineOffset: '10px' }}><Link to="/product/create">Sistema mercearia</Link></u></h3>
            </div> 
            <ul className={styles.ul}>
              <li>
                <Link to="/product/create"><span><ion-icon name="receipt-outline"></ion-icon></span> <span>Produto</span></Link>
              </li>
              <li>
                <Link to="/supplier/create"><span><ion-icon name="car-outline"></ion-icon></span> <span>Fornecedor</span></Link>
              </li>
              <li>
                <Link to="/category/create"><span><ion-icon name="reader-outline"></ion-icon></span> <span>Categoria</span></Link>
              </li>
              <li>
                <Link to="/unit/create"><span><ion-icon name="calculator-outline"></ion-icon></span> <span>Uni. Medida</span></Link>
              </li>
              {userPermission && (userPermission === JSON.stringify("1")) ? (
                  <li>
                  <span><ion-icon name="person-circle-outline"></ion-icon></span>
                  <span>Usuário</span>
                  <ul>
                    <li>
                      <Link to="/user/register">Criar</Link>
                    </li>
                     <li>
                      <Link to="/user/list">Lita</Link>
                    </li>
                  </ul>
                </li>
              ) : ('') }
              
              <li>
                <span><ion-icon name="exit-outline"></ion-icon></span>
                <button onClick={()=>{logout()}} >Sair</button>
              </li>
            </ul>

          </div>
        </div>
      </nav>
      }
      </>
  )
}

export default NavBar