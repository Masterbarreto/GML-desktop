import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../styles/LoginScreen.css';
import logoImage from '../assets/icon.png';

interface LoginScreenProps {
  onLoginSuccess: (type: string) => void; // Define que onLoginSuccess é uma função que recebe um string
}

// Validação do formulário usando Yup
const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Informe seu email"),
  password: yup.string().required("Informe sua senha").min(6, "A senha deve ter pelo menos 6 dígitos"),
});

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const showAlert = (message: string) => {
    window.alert(message);
  };

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await fetch("http://192.168.0.89:4000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      console.log('Resposta da API:', response);

      if (response.ok) {
        const userData = await response.json();
        console.log('Dados do usuário:', userData);
        onLoginSuccess(userData.type); // Chama a função onLoginSuccess com o tipo do usuário
        reset(); // Limpa os campos após o login
      } else {
        const errorData = await response.json();
        console.error('Erro ao fazer login:', errorData);
        if (response.status === 401) {
          showAlert('Email ou senha incorretos.');
        } else {
          showAlert('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
        }
        throw new Error('Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      reset(); // Limpa os campos em caso de erro
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <img src={logoImage} alt="Logo do Aplicativo" /> 
      </div>

      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <input
                {...field}
                placeholder="Email"
                className={errors.email ? 'input error' : 'input'}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <input
                {...field}
                type="password"
                placeholder="Senha"
                className={errors.password ? 'input error' : 'input'}
              />
            )}
          />
          <button type="submit" className="button">Entrar</button>
          <button type="button" onClick={() => {/* Lógica para trocar para a tela de cadastro */}} className="button-outline">
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
