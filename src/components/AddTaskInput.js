import React from "react";
import { useState } from "react";
function AddTask(props) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName("");
  }
  function handleChange(e) {
    setName(e.target.value);
  }
  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="form ">
        <input
          maxLength="44"
          value={name}
          onChange={handleChange}
          className="form__input box"
          placeholder="Create a new todo.."
          required
        ></input>
      </form>
    </div>
  );
}

export default AddTask;
