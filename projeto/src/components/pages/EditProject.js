
import styles from "./EditProject.module.css"
import {useParams} from "react-router-dom"
import {useEffect , useState} from "react"
import Loading from "../layout/Loading"
import Container from "../layout/Container"

function EditProject(){
    /* pega os paramentros que vem pela url, nessa caso especifico está 
        pegando o id
    */
    const {id} = useParams()
    

    const [project,setProject] = useState([])

    useEffect( ()=>{
        fetch(`http://localhost:5002/projects/${id}` , {
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then( resp => resp.json())
        .then( data =>{
            setProject(data)
            console.log(data)
        })
        .catch(err => console.log(err))

    } , [id])

    return(
        <>
          { project.name ? (
          
          <div>
                <Container customClass="column"></Container>
                <div>
                    <h1>Projeto: {project.name}</h1>
                    <button>Editar Projeto</button>
                </div>
          </div>
          
          ) : (
            <Loading/>
          ) }          
        </>
    )

}

export default EditProject
