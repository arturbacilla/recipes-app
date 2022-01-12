import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import teamLogo from '../../images/team_logo.png';

export default function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = ({ target }) => {
    const { id, value } = target;
    if (id === 'user') {
      setLogin(value);
    } else {
      setPassword(value);
    }
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: login }));
  };

  useEffect(() => {
    const testeLogin = /\S+@\S+\.\S+/;
    const magic = 7;
    const teste = testeLogin.test(login) && password.length >= magic;
    setIsDisabled(!teste);
  }, [login, password]);

  return (
    <main className="login">
      <label htmlFor="user">
        Usuário
        <input id="user" data-testid="email-input" onChange={ handleChange } />
      </label>
      <label htmlFor="password">
        Senha
        <input
          id="password"
          type="password"
          data-testid="password-input"
          onChange={ handleChange }
        />
      </label>
      <Link to="/comidas">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </Link>
      <div className="login-footer">
        <span>
          <a href="https://linktr.ee/testbreakers">Por TestBreakers </a>
          <img className="teamLogo" src={ teamLogo } alt="" />
        </span>

      </div>
    </main>
  );
}
