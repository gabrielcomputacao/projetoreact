import {useEffect, useState} from "react"

import style from "./FormProject.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

function FormProject({btnText}) {

  const [categories,setCategories] = useState([])

  useEffect(()=>{
    fetch("http://localhost:5002/categories" , {
    method:'GET',
    headers:{
      'Content-Type': 'aplication/json',
    }
  })
  .then((res)=>{ 
          console.log(res)
          return res.json()
  })
  .then((data)=>{
    setCategories(data)
  })
  .catch((err)=> console.log(err))
  },[])

  

  return (
    <form className={style.formulario}>
      <Input text="Nome do Projeto:" type="text" placeholder="digite nome do projeto" name="name"/>
      <Input  text="Orçamento do Projeto:" type="number" placeholder="total a gastar" name="budget"/>
      <Select name="category_id" text="Insira uma categoria" options={categories} />
      <SubmitButton text={btnText}/>
    </form>
  );
}

export default FormProject;
