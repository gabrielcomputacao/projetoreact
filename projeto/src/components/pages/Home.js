import styles from "./Home.module.css"
import saving from "../../img/saving.svg"
import LinkButton from "../layout/LinkButton"


function Home(){
    return(
        <section className={styles.home_container}>
            <h1>Bem Vinda ao <span>Cost</span> </h1>
            <p>
                Comece a gerenciar todos seus projetos
            </p>
            <LinkButton to="/projects" text="Novo Projeto" />
            <img src={saving} alt="Construa seus Projetos" title="Home dos Projetos" />
        </section>
    )

}


export default Home