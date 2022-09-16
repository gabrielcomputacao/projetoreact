import style from "./FormProject.module.css"
import Input from "../form/Input"
import Select from "../form/Select"
import SubmitButton from "../form/SubmitButton"

function FormProject(){

    return (
        <form className={style.formulario}>
           <Input />
           <Input />
            <Select />
            <SubmitButton />
        </form>
    )

}

export default FormProject