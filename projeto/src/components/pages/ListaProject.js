import { useLocation } from "react-router-dom"

import Message from "../layout/Message"
import style from "./ListaProject.module.css"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"

function ListaProject(){

    const location = useLocation()
    let message=""
    
    if (location.state){
        message = location.state.message
        
    }


    return (
        <div className={style.project_container}>
            <div className={style.title_container}>
              <h1>Lista de Projetos</h1> 
               <a href=""></a>
                <LinkButton  to="/listaProjects"  text="Criar Projeto" ></LinkButton>
            </div>
            
            {message && <Message  msg={message} type="sucess" />}
            <Container customClass="start">
                <p>Projetos..</p>
            </Container>
           
        </div>
    )
}

export default ListaProject