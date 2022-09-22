import { useLocation } from "react-router-dom"

import Message from "../layout/Message"

function ListaProject(){

    const location = useLocation()
    let message=""
    
    if (location.state){
        message = location.state.message
        
    }


    return (
        <div>
            <h1>Lista de Projetos</h1>
            {message && <Message  msg={message} type="sucess" />}
            
        </div>
    )
}

export default ListaProject