import styles from "./EditProject.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import FormProject from "../project/FormProject";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard"

import { parse, v4 as uuidv4 } from "uuid";

function EditProject() {
  /* pega os paramentros que vem pela url, nessa caso especifico está 
        pegando o id
    */
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const [newService, setNewService] = useState([]);
  /* 
    inicialmente ele nao exibe o formulario de edição do projeto ele exibe os dados
    do projeto por isso setado para false
  */
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);

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
        setNewService(data.services);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function createService(project) {
    const lastService = project.services[project.services.length - 1];

    /* extensao que da um ID aleatorio para a variavel */
    lastService.id = uuidv4();

    /* dentro do serviço tambem tem um custo */
    const lastServiceCost = lastService.cost;

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(project.budget)) {
      setMessage("ultrapassou o orçamento");
      setType("error");
      project.services.pop();
      return false;
    }

    project.cost = newCost;

    fetch(`http://localhost:5002/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
       setShowServiceForm(false)
      })
      .catch((err) => console.log(err));
  }

  function toggleProjectForm() {
    /* 
        Seta como o contratio do showProjectForm
        Se ele estiver false seta como o contrario entao true
        se ele estiver true transforma em false e set no state
    */
    setShowProjectForm(!showProjectForm);
  }
  function toggleServiceForm() {
    /* 
        Seta como o contratio do showProjectForm
        Se ele estiver false seta como o contrario entao true
        se ele estiver true transforma em false e set no state
    */
    setShowServiceForm(!showServiceForm);
  }

  function editPost(project) {
    setMessage("");

    //budget validation
    console.log(project);

    if (project.budget < project.cost) {
      setMessage("Os custos não podem passar o orçamento!!");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5002/projects/${project.id}`, {
      /* metodo disponivel, só altera o que foi mudado ao inves de dar um update */
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
      /* enviando informações em formato textual pois serao informaçoes para atualizar o projeto */
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(true);
        setMessage("Editado com Sucesso");
        setType("sucess");
      })
      .catch((err) => console.log(err));
  }


  function removeService(id,cost){

    const servicesUpdate = project.services.filter(
      (service) => service.id !== id
    )

    const projectUpdate = project

    projectUpdate.services = servicesUpdate

     projectUpdate.cost =  parseFloat(projectUpdate.cost) - parseFloat(cost)

     fetch(`http://localhost:5002/projects/${projectUpdate.id}`,{
      method:"PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(projectUpdate)
     })
     .then(res => res.json())
     .then( data =>{
      setProject(projectUpdate)
      setNewService(servicesUpdate)
      setMessage("serviço removido com sucesso")
     })
     .catch(err => console.log(err))

  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {showProjectForm ? "Editar Projeto" : "Fechar"}
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
                  <FormProject
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    projectData={project}
                  />
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

            <div className={styles.service_form_container}>
              <h2>Adicione um serviço</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
              </button>
            </div>
            <div className={styles.project_info}>
              {showServiceForm && (
                <ServiceForm
                  handleSubmit={createService}
                  textBtn="Adicionar Serviço"
                  projectData={project}
                />
              )}
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
                {
                  newService.length > 0 ? 
                    newService.map((element,index) => (
                        <ServiceCard 
                         id={element.id}
                         name={element.name}
                         cost={element.cost}
                         description={element.description}
                         key={element.id}
                         handleRemove={removeService}
                        />
                    ))
                  :
                  (
                    <p>Não a serviços para mostrar.</p>
                  )
                }
              
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default EditProject;
