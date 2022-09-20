import style from "./Select.module.css";

function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className={style.form_control}>
      <label htmlFor={name}>{text}</label>
      <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
        <option>Selecione uma Opção</option>
        {options.map((optionOp) => (
          <option value={optionOp.id} key={optionOp.id}>
            {optionOp.name.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
