import { useEffect, useState } from "react"
import api from '../utils/api'

export const useCategory = () =>
{
    const [method, setMethod] = useState('GET');
    const [category, setCategory] = useState(null);
    const [data, setData] = useState({});
    const [updateStatus, setUpdateStatus] = useState(false); // atualizar categoria
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
                const res = await fetch('http://localhost:3000/category/get')
                const json = await res.json();
                setCategory(json.categorys)
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
                    const res = await api.post('/category/post', data);
                    console.log(res);
                }
                catch(error)
                {
                    console.log(error)
                }

                setMethod("GET");
              
            }
            else if(method === "UPDATE")
            {
                try{
                    const res = await api.put(`/category/put/${id}`, data);
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
                    const res = await api.delete(`/category/delete/${id}`);
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

    
    return {httpRequest, category, setCategory, updateStatus, setUpdateStatus}
}