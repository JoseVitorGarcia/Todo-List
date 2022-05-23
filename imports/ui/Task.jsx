import React from 'react';
import { useState } from 'react';
import { TaskForm } from './TaskForm';

export const Task = ({ task, onCheckboxClick, onDeleteClick, onEditClick }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  })
  const submitUpdate = e => {
    e.preventDefault();
    onEditClick(edit.id, edit.value)
    console.log(edit.value)
    setEdit({
      id: null,
      value: ''
    })
  }
  if (edit.id) {
    return <TaskForm edit={edit} setEdit={setEdit} onSubmit={submitUpdate} />

  }
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span>{task.text}</span>
      <button onClick={() => onDeleteClick(task)}>Excluir</button>
      <button onClick={() => setEdit({ id: task._id, value: task.text })}>Editar</button>

    </li>
  );
};