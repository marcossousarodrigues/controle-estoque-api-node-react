
import {useEffect, useState} from 'react';
import api from '../utils/api'
export const useProduct = () =>{
    const [method, setMethod] = useState('GET');
    const [products, setProducts] = useState('');
    const [dataUpdateProduct, setDataUpdateProduct] = useState('')
    const [data, setData] = useState({});
    const [updateStatus, setUpdateStatus] = useState(false); // atualizar produtos
    const [id, setId] = useState('')
    const httpRequest = (paramMethod, paramData, id = '') =>{
        if(paramMethod === "POST")
        {
            setMethod(paramMethod);
            setData(paramData);
        }
        if(paramMethod === "UPDATE")
        {
            setMethod(paramMethod);
            setData(paramData);
            setId(id)
        }
    
    }

    useEffect(() => { // Get Produtos
        const fetchData = async () => {
            try{
                const res = await fetch('http://localhost:3000/produto-mercado')
                const json = await res.json();
                setProducts(json)
            }
            catch(error)
            {

            }
        }
        fetchData()
      }, [method, updateStatus])

    useEffect( ()=>{
        const requestUser = async () =>
        {   
            if(method === "POST")
            {

                try{
                    const res = await api.post('/produto-mercado', data);
                    console.log(res);
                    console.log("entrou no try")
                }
                catch(error)
                {
                    console.log(error)
                    console.log('entrou no catch')
                }

                setMethod("GET");
              
            }
            else if(method === "UPDATE")
            {
                try{
                    const res = await api.put(`/produto-mercado/${id}`, data);
                    await setDataUpdateProduct(res.data)
                }
                catch(error)
                {
                    console.log(error)
                    console.log('entrou no catch')
                }

                setMethod("GET");
            }
        }
        requestUser();

    }, [method]);

    
    return {httpRequest, products, setProducts, updateStatus, setUpdateStatus, dataUpdateProduct}
}