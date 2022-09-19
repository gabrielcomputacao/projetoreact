import FormProject from "../project/FormProject"
import { useNavigate} from "react-router-dom"
import styles from "./Project.module.css"

function Project(){
    /* navega progrativamente entre as paginas do projeto, como se fosse um redirect */
    const navigate = useNavigate()

    function createPost(project){
        /* inicializando cost e services */
        project.cost = 0 //custo dos projetos
        project.services = [] //serviços

        fetch("http://localhost:5002/projects" , {
           method:"POST",
           headers:{
            "Content-Type": "application/json"
           } ,
           body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch( err => console.log(err))
    }

    return(
        <div className={styles.project_container}>
            <h1>Criar Projeto</h1>
            <p>
                Crie seu projeto e o orçamento
            </p>
            <FormProject handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )

}

export default Project