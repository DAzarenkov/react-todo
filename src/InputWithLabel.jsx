import {useEffect, useRef} from "react";

function InputWithLabel({todoTitle, handleTitleChange, children}) {

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input ref={inputRef} type="text" id="todoTitle" name="title" value={todoTitle} onChange={handleTitleChange}/>
    </>
  );
}

export default InputWithLabel;
