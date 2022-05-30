import axios from 'axios';
import { React, useContext, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import logo from './assets/logo.png';
import UserContext from './contexts/UserContext';
import { ThreeDots } from "react-loader-spinner";

export default function Home() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function signIn(event) {

        event.preventDefault();

        const body = {
            email: email,
            password: password
        }
        setLoading(true);
        const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', body);

        request.then((obj) => success(obj));

        request.catch((err) => {
            if (err.response.status === 401) {
                alert("Email ou senha inválidos, tente novamente.");
            }
            setLoading(false);
        });
    }

    const { setUserInfo } = useContext(UserContext);

    function success(obj) {
        setUserInfo({ ...obj.data });
        setLoading(false);
        navigate('/hoje');
    }

    return (
        <Container>
            <img src={logo} alt='Logo Trackit' />
            <form onSubmit={signIn}>
                <input type='email' placeholder='email' value={email} onChange={e => setEmail(e.target.value)} disabled={loading} required />
                <input type='password' placeholder='senha' value={password} onChange={e => setPassword(e.target.value)} disabled={loading} required />
                <Button disabled={loading} type='submit'>{loading ? <ThreeDots color="white" /> : "Entrar"}</Button>
            </form>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 926px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    font-family: 'Lexend Deca', sans-serif;

    img {
        margin-top: 68px;
        margin-bottom: 35px;
    }

    form {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    input {
        width: 80%;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 18px;
        color: #DBDBDB;
        padding-left: 11px;
        margin-top: 6px;
        font-family: 'Lexend Deca', sans-serif;
    }

    a {
        margin-top: 25px;
        text-decoration: none;
        font-size: 14px;
        color: #52B6FF;
    }
`;

const Button = styled.button`
    width: 83.5%;
    height: 45px;
    background-color: #52B6FF;
    border-radius: 5px;
    border: none;
    margin-top: 6px;
    font-size: 21px;
    color: #FFFFFF;
    font-family: 'Lexend Deca', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
`;