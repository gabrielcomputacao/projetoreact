import FormProject from "../project/FormProject"

import styles from "./Project.module.css"

function Project(){
    return(
        <div className={styles.project_container}>
            <h1>Criar Projeto</h1>
            <p>
                Crie seu projeto e o orçamento
            </p>
            <FormProject btnText="Criar Projeto"/>
        </div>
    )

}

export default Project