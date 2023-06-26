
// criar context
import { createContext, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth';

const Context = createContext();

function UserProvider({children})
{
    const {register, update, deleteUser, authenticated, userId, userName, userPermission, logout, responseText} = useAuth()
    const [messageResponseText, setMessageResponseText] = useState('');

    return <Context.Provider value={{register, update, deleteUser, authenticated, userId, userName, userPermission, logout, messageResponseText, setMessageResponseText, responseText}}>{children}</Context.Provider>

}

export {Context, UserProvider}