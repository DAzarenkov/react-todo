import {useEffect, useRef} from "react";
import style from "./InputWithLabel.module.css";

function InputWithLabel({todoTitle, handleTitleChange, children}) {

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label className={style.Label} htmlFor="todoTitle">{children}</label>
      <input className={style.Input} ref={inputRef} type="text" id="todoTitle" name="title" value={todoTitle} onChange={handleTitleChange}/>
    </>
  );
}

export default InputWithLabel;
