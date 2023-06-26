import { useEffect, useState } from "react"
import api from '../utils/api'

export const useUnit = () =>
{
    const [method, setMethod] = useState('GET');
    const [unit, setUnit] = useState(null);
    const [data, setData] = useState({});
    const [updateStatus, setUpdateStatus] = useState(false); // atualizar unidade
    const [id, setId] = useState('')

    const httpRequest = (paramMethod, paramData, id ='') =>{
        if(paramMethod === "POST")
        {
            setMethod(paramMethod);
            setData(paramData);
        }
        else if(paramMethod === "UPDATE")
        {
            setMethod(paramMethod);
            setData(paramData);
            setId(id);
        }
    
        else if(paramMethod === "DELETE")
        {
            setMethod(paramMethod);
            setId(id);
        }
    }

    useEffect(() => { // Get Produtos
        const fetchData = async () => {
            try{
                const res = await fetch('http://localhost:3000/unit/get')
                const json = await res.json();
                setUnit(json.units)
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
                    const res = await api.post('/unit/post', data);
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
                    const res = await api.put(`/unit/put/${id}`, data);
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
                    const res = await api.delete(`/unit/delete/${id}`);
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

    
    return {httpRequest, unit, setUnit, updateStatus, setUpdateStatus}
}