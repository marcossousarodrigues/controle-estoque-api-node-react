import React from 'react'
import lupa from '../images/lupa.svg'
import edit from '../images/edit.svg'
import trash from '../images/trash.svg'
import NavBar from '../../components/NavBar'
import { useState, useEffect } from 'react'
import api from '../../utils/api';
import moment from 'moment';
import { useProduct } from '../../hooks/useProduct';
import { useSupplier } from '../../hooks/useSupplier'
import { useUnit } from '../../hooks/useUnit'
import axios from 'axios'
import { Edit } from './Edit'
function Create() {
  const url = 'http://localhost:3000/produto-mercado/';
  const [name, setName] = useState('')
  const [description, setDescription] = useState('');

  const [isDeleting, setIsDeleting ] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(null)

  const {httpRequest, unit} = useUnit();

  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    const nameId = document.querySelector("#name")
    const descriptionId = document.querySelector("#description")
    nameId.style.border = "none"
    descriptionId.style.border = "none"

    if(!name)
    {
      nameId.style.border = "3px solid red"
      return;
    }
    else if(!description)
    {
      descriptionId.style.border = "3px solid red"
      return;
    }

    const unit = {
      name, description, blocked: '2'
    }

    setIsSubmitting(true)

    setTimeout( async () => {

      await httpRequest("POST", unit)
      
      setIsSubmitting(false)
      setName('');
      setDescription('')
    }, "2000");
   

  }

  
  const handleDelete = async (id) =>
  {
    setIsDeleting(id)

    setTimeout( async () => {
      await httpRequest("DELETE",{}, id)
      setIsDeleting(null)
    }, "3000");

  }


  
  // -------------- GET BY ID  --------------
 const [idPesquisado, setIdPesquisado] = useState('');
 // Filtrar produtos por ID pesquisado
 const unitFilter = unit ? unit.filter(obj => obj.id.toString().includes(idPesquisado)) : '';

 const [ordenacaoAscendente, setOrdenacaoAscendente] = useState(true);

 const handleOrdenacaoChange = (event) => {
   const value = event.target.value;
   if (value === "mais-recente") {
     setOrdenacaoAscendente(true);
   } else {
     setOrdenacaoAscendente(false);
   }
 };

 const unitOrders = [...unitFilter].sort((a, b) => {
   if (ordenacaoAscendente) {
     return b.id - a.id;
   } else {
     return a.id - b.id;
   }
 });


  // -------------- EDIT --------------
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedObj, setSelectedObj] = useState(null);

  const handleEdit = (obj) => { setSelectedObj(obj); setIsEditOpen(!isEditOpen); }


  return (
       <>
      
      <div className="container my-4 p-0 list">
      <ul className='ul_legend'>
          <li>
            <div className='legend'></div>
            <span>Não bloqueado</span>
          </li>
          <li>
            <div className={`legend legend_blocked`}></div>
            <span>Bloqueado</span>
          </li>

        </ul>


      <h1>Unidade de medida - Cadastrar</h1>
        <section className="col-12 d-flex justify-content-center">
          <form className="d-flex col-12 row" onSubmit={handleSubmit} >
            <div className="col-lg-3 col-12">
              <label htmlFor="name">Unidade</label>
              <input className="px-2 d-block w-100"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              id='name'
              />
            </div>
            <div className="col-lg-3 col-12">
              <label htmlFor="fantasy">Descrição</label>
              <input className="px-2 d-block w-100"
              value={description}
              onChange={(e)=>{setDescription(e.target.value)}}
              id='description'
              />
            </div>
          
            <div className="col-lg-3 mt-4 col-12">
              <button className="btn btn-primary d-flex justify-content-center align-items-center" type="submit" style={{ height: '40px', width: '100%' }}>
              {isSubmitting ? <span className="loader"></span>
                  : <span>Registar</span>
                }
              </button>
            </div>
          </form>
        </section>
      </div>
      <div className="container">
        <hr></hr>
      </div>
      
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

      <section className="container mt-2 mb-5" style={{ overflowX: 'auto' }}>
        <table className="w-100">
          <thead>
            <tr>
              <th>Legenda</th>
              <th className="id">Id</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th className="d-flex justify-content-end" >Edit / Delete</th>
            </tr>
          </thead>
          {unitOrders &&  <tbody>
              {unitOrders && unitOrders.map((obj, index) => (
                  <tr key={obj.id} className={index % 2 === 1 ? "bg-second" : ""}>
                    <td>
                      <div className={`${obj.blocked === '1' ? 'legend legend_blocked' : 'legend'}`}></div>
                    </td>
                    <td>{obj.id}</td>
                    <td>{obj.name}</td>
                    <td>{obj.description}</td>
                    <td className="d-flex align-items-center justify-content-end">
                      <img src={edit} width={22} alt="ícone editar" onClick={() => handleEdit(obj)} className="cursor-pointer" ></img>
                      {isDeleting === obj.id
                          ?
                          <span className="loader me-1" style={{ marginLeft: '6px' }}></span>
                          :
                          <img src={trash} width={30} alt="ícone deletar" onClick={() => handleDelete(obj.id)} className="cursor-pointer"></img>
                        }
                    </td>
                  </tr>
                ))}
          </tbody> }
        </table>
      </section>
      
      {isEditOpen === true ?
        <>
          <Edit obj={selectedObj}/>
          <div className="glass-container" onClick={() => setIsEditOpen(!isEditOpen)}></div>
        </>
        : ''}       

       </>
  )
}

export default Create