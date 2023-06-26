import React from 'react'
import lupa from '../images/lupa.svg'
import edit from '../images/edit.svg'
import trash from '../images/trash.svg'
import NavBar from '../../components/NavBar'
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import api from '../../utils/api';
import moment from 'moment';
import { useProduct } from '../../hooks/useProduct';
import { useSupplier } from '../../hooks/useSupplier';
import { useUnit } from '../../hooks/useUnit'
import { useCategory } from '../../hooks/useCategory'
import { Edit } from './Edit'

function Create() {
  const url = 'http://localhost:3000/produto-mercado/';
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('');
  const [category, setCategory] = useState(''); 
  const [supplier, setSupplier] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('');
  const [manufacturing_date, setManufacturing_date] = useState('');
  const [expiration_date, setExpiration_date] = useState('');
  const [UserId, setUserId] = useState('');
  const [objDate, setObjDate] = useState({});

  const [isSubmitting, setIsSubmitting] = useState();

  const {httpRequest, products, setProducts, updateStatus, setUpdateStatus} = useProduct();
  const {supplier: suppliers} = useSupplier();
  const { unit: units } = useUnit();
  const {category: categorys} = useCategory();

  useEffect(()=>{
    
    if(price && amount != '')
    {
     setTotal( !isNaN(Number(price) * Number(amount)) ? (Number(price) * Number(amount)) : '' )
    }
  }, [price, amount, total]);



  function returnDayMonthYear(date)
  {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    return {year: Number(year), month:Number(month), day: Number(day)}
  }


  function compareDate(data1, data2)
  {
    if(data1.year !== data2.year)
    {
      if( data1.year > data2.year)
      {
        return 1
      }
      else
      {
        return 2
      }
    }
    else if(data1.month !== data2.month)
    {
      if( data1.month > data2.month)
      {
        return 1
      }
      else
      {
        return 2
      }
    }
    else if(data1.day !== data2.day)
    {
      if( data1.day > data2.day)
      {
        const difference = (data1.day - data2.day)
        if(difference >= 10)
        {
            return 1
        }
        else
        {
            return  3
        }
      }
      else
      {
        return  2
      }
    }
    
    return 3
  }

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    const idName = document.querySelector('#name');
    const idBrand = document.querySelector('#brand');
    const idPrice = document.querySelector('#price');

    idName.style.border = "none";
    idBrand.style.border = "none";
    idPrice.style.border = "none";
    
    if(!name)
    {
      idName.style.border = "3px solid red";
      return
    }
    else if(!brand)
    {
      idBrand.style.border = "3px solid red";
      return
    }
    else if(!price)
    {
      idPrice.style.border = "3px solid red";
      return
    }


    const product = {
      name, description, brand, weight, 
      unit:stringToArray(unit, '2'), 
      category: stringToArray(category, '2'),
      supplier: stringToArray(supplier, '2'),
      price, amount, total, manufacturing_date, expiration_date,
      SupplierId: stringToArray(supplier, '1'),
      CategoryId: stringToArray(category, '1'),
      UnitId: stringToArray(unit, '1')
    }

    setIsSubmitting(true)
    
    setTimeout( async () => {
      
      await httpRequest("POST", product);
      setIsSubmitting(false)
      clearFild();

    }, "2000");

  }

    const stringToArray = (valueStr, order) =>
    {
      const array = valueStr.split('-');

      if(order === '1')
      {
        return array[0];
      }
      else if(order === '2')
      {
        return array[1];
      }
      else
      {
        return array;
      }
    }

    function clearFild(){
      setName('');
      setDescription('');
      setBrand('');
      setWeight('');
      setUnit('');
      setCategory('');
      setSupplier('');
      setPrice('');
      setAmount('');
      setTotal('');
      setManufacturing_date('');
      setExpiration_date('');
    }

    // -------------- DELETE --------------
    const [isDeleting, setIsDeleting] = useState(null);

    const deleteProduto = async (id) => {
      setIsDeleting(id)
      try {
        const response = await api.delete(`/produto-mercado/${id}`);
        console.log(response.data);
        setUpdateStatus(!updateStatus)
        setProducts(products.filter((obj) => obj.id !== id));

      } catch (error) {
        console.error(error);
      }

      setTimeout(() => {
        setIsDeleting(null)
      }, '50000');
    }

    // -------------- GET BY ID  --------------
    const [idPesquisado, setIdPesquisado] = useState('');
    // Filtrar produtos por ID pesquisado
    const produtosFiltrados = products ? products.filter(obj => obj.id.toString().includes(idPesquisado)) : '';

    const [ordenacaoAscendente, setOrdenacaoAscendente] = useState(true);

    const handleOrdenacaoChange = (event) => {
      const value = event.target.value;
      if (value === "mais-recente") {
        setOrdenacaoAscendente(true);
      } else {
        setOrdenacaoAscendente(false);
      }
    };

    const produtosOrdenados = [...produtosFiltrados].sort((a, b) => {
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
                <span>Conforme</span>
              </li>
              <li>
                <div className={`legend legend_date`}></div>
                <span>Em vencimento</span>
              </li>
              <li>
                <div className={`legend legend_date_expiration`}></div>
                <span>Vencido</span>
              </li>
          </ul>

        <p id='message'></p>
        <h1>Produto - Cadastrar</h1>
        <section className="col-12 d-flex justify-content-center">
          <form className="d-flex col-12 row" onSubmit={handleSubmit} >
            <div className="col-lg-3 col-12">
              <label htmlFor="name">Nome</label>
              <input className="px-2 d-block w-100"
              onChange={(e)=>{setName(e.target.value)}}
              value={name}
              id='name'
              />
            </div>
            <div className="col-lg-3 col-12">
              <label htmlFor="name">Descrição</label>
              <input className="px-2 d-block w-100"
              onChange={(e)=>{setDescription(e.target.value)}}
              id='description'
              value={description}
              />
            </div>

            <div className="col-lg-3 col-12">
              <label htmlFor="brand">Marca</label>
              <input className="px-2 d-block w-100"
              onChange={(e)=>{setBrand(e.target.value)}}
              id='brand'
              value={brand}
              />
            </div>

            <div className="col-lg-3 col-12">
              <label htmlFor="weight">Peso</label>
              <input className="px-2 d-block w-100"
              onChange={(e)=>{setWeight(e.target.value)}}
              id='weight'
              value={weight}
              />
            </div>

            <div className="col-lg-3 col-12">
              <label htmlFor="weight">Unidade de medida</label>
              <select name="" id="" 
              onChange={(e)=>{setUnit(e.target.value)}}
              value={unit}
              >
                <option value=""></option>
                {units && 
                  units.map( (item)=>(
                    item.blocked !== '1'
                    ?
                    <option key={item.id} value={`${item.id}-${item.name}`} >{item.name} - {item.description}</option>
                    :
                    ''
                  ) 
                )}
              </select>
            </div>

            <div className="col-lg-3 col-12">
              <label htmlFor="category">Categoria</label>
              <select onChange={(e)=>{setCategory(e.target.value)}}
              value={category}
              id="category">
                <option value=""></option>
                {categorys && 
                  categorys.map( (item)=>(
                    item.blocked === '2' 
                    ?
                    <option key={item.id} value={`${item.id}-${item.name}`}>{item.name}</option>
                    :
                    ''
                  ) 
                )}
              </select>
            </div>

            <div className="col-lg col-6">
              <label htmlFor="supplier">Fornecedor</label>
              <select name="" id="supplier" onChange={(e)=>{setSupplier(e.target.value)}}
              value={supplier}
              >
                <option value=""></option>
                {suppliers && 
                  suppliers.map( (item)=>(
                    item.blocked !== '1'
                    ?
                    <option key={item.id} value={`${item.id}-${item.name}`}> {item.id} - {item.name}</option>
                    :
                    ''  
                  ) 
                )}
              </select>
            </div>

      
            <div className="col-lg-3 col-12">
              <label htmlFor="price">Preço Unitario</label>
              <input className="px-2 d-block w-100" 
              onChange={(e)=>{setPrice(e.target.value)}}
              id='price'
              value={price}
              />
            </div>

            <div className="col-lg-3 col-12">
              <label htmlFor="price">Quantidade Estoque</label>
              <input className="px-2 d-block w-100" 
              onChange={(e)=>{setAmount(e.target.value)}}
              value={amount}
              />
            </div>

            <div className="col-lg-3 col-12">
              <label htmlFor="price">Saldo total Estoque</label>
              <input className="px-2 d-block w-100"
              value={total}
              onChange={(e)=>{}}
              id='total'
              />
            </div>
           
            <div className="col-lg col-12">
              <label htmlFor="manufacturing_date">Fabricação</label>
              <input className="px-2 d-block w-100" type="date"
              onChange={(e)=>{setManufacturing_date(e.target.value)}}
              id='manufacturing_date'
              value={manufacturing_date}
              />
            </div>
            <div className="col-lg col-12">
              <label htmlFor="expiration_date">Validade</label>
              <input className="px-2 d-block w-100" type="date" 
              onChange={(e)=>{setExpiration_date(e.target.value)}}
              id='expiration_date'
              value={expiration_date}
              />
            </div>
          
            <div className="col-lg-3 mt-4 col-12">
              <button className="btn btn-primary d-flex justify-content-center align-items-center" type="submit" style={{ height: '40px', width: '100%' }}>
              {isSubmitting ? <span className="loader"></span>
                  : <span>Registrar</span>
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
              <th>Marca</th>
              <th>Peso</th>
              <th>Uni. Medida</th>
              <th>Categoria</th>
              <th>Fornecedor</th>
              <th>Preço</th>
              <th>Quant. Estoque</th>
              <th>Saldo Tot. Estoque</th>
              <th>Data de Fabricação</th>
              <th>Data de Validade</th>
              <th className="d-flex justify-content-end" >Edit / Delete</th>
            </tr>
          </thead>
          {produtosOrdenados &&  <tbody>
              {produtosOrdenados && produtosOrdenados.map((obj, index) => (
                  <tr key={obj.id} className={index % 2 === 1 ? "bg-second" : ""}>
                    <td>
                      <div className={`legend 
                      ${compareDate(
                        returnDayMonthYear(obj.expiration_date.toString()), returnDayMonthYear(new Date().toISOString())
                      )
                      == 1 
                      ? 'legend' 
                      : 
                      compareDate(
                        returnDayMonthYear(obj.expiration_date.toString()), returnDayMonthYear(new Date().toISOString())
                      )
                      == 3
                      ? 
                      'legend_date'
                      :
                      'legend_date_expiration' 
                      
                      }`}></div>
                    </td>
                    <td>{obj.id}</td>
                    <td>{obj.name}</td>
                    <td>{obj.description}</td>
                    <td>{obj.brand}</td>
                    <td>{obj.weight}</td>
                    <td>{obj.unit}</td>
                    <td>{obj.category}</td>
                    <td>{obj.supplier}</td>
                    <td>R$ {obj.price}</td>
                    <td>{obj.amount}</td>
                    <td>R$ {obj.total}</td>
                    <td>{moment(obj.manufacturing_date.toString().slice(0,10)).format('DD/MM/YYYY')}</td>
                    <td>{moment(obj.expiration_date.toString().slice(0,10)).format('DD/MM/YYYY')}</td>
                    <td className="d-flex align-items-center justify-content-end">
                    <img src={edit} width={22} alt="ícone editar" onClick={() => handleEdit(obj)} className="cursor-pointer" ></img>
                      {isDeleting === obj.id
                          ?
                          <span className="loader me-1" style={{ marginLeft: '6px' }}></span>
                          :
                          <img src={trash} width={30} alt="ícone deletar" onClick={() => deleteProduto(obj.id)} className="cursor-pointer"></img>
                        }
                    </td>
                  </tr>
                ))}
          </tbody> }
        </table>
      </section>
      
      {isEditOpen === true ?
        <>
          <Edit  obj={selectedObj}/>
          <div className="glass-container" onClick={() => setIsEditOpen(!isEditOpen)}></div>
        </>
        : ''}        

       </>

  )
}

export default Create