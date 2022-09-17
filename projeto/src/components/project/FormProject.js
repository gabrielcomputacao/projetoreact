import style from "./FormProject.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

function FormProject({btnText}) {
  return (
    <form className={style.formulario}>
      <Input text="Nome do Projeto:" type="text" placeholder="digite nome do projeto" name="name"/>
      <Input  text="Orçamento do Projeto:" type="number" placeholder="total a gastar" name="budget"/>
      <Select name="category_id" text="Insira uma categoria" />
      <SubmitButton text={btnText}/>
    </form>
  );
}

export default FormProject;
