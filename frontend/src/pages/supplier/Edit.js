import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSupplier } from "../../hooks/useSupplier";

export const Edit = ({obj}) => {
    const { handleSubmit } = useForm();
    const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
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
    const [blocked, setBlocked] = useState('2')

    const [findCep, setFindCep] = useState('');

    const idNumber = document.querySelector('#numberFild')
    const cepFild = document.querySelector('#cepFild')

    const { httpRequest } = useSupplier();

    useEffect(()=>{
      const apiCep = async () =>
      { 
          try{
            const res = await axios.get(`https://viacep.com.br/ws/${findCep}/json/`)
            if(!res.data.erro)
            {
              setAddress(res.data.logradouro)
              setNeighborhood(res.data.bairro)
              setState(res.data.uf)
              setCountry(res.data.localidade)
              idNumber.focus();
              cepFild.style.border = 'none';
            }
            console.log(res.data)
          }
          catch(error)
          {
            console.log(error)
          }
         
         
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
        if(cepFild)
        {
          cepFild.focus()
          cepFild.style.border = '3px solid red';
        }
       
      }
      
  }, [findCep]);

  useEffect( ()=>{
    setName(obj.name)
    setFantasy(obj.fantasy)
    setEmail(obj.email)
    setCnpj(obj.cnpj)
    setCep(obj.cep)
    setAddress(obj.address)
    setNumber(obj.number)
    setNeighborhood(obj.neighborhood)
    setState(obj.state)
    setCountry(obj.county)
    if(obj.blocked !== null)
    {
      setBlocked(obj.blocked)
    }
}, [obj])


    const Update = async () => {
      setIsSubmittingEdit(true)
      const supplier = {
        name, fantasy, email, cnpj, cep, address, number, neighborhood, state, county, blocked
      };
    
  
      setTimeout( async () => {
        await httpRequest("UPDATE", supplier, obj.id)
        setIsSubmittingEdit(false)
        window.location.reload(true);
      }, "3000");

      
    };
      return (
          <>
            <section className="editModal rounded mt-5 w-100">
            <form className="d-flex col-12 row" onSubmit={handleSubmit(Update)} >
                <div className="col-lg-3 col-12">
                <label htmlFor="name">Nome</label>
                  <input className="px-2 d-block w-100"
                  defaultValue={name}
                  onChange={(e)=>{setName(e.target.value)}}
                  />
                </div>
                <div className="col-lg-3 col-12">
                <label htmlFor="fantasy">Nome Fantasia</label>
                  <input className="px-2 d-block w-100"
                  defaultValue={fantasy}
                  onChange={(e)=>{setFantasy(e.target.value)}}
                    ></input>
                </div>
    
                <div className="col-lg-3 col-12">
                <label htmlFor="email">E-mail</label>
                  <input type='email' className="px-2 d-block w-100"
                  defaultValue={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  ></input>
                </div>
    
                <div className="col-lg-3 col-12">
                <label htmlFor="cnpj">CNPJ</label>
                  <input type='text' className="px-2 d-block w-100"
                  defaultValue={cnpj}
                  onChange={(e)=>{setCnpj(e.target.value)}}
                  ></input>
                </div>
    
            
                <div className="col-lg-3 col-12">
                <label htmlFor="cep">Cep</label>
                  <input type='text' className="px-2 d-block w-100"
                  defaultValue={cep}
                  onChange={(e)=>{setCep(e.target.value)}}
                  onBlur={(e)=>{setFindCep( e.target.value)}}
                  id='cepFild'
                  ></input>
                </div>
    
                <div className="col-lg-3 col-12">
                  <label htmlFor="address">Endereço</label>
                  <input type='text' className="px-2 d-block w-100"
                  defaultValue={address}
                  onChange={(e)=>{setAddress(e.target.value)}}
                  ></input>
                </div>
    
                <div className="col-lg-3 col-12">
                  <label htmlFor="number">Numero</label>
                   <input className="px-2 d-block w-100"
                   defaultValue={number}
                   onChange={(e)=>{setNumber(e.target.value)}}
                   id='numberFild'
                   ></input>
                </div>
               
                <div className="col-lg-3 col-12">
                <label htmlFor="neighborhood">Bairro</label>
                  <input type="text" className="px-2 d-block w-100"
                  defaultValue={neighborhood}
                  onChange={(e)=>{setNeighborhood(e.target.value)}}
                  ></input>
                </div>
                <div className="col-lg-3 col-12">
                <label htmlFor="expiration_date">Estado</label>
                  <input type="text" className="px-2 d-block w-100"
                  defaultValue={state}
                  onChange={(e)=>{setState(e.target.value)}}
                  ></input>
                </div>
  
                <div className="col-lg-3 col-12">
                <label htmlFor="expiration_date">Municipio</label>
                  <input type="text" className="px-2 d-block w-100"
                  defaultValue={county}
                  onChange={(e)=>{setCountry(e.target.value)}}
                  ></input>
                </div>
                <div className="col-lg-3 col-12">
                  <label htmlFor="brand">Bloqueado</label>
                  <select value={blocked} 
                  onChange={(e)=>{setBlocked(e.target.value)}}
                  >
                    <option value="1">Sim</option>
                    <option value="2">Não</option>
                  </select>
                </div>
  
                <div className="col-lg-3 mt-4 col-12">
                <button className="btn btn-primary d-flex justify-content-center align-items-center" type="submit" style={{ height: '40px', width: '100%' }}>
                    {isSubmittingEdit ? <span className="loader"></span>
                      : <span>Atualizar</span>
                    }
                  </button>
                </div>
              </form>
    
            </section>
          </>
        )
      
  }