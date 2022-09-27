import styles from "./EditProject.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import FormProject from "../project/FormProject";

function EditProject() {
  /* pega os paramentros que vem pela url, nessa caso especifico está 
        pegando o id
    */
  const { id } = useParams();

  const [project, setProject] = useState([]);

  /* 
    inicialmente ele nao exibe o formulario de edição do projeto ele exibe os dados
    do projeto por isso setado para false
  */
  const [showProjectForm, setShowProjectForm] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5002/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function toggleProjectForm() {
    /* 
        Seta como o contratio do showProjectForm
        Se ele estiver false seta como o contrario entao true
        se ele estiver true transforma em false e set no state
    */
    setShowProjectForm(!showProjectForm);
  }


  function editPost(project){
        //budget validation
        console.log(project)

        if(project.budget < project.cost){
            //message
        }

        fetch(`http://localhost:5002/projects/${project.id}` ,
        {
            /* metodo disponivel, só altera o que foi mudado ao inves de dar um update */
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project)
            /* enviando informações em formato textual pois serao informaçoes para atualizar o projeto */
        })
        .then( res => res.json())
        .then( data => {
            setProject(data)
            setShowProjectForm(false)
            //message
        })
        .catch( err => console.log(err))

  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar Projeto" : "Fechar"}
                {/* 
                    se estiver falso o showprojectform ele vai setar o texto do button para editar
                    quando o state passar para verdadeiro ele vai setar para true e vai mudar o valor do texto
                    do button para Fechar
                */}
              </button>
                {/* mesmo como a parte de jsx, se o showproject form estiver false ele mostra
                    o form se estiver true ele mostra os detalhes do projeto
                */}

              {!showProjectForm ? (
                <div className={styles.project_info}>
                 <FormProject handleSubmit={editPost} btnText="Concluir Edição" projectData={project}/>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento:</span>R$ {project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span>R$ {project.cost}
                  </p>
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default EditProject;
