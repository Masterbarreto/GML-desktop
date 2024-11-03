import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import '../styles/CadastroScree.css'

const validationSchema = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "As senhas devem corresponder")
        .required("Confirmação de senha é obrigatória"),
    birthdate: yup.date().required("Data de nascimento é obrigatória"),
    cpf: yup.string().length(11, "CPF deve ter 11 dígitos").required("CPF é obrigatório"),
    role: yup.string().oneOf(["Aluno", "Funcionário", "Administrador"], "Tipo de conta inválido").required("Tipo de conta é obrigatório"),
});

const Register = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            birthdate: "",
            cpf: "",
            role: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post("http://192.168.0.89:4000/api/v1/users", {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    age: values.birthdate,
                    cpf: values.cpf,
                    role: values.role,
                });
                
                navigate('/');
                alert(`Usuário criado `);
            } catch (error) {
                console.error("Erro ao criar conta", error.response?.data);
                setErrorMessage(
                    error.response?.data.errors ? error.response.data.errors.join(", ") : "Erro ao criar conta"
                );
            }
        },
    });

    return (
        <div className="register-container">
            <h2>Cadastro</h2>
            <form onSubmit={formik.handleSubmit} className="register-form">
                <div className="form-group">
                    
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                </div>
                <div className="form-group">
                    
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                </div>
                <div className="form-group">
                    
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
                </div>
                <div className="form-group">
                    
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar Senha"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                    />
                    {formik.errors.confirmPassword ? <div className="error">{formik.errors.confirmPassword}</div> : null}
                </div>
                <div className="form-group">
                    
                    <input
                        type="date"
                        name="birthdates"
                        className="Data"
                        onChange={formik.handleChange}
                        value={formik.values.birthdate}
                    />
                    {formik.errors.birthdate ? <div className="error">{formik.errors.birthdate}</div> : null}
                </div>
                <div className="form-group">
                    
                    <input
                        type="text"
                        name="cpf"
                        placeholder="CPF"
                        onChange={formik.handleChange}
                        value={formik.values.cpf}
                    />
                    {formik.errors.cpf ? <div className="error">{formik.errors.cpf}</div> : null}
                </div>
                <div className="form-group">
                    
                    <select
                        name="role"
                        onChange={formik.handleChange}
                        value={formik.values.role}
                    >
                        <option value="">Selecione</option>
                        <option value="Aluno">Aluno</option>
                        <option value="Funcionário">Funcionário</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                    {formik.errors.role ? <div className="error">{formik.errors.role}</div> : null}
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <button type="submit" className="submit-button">Cadastrar</button>
                <button 
                    type="button" 
                    onClick={() => navigate('/')}  // Use o hook useNavigate para redirecionar
                    className="button-outline"
                >
                Voltar
                </button>
            </form>
        </div>
    );
};

export default Register;
