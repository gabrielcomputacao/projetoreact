import { useLocation } from "react-router-dom";

import Message from "../layout/Message";
import style from "./ListaProject.module.css";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from "react";

function ListaProject() {
  const [projects, setProjects] = useState([]);

  const location = useLocation();
  let message = "";

  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    fetch("http://localhost:5002/projects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setProjects(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={style.project_container}>
      <div className={style.title_container}>
        <h1>Lista de Projetos</h1>
        {/* <a href="#">teste</a> */}
        <LinkButton to="/listaProjects" text="Criar Projeto"></LinkButton>
      </div>

      {message && <Message msg={message} type="sucess" />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((element, index) => (
            <ProjectCard
              key={index}
              id={element.id}
              name={element.name}
              budget={element.budget}
              category={element.category}
            />
          ))}
      </Container>
    </div>
  );
}

export default ListaProject;
