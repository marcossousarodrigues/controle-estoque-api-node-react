import React, { useContext, useEffect, useState } from 'react'
import api from '../../utils/api';
import styles from './ListUser.module.css'
import lupa from '../images/lupa.svg'
import edit from '../images/edit.svg'
import trash from '../images/trash.svg'
import { Link } from 'react-router-dom'
import { Context } from '../../context/UserContext';

function ListUser() {
  const [data, setData] = useState(null)
  const {deleteUser} = useContext(Context)
  const [method, setMethod] = useState('GET');
  const [isDeleting, setIsDeleting] = useState(null)

  useEffect(()=>{
    const findUser = async () =>
    {
      const res = await api.get('/user/finduser');
      setData(res.data.user)

    }

    findUser();
  }, [method]);

  const handleDelete = async (id) =>
  {
    setIsDeleting(id)

    setTimeout( async() => {
      setMethod('DELETE')
      await deleteUser(id);

      setIsDeleting(null)

      setMethod('GET')
      
    }, "2000");
   
  }

  
  // -------------- GET BY ID  --------------
 const [idPesquisado, setIdPesquisado] = useState('');
 // Filtrar produtos por ID pesquisado
 const userFilter = data ? data.filter(obj => obj.id.toString().includes(idPesquisado)) : '';

 const [ordenacaoAscendente, setOrdenacaoAscendente] = useState(true);

 const handleOrdenacaoChange = (event) => {
   const value = event.target.value;
   if (value === "mais-recente") {
     setOrdenacaoAscendente(true);
   } else {
     setOrdenacaoAscendente(false);
   }
 };

 const userOrders = [...userFilter].sort((a, b) => {
   if (ordenacaoAscendente) {
     return b.id - a.id;
   } else {
     return a.id - b.id;
   }
 });



  return (
    <>
    <section className={`container mt-2 mb-5 list`} style={{ overflowX: 'auto' }}>
    <ul className='ul_legend'>
      <li>
        <div className='legend'></div>
        <span>Não bloqueado</span>
      </li>
      <li>
        <div className='legend_blocked'></div>
        <span>Bloqueado</span>
      </li>

    </ul>

      <h1 className="text-center mt-3 mb-5">Usuários - cadastrados</h1>
      <section className="container mt-3 mb-4 col-12 d-flex">
        <div className="col-lg-4 col-12">
          <label>Pesquisa por Id</label>
          <div className=" position-relative">
            <input type='text' className="d-block px-2 w-100"  placeholder="Pesquisa por Id..."
            onChange={(e)=>{setIdPesquisado(e.target.value)}}
            />
            <img src={lupa} width={25} alt='lupa' className="position-absolute" style={{
              top: "50%",
              transform: "translateY(-50%)",
              right: "8px",
            }}></img>
          </div>
        </div>
        <div className="col-lg-2 col-12 ps-3">
          <label>Ordenar por:</label>
          <select onChange={handleOrdenacaoChange} style={{ height: '40px'}} className="form-select">
            <option value="mais-recente">Mais recente</option>
            <option value="mais-antigo">Mais antigo</option>
          </select>
        </div>
      </section>

      {!data && <h1>Nenhum registro encontrado</h1> }
      <section className="container mt-2 mb-5" style={{ overflowX: 'auto' }}>
            <table className="w-100">
            <thead>
              <tr>
                <th scope="col">Legenda</th>
                <th scope="col">Codigo</th>
                <th scope="col">Nome</th>
                <th scope="col">E-mail</th>
                <th scope="col">Permissão</th>
                <th scope="col">Bloqueado</th>
                <th scope="col" className="d-flex justify-content-end">Edit/delete</th>
              </tr>
            </thead>
            <tbody>
              { userOrders && userOrders.map( (user, index) =>(
                <>
                
                  <tr key={user.id} className={index % 2 === 1 ? "bg-second" : ""}>

                    <td>
                      <div className={`legend ${user.blocked == 1 ? 'legend_blocked' : '' }`}></div>
                    </td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.permission}</td>
                    <td>{user.blocked}</td>
                    <td className="d-flex align-items-center justify-content-end">
                        <Link to={`/user/edit/${user.id}`}><img src={edit} width={22} alt="ícone editar" className="cursor-pointer" ></img></Link>
                        {isDeleting === user.id
                          ?
                          <span className="loader me-1" style={{ marginLeft: '6px' }}></span>
                          :
                          <img src={trash} width={30} alt="ícone deletar" onClick={() => handleDelete(user.id)} className="cursor-pointer"></img>
                        }
                  
                    </td>
                  </tr>
                  </>
              ))}
            
            </tbody>
          </table>
        </section>
     </section>
    
    </>
  )
}

export default ListUser