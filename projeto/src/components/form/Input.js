import style from "./Input.module.css";

function Input({ text, type, name, handleOnChange, placeholder, value }) {
  return (
    <div div className={style.form_control}>
      
        <label htmlFor={name}>{text}</label>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          OnChange={handleOnChange}
          value={value}
        />
      
    </div>
  );
}

export default Input;
