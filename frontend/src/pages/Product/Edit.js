import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react'
import { useSupplier } from "../../hooks/useSupplier";
import { useUnit } from "../../hooks/useUnit";
import { useCategory } from "../../hooks/useCategory";
import moment from 'moment';
import { useProduct } from "../../hooks/useProduct";

export const Edit = ({ obj }) => {
    const { handleSubmit } = useForm();
    const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
    const [nameEdit, setNameEdit] = useState('');
    const [descriptionEdit, setDescriptionEdit] = useState('');
    const [brandEdit, setBrandEdit] = useState('');
    const [weightEdit, setWeightEdit] = useState('');
    const [unitEdit, setUnitEdit] = useState('');
    const [unitIdEdit, setUnitIdEdit] = useState('');
    const [categoryEdit, setCategoryEdit] = useState('');
    const [categoryIdEdit, setCategoryIdEdit] = useState('');
    const [supplierEdit, setSupplierEdit] = useState('');
    const [supplierIdEdit, setSupplierIdEdit] = useState('');
    const [priceEdit, setPriceEdit] = useState('');
    const [totalEdit, setTotalEdit] = useState('');
    const [amountEdit, setAmountEdit] = useState('');
    const [manufacturing_dateEdit, setManufacturing_dateEdit] = useState('');
    const [expiration_dateEdit, setExpiration_dateEdit] = useState('');


    const {supplier: suppliers} = useSupplier();
    const { unit: units } = useUnit();
    const {category: categorys} = useCategory();

    const {httpRequest, updateStatus, setUpdateStatus, dataUpdateProduct} = useProduct();


    useEffect(()=>{
      setNameEdit(obj.name);
      setDescriptionEdit(obj.description);
      setBrandEdit(obj.brand);
      setWeightEdit(obj.weight);
      setUnitEdit(obj.unit);
      setUnitIdEdit(obj.UnitId)
      setCategoryEdit(obj.category);
      setCategoryIdEdit(obj.CategoryId);
      setSupplierEdit(obj.supplier);
      setSupplierIdEdit(obj.SupplierId);
      setPriceEdit(obj.price);
      // setTotalEdit(obj.total);
      setAmountEdit(obj.amount);
      setManufacturing_dateEdit(obj.manufacturing_date.toString().slice(0,10));
      setExpiration_dateEdit(obj.expiration_date.toString().slice(0,10));
      console.log(dataUpdateProduct)

    },[obj]);

    useEffect(()=>{
    
      if(priceEdit && amountEdit != '')
      {
        setTotalEdit( !isNaN(Number(priceEdit) * Number(amountEdit)) ? (Number(priceEdit) * Number(amountEdit)) : '' )
      }
    }, [priceEdit, amountEdit, amountEdit]);
  

    const Update = async () => {

      setIsSubmittingEdit(true)
      const newProduct = {
        name: nameEdit,
        description: descriptionEdit,
        brand: brandEdit,
        weight: weightEdit,
        unit: stringToArray(unitEdit, '2') === null ? obj.unit : stringToArray(unitEdit, '2'),
        UnitId: stringToArray(unitEdit, '1') === null ? obj.UnitId : stringToArray(unitEdit, '1') ,
        category: stringToArray(categoryEdit, '2') === null ? obj.category : stringToArray(categoryEdit, '2'),
        CategoryId: stringToArray(categoryEdit, '1') === null ? obj.CategoryId : stringToArray(categoryEdit, '1'),
        supplier: stringToArray(supplierEdit, '2') === null ? obj.supplier : stringToArray(supplierEdit, '2'),
        SupplierId: stringToArray(supplierEdit, '1') === null ? obj.SupplierId : stringToArray(supplierEdit, '1'),
        price: priceEdit,
        amount: amountEdit,
        total: totalEdit,
        manufacturing_date: manufacturing_dateEdit,
        expiration_date: expiration_dateEdit
      };

      console.log(obj.manufacturing_date)
      console.log(manufacturing_dateEdit)

      setTimeout( async () => {
        
        await httpRequest("UPDATE", newProduct, obj.id)
        setIsSubmittingEdit(false)
        window.location.reload(true);
      }, "2000");
      
      

    }

    const stringToArray = (valueStr, order) =>
    {
      const array = valueStr.split('-');

      if(array.length === 1)
      {
        return null
      }
      console.log(array)

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


    return (
      <>
        <section className="editModal rounded mt-5 w-100">
        <h1>Atualização - Produto</h1>
        <form className="d-flex col-12 row" onSubmit={handleSubmit(Update)} >
            <div className="col-lg-3 col-12">
            <label htmlFor="name">Nome</label>
              <input className="px-2 d-block w-100"
                value={nameEdit}
                onChange={(e) => setNameEdit(e.target.value)}
              />
            </div>
            <div className="col-lg-3 col-12">
            <label htmlFor="description">Descrição</label>
              <input className="px-2 d-block w-100"
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}></input>
            </div>

            <div className="col-lg-3 col-12">
            <label htmlFor="brand">Marca</label>
              <input className="px-2 d-block w-100"
                value={brandEdit}
                onChange={(e) => setBrandEdit(e.target.value)}></input>
            </div>

            <div className="col-lg-3 col-12">
            <label htmlFor="weight">Peso (g)</label>
              <input className="px-2 d-block w-100"
                defaultValue={weightEdit}
                onChange={(e) => setWeightEdit(e.target.value)}></input>
            </div>

            <div className="col-lg-3 col-12">
            <label htmlFor="weight">Unidade de medida</label>
               <select name="" id=""
               className="px-2 d-block w-100"
               onChange={(e) => setUnitEdit(e.target.value)}>
                {units && 
                  units.map( (item)=>( 
                    item.id == unitIdEdit
                    ?
                    <option selected={true} key={item.id} value={`${item.id}-${item.name}`}>{item.name} - {item.description}</option>
                    :
                    <option key={item.id} value={`${item.id}-${item.name}`}>{item.name} - {item.description}</option>
                ) 
                )}
                <option value=""></option>
              </select>
            </div>

            <div className="col-lg-3 col-12">
            <label htmlFor="weight">Categoria</label>
              <select name="" id="" 
                onChange={(e)=>{setCategoryEdit(e.target.value)}}
                >
                <option value=""></option>
                  {categorys && 
                    categorys.map( (item)=>(
                        item.id == categoryIdEdit
                        ?
                        <option selected={true} key={item.id} value={`${item.id}-${item.name}`}>{`${item.id} ${item.name}` }</option>
                        :
                         <option key={item.id} value={`${item.id}-${item.name}`}>{`${item.id} ${item.name}` }</option>
                    ) 
                  )}
              </select>
             
            </div>

            <div className="col-lg col-6">
            <label htmlFor="weight">Fornecedor</label>
               <select name="" id="" 
               className="px-2 d-block w-100"
               onChange={(e) => setSupplierEdit(e.target.value)}>
                {suppliers && 
                  suppliers.map( (item)=>(
                    item.id == supplierIdEdit
                    ?
                    <option selected={true} key={item.id} value={`${item.id}-${item.name}`}> {item.id} - {item.name}</option>
                    :
                    <option key={item.id} value={`${item.id}-${item.name}`}> {item.id} - {item.name}</option>
                  ) 
                )}
                <option value=""></option>
              </select>
            </div>

            <div className="col-lg-3 col-12">
            <label htmlFor="price">Preço</label>
              <input className="px-2 d-block w-100"
                value={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}></input>
            </div>

            <div className="col-lg-3 col-12">
              <label htmlFor="price">Quant. tot. Estoque</label>
              <input className="px-2 d-block w-100" 
                value={amountEdit}
                onChange={(e) => setAmountEdit(e.target.value)}></input>
            </div>

            <div className="col-lg-3 col-12">
              <label htmlFor="price">Saldo total Estoque</label>
               <input className="px-2 d-block w-100"
                value={totalEdit}
                onChange={()=>{}}></input>
            </div>
           
            <div className="col-lg col-12">
            <label htmlFor="manufacturing_date">Fabricação</label>
              <input className="px-2 d-block w-100" type="date"
                value={manufacturing_dateEdit}
                onChange={(e) => setManufacturing_dateEdit(e.target.value)}></input>
            </div>
            <div className="col-lg col-12">
            <label htmlFor="expiration_date">Validade</label>
              <input className="px-2 d-block w-100" type="date" 
                value={expiration_dateEdit}
                onChange={(e) => setExpiration_dateEdit(e.target.value)}></input>
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
