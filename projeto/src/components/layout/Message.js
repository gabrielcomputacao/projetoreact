import { useState, useEffect } from "react";

import styles from "./Message.module.css";

function Message({ type, msg }) {
  const [visible, setVisible] = useState(false);

  useEffect(()=>{
    /* entrou no componente confere se a mensamge existe, se nao exister ela retorna e sai do useeffect
    deixando o visible como false e nao mostrando a caixa de mensagem
    */
  
    if(!msg){
        setVisible(false)
        return
    }
    
    /* se tiver mensagem seta como true */
    setVisible(true)
    
    /* depois de exibir a mensagem ele espera 3000 milisegundos e seta como false a mensagem para ela
        sumir
    */
    let timer= setTimeout(()=>{
        setVisible(false)
    } ,3000)

    /* para finalizar corretamente tem que mandar um return dentro do useeffect */
    return ()=>{ clearTimeout(timer)}

  },[msg])

  return (
    /* maneira de fazer classes de css dinamica ,
        a classe message vai ser fixa para esse componente
        styles[type] depende da prop que vai ser vinda do componente pai
        por isso ela e dinamica
        */
    <>
      {visible && (
        <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
      )}
    </>
  );
}

export default Message;
