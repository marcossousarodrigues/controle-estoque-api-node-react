
import api from '../utils/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = ()=>
{
    const [authenticated, setAuthenticated] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState('');
    const [userPermission, setPermission] = useState('');
    const [responseText, setResponseText] = useState('')
    const navigate = useNavigate();


    useEffect( ()=>{
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('userId');
        const name = localStorage.getItem('userName');
        const permission = localStorage.getItem('userPermission');

        if(token)
        {  
            setAuthenticated(true)
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)} `
            setUserName(name)
        }
        else
        {
            setAuthenticated(false)
            navigate('/')
        }
        if(id)
        {  
            setUserId(id)
        }
        
        if(permission)
        {
            
            setPermission(permission);
        }

    }, [authenticated]);



    async function register(user)
    {
        try
        {
            // const data = await api.post('/user/post', user).
            // then( (response) =>{ return response})
            // console.log(data)

            const formData = new FormData()

            await Object.keys(user).forEach( (key) =>
            formData.append(key, user[key])
            )

            const data = await api.post(`/user/post`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            }).then( (response) =>{
                console.log(response.data)
                return response.data
            }).catch((error) =>{
            console.log('error')
            })

            // const authUserValid = await authUser(data.data
        }
        catch(error)
        {
            console.log(error)
        }
      
    }

    async function login(user)
    {
        try
        {
            const data = await api.post('/user/login', user)
            .then((response)=>{return response})

            const authUserValid = await authUser(data.data)

            if(!authUserValid)
            {   
                return {valid: false, message: data.data.message}
            }

            return {valid: true}

        }
        catch(error)
        {
            console.log(error)
        }
        
    }

    
    async function update(user)
    {
        try
        {
            
            const formData = new FormData()

            await Object.keys(user).forEach( (key) =>
            formData.append(key, user[key])
            )

            const data = await api.patch(`/user/edit/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            }).then( (response) =>{
                console.log(response.data)
                return response.data

            }).catch((error) =>{
            console.log('error')
            })

            // const authUserValid = await authUser(data.data)

            // console.log(data)

            // return authUserValid

        }
        catch(error)
        {
            console.log(error)
        }
        
    }

    async function userUpdatePassword(user)
    {   
        try
        {
            const data = await api.patch(`schedule/user/updatePassword`, user)
            .then((response)=>{return response})

            const authUserValid = await authUser(data.data)

            console.log(data)

            return authUserValid

        }
        catch(error)
        {
            console.log(error)
        }
    }

    async function authUser(data)
    {
        if(data.error && data.error == 'error')
        {
            return false
        }
        else
        {
            localStorage.setItem('token', JSON.stringify(data.token))
            localStorage.setItem('userId', JSON.stringify(data.userId))
            localStorage.setItem('userName', JSON.stringify(data.name))
            localStorage.setItem('userPermission', JSON.stringify(data.permission))
            console.log(data.name)

            await setAuthenticated(true)

            navigate('/product/create');
            return true
        }
       
    }

    function logout()
    {
        setAuthenticated(false)
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        // api.defaults.headers.Authorization = undefined; 
        navigate('/')
    }

    const deleteUser = async (id) =>{
        
        try
        {
           const res = await api.delete(`/user/delete/${id}`)
            console.log(res)
        }
        catch(error)
        {

        }
    }

    return{ register, login, update, deleteUser, userUpdatePassword, authenticated, userId, userName, userPermission , logout, responseText }
}