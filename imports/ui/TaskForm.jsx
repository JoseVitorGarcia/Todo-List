import React, { useState } from 'react';
import { TasksCollection,UsersCollection } from '/imports/api/Collection';

export const TaskForm = ({ user, edit, onSubmit, setEdit }) => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!text.trim()) return;

    TasksCollection.insert({
      text: text.trim(),
      createdAt: new Date(),
      userId: user._id
    });

    setText('');
  };

  return (
    <form className="task-form" onSubmit={edit ? onSubmit : handleSubmit}>
      <input
        type="text"
        placeholder="Digite sua tarefa"
        value={edit ? edit.value : text}
        onChange={(e) => edit ? setEdit({ id: edit.id, value: e.target.value }) : setText(e.target.value)}
      />

      <button type="submit">{edit ? 'Alterar': 'Adicionar'}</button>
    </form>
  );
};