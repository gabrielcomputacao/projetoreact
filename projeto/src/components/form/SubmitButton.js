import style from "./SubmitButton.module.css"

function SubmitButton(props){

    return (
        <div >
            <button className={style.btn}>{props.text}</button>
        </div>
    )
}

export default SubmitButton