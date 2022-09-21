import { useLocation } from "react-router-dom"

import Message from "../layout/Message"

function ListaProject(){

    const location = useLocation()



    return (
        <div>
            <h1>Lista de Projetos</h1>
            <Message  msg={"Mensagem!!"} type="sucess" />
        </div>
    )
}

export default ListaProject