
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useUnit } from '../../hooks/useUnit';

export const Edit = ({ obj }) => {
    const { handleSubmit } = useForm();
    const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [blocked, setBlocked] = useState('2')

    const {httpRequest} = useUnit();

    useEffect(()=>{
        setName(obj.name)
        setDescription(obj.description)
        if(obj.blocked !== null)
        {
          setBlocked(obj.blocked)
        }
    }, [obj])


    const Update = async () => {
      setIsSubmittingEdit(true)
      const unit = {
       name, description, blocked
      };

      setTimeout( async () => {
       await httpRequest("UPDATE", unit, obj.id)
       setIsSubmittingEdit(false)
       window.location.reload(true);
      }, "3000");
      
      
      
    };

    return (
      <>
        <section className="editModal rounded mt-5">
          <form className="row" onSubmit={handleSubmit(Update)} >
            <div className="col-12">
              <label htmlFor="name">Nome</label>
              <input className="px-2 d-block w-100"
              defaultValue={name}
              onChange={(e)=>{setName(e.target.value)}}
              ></input>
            </div>
            <div className="col-12">
              <label htmlFor="brand">Descrição</label>
              <input className="px-2 d-block w-100"
              defaultValue={description}
              onChange={(e)=>{setDescription(e.target.value)}}
              ></input>
            </div>
            <div className="col-12">
              <label htmlFor="brand">Bloqueado</label>
              <select value={blocked} 
              onChange={(e)=>{setBlocked(e.target.value)}}
              >
                <option value="1">Sim</option>
                <option value="2">Não</option>
              </select>
            </div>
          
            <div className="col-12 mt-4">
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