import { useEffect, useState } from "react"
import api from '../utils/api'

export const useSupplier = () =>
{
    const [method, setMethod] = useState('GET');
    const [supplier, setSupplier] = useState(null);
    const [data, setData] = useState({});
    const [updateStatus, setUpdateStatus] = useState(false); // atualizar fornecedor
    const [id, setId] = useState('')


    const httpRequest = (paramMethod, paramData, id = '') =>{
        if(paramMethod === "POST")
        {
            setMethod(paramMethod);
            setData(paramData);
        }
        if(paramMethod === "UPDATE")
        {
            setMethod(paramMethod)
            setData(paramData)
            setId(id)
        }
        if(paramMethod === "DELETE")
        {
            setMethod(paramMethod)
            setId(id)
        }
    }

    useEffect(() => { // Get Produtos
        const fetchData = async () => {
            try{
                const res = await fetch('http://localhost:3000/supplier/get')
                const json = await res.json();
                setSupplier(json.suppliers)
            }
            catch(error)
            {

            }
        }
        fetchData()
      }, [method])


    useEffect( ()=>{
        const requestSupplier = async () =>
        {   
            if(method === "POST")
            {

                try{
                    const res = await api.post('/supplier/post', data);
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
                    const res = await api.put(`/supplier/put/${id}`, data);
                    console.log(res);
                }
                catch(error)
                {
                    console.log(error)
                }

                setMethod("GET");
            }
            else if(method === "DELETE")
            {
                try{
                    const res = await api.delete(`/supplier/delete/${id}`);
                    console.log(res);
                }
                catch(error)
                {
                    console.log(error)
                }

                setMethod("GET");
            }
      
        }
        requestSupplier();

    }, [method]);

    
    return {httpRequest, supplier, setSupplier, updateStatus, setUpdateStatus}
}