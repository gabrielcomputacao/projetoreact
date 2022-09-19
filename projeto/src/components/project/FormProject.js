import {useEffect, useState} from "react"

import style from "./FormProject.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

function FormProject({ handlerSubmit,btnText, projectData}) {

  const [categories,setCategories] = useState([])
  /* hoock tanto para edicao quadno para postagem de novos projetos
    ao setar o useState se vier algum dado ele seta o hook se nao
    ele seta como objeto vazio que sera um post criado agora e nao um
    antigo editado
  */
  const [project , setProjects] = useState( projectData || {})


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

  const submit = (e)=>{
    e.preventDefault()
    handlerSubmit(project)
  }

  

  return (
    <form onSubmit={submit} className={style.formulario}>
      <Input text="Nome do Projeto:" type="text" placeholder="digite nome do projeto" name="name"/>
      <Input  text="Orçamento do Projeto:" type="number" placeholder="total a gastar" name="budget"/>
      <Select name="category_id" text="Insira uma categoria" options={categories} />
      <SubmitButton text={btnText}/>
    </form>
  );
}

export default FormProject;
