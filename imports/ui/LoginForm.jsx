import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { UsersCollection } from '/imports/api/Collection';
import { Accounts } from 'meteor/accounts-base';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);

  const loginSubmit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
  };
  const registerSubmit = e => {
    e.preventDefault();
    if (!username.trim()) return;
    Accounts.createUser({
      username: username.trim(),
      createdAt: new Date(),
      password
    });
    setRegistered(false)
  };
  return (
    <form onSubmit={registered ? registerSubmit : loginSubmit} className="login-form">
      <div className="TitleLogin">
        <h1>{registered ? 'Cadastro' : 'Login'}</h1>
      </div>
      <div className="labelInputContainer">
        <label htmlFor="username">Nome de usuário</label>

        <input
          value={username}
          type="text"
          placeholder="Digite seu nome de usuário"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="labelInputContainer">
        <label htmlFor="password">Senha</label>

        <input
          value={password}
          type="password"
          placeholder="Digite sua senha"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <button type="submit">{registered ? 'Cadastrar' : 'Logar'}</button>
      </div>
      {registered ? (
        <p>Deseja fazer login? <a onClick={() => setRegistered(false)}>Clique aqui</a></p>
      ) : (
        <p>Deseja se cadastrar? <a onClick={() => setRegistered(true)}>Clique aqui</a></p>
      )}
    </form>

  );
};