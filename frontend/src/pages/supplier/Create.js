import React from 'react'
import lupa from '../images/lupa.svg'
import edit from '../images/edit.svg'
import trash from '../images/trash.svg'
import NavBar from '../../components/NavBar'
import { useState, useEffect, useRef } from 'react'
import api from '../../utils/api';
import moment from 'moment';
import { useProduct } from '../../hooks/useProduct';
import { useSupplier } from '../../hooks/useSupplier'
import axios from 'axios'
import { useForm } from "react-hook-form"
import { useUnit } from '../../hooks/useUnit'
import { useCategory } from '../../hooks/useCategory'
import { Edit } from './Edit'

import {useReactToPrint} from 'react-to-print';

function Create() {
  const url = 'http://localhost:3000/produto-mercado/';
  const [price, setPrice] = useState('')
  const [name, setName] = useState('')
  const [fantasy, setFantasy] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood ] = useState('');
  const [state, setState] = useState('');
  const [county, setCountry] = useState('');

  const [isSubmitting, setIsSubmitting] = useState('')
  const [isDeleting, setIsDeleting] = useState('')

  const [findCep, setFindCep] = useState('');
  const idNumber = document.querySelector('#number')
  
  
  const {httpRequest, supplier} = useSupplier();

  const componentPDF = useRef();


  useEffect(()=>{
    const apiCep = async () =>
    {
        const res = await axios.get(`https://viacep.com.br/ws/${findCep}/json/`)
        if(!res.data.erro)
        {
          setAddress(res.data.logradouro)
          setNeighborhood(res.data.bairro)
          setState(res.data.uf)
          setCountry(res.data.localidade)
          idNumber.focus();
        }
        console.log(res.data)
       
    }

    setFindCep(findCep.replace('-', ''));

    if(findCep.length === 8)
    {
      apiCep();
      setCep(findCep)
    }
    else
    {
      setAddress('');
      setNumber('')
      setNeighborhood('')
      setState('')
      setCountry('')
    }
    
}, [findCep]);

  
  const handlePDF = useReactToPrint({

    content: ()=> componentPDF.current,
    documentTitle: "Userdata",
    onAfterPrint: ()=>alert("Data saved in PDF")
  });


  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    const nameId = document.querySelector("#name")
    const fantasyId = document.querySelector("#fantasy")
    const emailId = document.querySelector("#email")
    const cnpjId = document.querySelector("#cnpj")
    const cepId = document.querySelector("#cep")
    const addressId = document.querySelector("#address")
    const numberId = document.querySelector("#number")
    const neighborhoodId = document.querySelector("#neighborhood")
    const stateId = document.querySelector("#state")
    const countyId = document.querySelector("#county")

    nameId.style.border = 'none'
    fantasyId.style.border = 'none'
    emailId.style.border = 'none'
    cnpjId.style.border = 'none'
    cepId.style.border = 'none'
    addressId.style.border = 'none'
    numberId.style.border = 'none'
    neighborhoodId.style.border = 'none'
    stateId.style.border = 'none'
    countyId.style.border = 'none'
    
    if(!name)
    {
      nameId.style.border = "3px solid red";
      return
    }
    else if(!fantasy)
    {
      fantasyId.style.border = "3px solid red"
      return
    }
    else if(!email)
    {
      emailId.style.border = "3px solid red"
      return
    }
    else if(!cnpj)
    {
      cnpjId.style.border = "3px solid red"
      return
    }
    else if(!cep)
    {
      cepId.style.border = "3px solid red"
      return
    }
    else if(!address)
    {
      addressId.style.border = "3px solid red"
      return
    }
    else if(!number)
    {
      numberId.style.border = "3px solid red"
      return
    }
    else if(!neighborhood)
    {
      neighborhoodId.style.border = "3px solid red"
      return
    }
    else if(!state)
    {
      stateId.style.border = "3px solid red"
      return
    }
    else if(!county)
    {
      countyId.style.border = "3px solid red"
      return
    }

    const supplierData = {
      name, fantasy, email, cnpj, cep, address, number, neighborhood, state, county, blocked: '2'
    }
    setIsSubmitting(true)

    setTimeout( async () => {
      await httpRequest('POST', supplierData);
      setIsSubmitting(false)

      clearFild();

    }, "3000");
    
  }

  
  const handleDelete = async (id) =>
  {
    setIsDeleting(id)

    setTimeout( async () => {
      await httpRequest("DELETE",{}, id)
      setIsDeleting(null)
    }, "3000");


  }


  function clearFild()
  {
    setName('')
    setFantasy('')
    setEmail('')
    setCnpj('')
    setCep('')
    setAddress('')
    setNumber('')
    setNeighborhood('')
    setState('')
    setCountry('')
  }

 // -------------- GET BY ID  --------------
 const [idPesquisado, setIdPesquisado] = useState('');
 // Filtrar produtos por ID pesquisado
 const supplierFilter = supplier ? supplier.filter(obj => obj.id.toString().includes(idPesquisado)) : '';

 const [ordenacaoAscendente, setOrdenacaoAscendente] = useState(true);

 const handleOrdenacaoChange = (event) => {
   const value = event.target.value;
   if (value === "mais-recente") {
     setOrdenacaoAscendente(true);
   } else {
     setOrdenacaoAscendente(false);
   }
 };

 const supplierOrders = [...supplierFilter].sort((a, b) => {
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
                <div className={`legend_blocked`}></div>
                <span>Bloqueado</span>
              </li>
        </ul>

      <h1>Fornecedor - Cadastrar</h1>
        <section className="col-12 d-flex justify-content-center">
          <form className="d-flex col-12 row" onSubmit={handleSubmit} >
            <div className="col-lg-3 col-12">
              <label htmlFor="name">Nome</label>
              <input className="px-2 d-block w-100"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              id='name'
              />
            </div>
            <div className="col-lg-3 col-12">
              <label htmlFor="fantasy">Nome Fantasia</label>
              <input className="px-2 d-block w-100"
              value={fantasy}
              onChange={(e)=>{setFantasy(e.target.value)}}
              id='fantasy'
              />
            </div>
            <div className="col-lg-3 col-12">
              <label htmlFor="email">Email</label>
              <input className="px-2 d-block w-100"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              id='email'
              />
            </div>
            <div className="col-lg-3 col-12">
              <label htmlFor="cnpj">CNPJ</label>
              <input className="px-2 d-block w-100" 
              value={cnpj}
              onChange={(e)=>{setCnpj(e.target.value)}}
              id='cnpj'
              />
            </div>
            <div className="col-lg-3 col-12">
              <label htmlFor="price">Cep</label>
              <input className="px-2 d-block w-100" 
              onChange={(e)=>{setCep(e.target.value)}}
              value={cep}
              onBlur={(e)=>{setFindCep( e.target.value)}}
              id='cep'
              />
            </div>
            <div className="col-lg-3 col-12">
              <label htmlFor="price">Endereço</label>
              <input className="px-2 d-block w-100" 
              value={address}
              onChange={(e)=>{setAddress(e.target.value)}}
              id='address'
              />
            </div>
            <div className="col-lg-3 col-12">
              <label htmlFor="price">Numero</label>
              <input className="px-2 d-block w-100" 
              id='number'
              value={number}
              onChange={(e)=>{setNumber(e.target.value)}}
              />
            </div>
            <div className="col-lg-3 col-12">
              <label htmlFor="price">Bairro</label>
              <input className="px-2 d-block w-100" 
              value={neighborhood}
              onChange={(e)=>{setNeighborhood(e.target.value)}}
              id='neighborhood'
              />
            </div>
            <div className="col-lg-3 col-12">
              <label htmlFor="price">Estado</label>
              <input className="px-2 d-block w-100" 
              value={state}
              onChange={(e)=>{setState(e.target.value)}}
              id='state'
              />
            </div>
            <div className="col-lg-6 col-12">
              <label htmlFor="price">Municipio</label>
              <input className="px-2 d-block w-100" 
              value={county}
              onChange={(e)=>{setCountry(e.target.value)}}
              id='county'
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

      <div ref={componentPDF} style={{width: '100%'}}>
      <section className="container mt-2 mb-5" style={{ overflowX: 'auto' }}>
        <table className="w-100">
          <thead>
            <tr>
              <th>Legenda</th>
              <th className="id">Id</th>
              <th>Nome</th>
              <th>Fantasia</th>
              <th>E-mail</th>
              <th>CNPJ</th>
              <th>CEP</th>
              <th>Endereço</th>
              <th>Numero</th>
              <th>Bairro</th>
              <th>Estado</th>
              <th>Municipio</th>
              <th className="d-flex justify-content-end" >Edit / Delete</th>
            </tr>
          </thead>
          {supplierOrders &&  <tbody>
              {supplierOrders && supplierOrders.map((obj, index) => (
                  <tr key={obj.id} className={index % 2 === 1 ? "bg-second" : ""}>
                    <td>
                      <div className={`${obj.blocked === '1' ? 'legend_blocked' : 'legend' }`}></div>
                    </td>
                    <td>{obj.id}</td>
                    <td>{obj.name}</td>
                    <td>{obj.fantasy}</td>
                    <td>{obj.email}</td>
                    <td>{obj.cnpj}</td>
                    <td>{obj.cep}</td>
                    <td>{obj.address}</td>
                    <td>{obj.number}</td>
                    <td>{obj.neighborhood}</td>
                    <td>{obj.state}</td>
                    <td>{obj.county}</td>
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
      </div>
      {isEditOpen === true ?
        <>
          <Edit obj={selectedObj} />
          <div className="glass-container" onClick={() => setIsEditOpen(!isEditOpen)}></div>
        </>
        : ''}   
       </>
  )
}

export default Create