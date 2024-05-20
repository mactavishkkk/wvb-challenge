import React, { useState } from 'react';
import { Button, ButtonDiv, Container, Input, LoginForm } from './style';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/User';

const Logon = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um email válido. (...@email.com)');
      return;
    }

    try {
      const userData = { email, password };
      const response = await login(userData);

      if (response) {
        alert('Login efetuado com sucesso!');
        navigate('/user/home');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Container>
      <LoginForm>
        <h2 style={{ marginBottom: 30, color: '#fff' }}>Login</h2>
        <Input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonDiv>
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={handleRegister}>Register</Button>
        </ButtonDiv>
      </LoginForm>
    </Container>
  );
};

export default Logon;