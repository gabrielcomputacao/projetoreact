import styles from "../project/FormProject.module.css";

import {useState} from "react"

import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton";


function ServiceForm({handleSubmit,textBtn,projectData }){

    /* começa com objeto vazio */
    const [service,setService] = useState({})

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        /* ... sprad operador para pegar o objeto atual */
        /* nome entre barras [] ele está adicionando um propriedade ao objeto, entao o
        objeto targetado vai usar o name dele e vai colocar como uma propriedade do objeto
        service, entao vc pega o objeto targetado e o valor que ele foi preenchido voce
        colocar como o valor do objeto que esta criando
        
        */
        setService({...service , 
            [e.target.name]:e.target.value
        })
    }

    return (
        <form onSubmit={submit} className={styles.formulario} >
            <Input
                type="text"
                text="nome do serviço"
                name="name"
                placeholder="insira o nome do serviço"
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                text="Custo do serviço"
                name="cost"
                placeholder="insira o valor total"
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Descrição do serviço"
                name="description"
                placeholder="Descreva o serviço"
                handleOnChange={handleChange}
            />
            <SubmitButton  text={textBtn} />
        </form>
    )
}


export default ServiceForm

