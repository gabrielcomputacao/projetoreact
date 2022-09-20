import { useEffect, useState } from "react";

import style from "./FormProject.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

function FormProject({ handleSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([]);
  /* hoock tanto para edicao quadno para postagem de novos projetos
    ao setar o useState se vier algum dado ele seta o hook se nao
    ele seta como objeto vazio que sera um post criado agora e nao um
    antigo editado
  */
  const [project, setProjects] = useState(projectData || {});

  useEffect(() => {
    fetch("http://localhost:5002/categories", {
      method: "GET",
      headers: {
        "Content-Type": "aplication/json",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project);
    console.log(project)
  };

  function handleChange(e){
    setProjects({...project, [e.target.name]: e.target.value})
    console.log(project)
  }

  function handleSelect(e){
      setProjects({...project,
      category:{
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      }
      })
  }


  return (
    <form onSubmit={submit} className={style.formulario}>
      <Input
        text="Nome do Projeto:"
        type="text"
        placeholder="digite nome do projeto"
        name="name"
        handleOnChange={handleChange}
        value={project.name ? project.name : ""}
      />
      <Input
        text="Orçamento do Projeto:"
        type="number"
        placeholder="total a gastar"
        name="budget"
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ""}
      />
      <Select
        name="category_id"
        text="Insira uma categoria"
        options={categories}
        handleOnChange={handleSelect}
        value={project.category ? project.category.id : ""}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default FormProject;
