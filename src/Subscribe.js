import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import logo from './assets/logo.png';
import { ThreeDots } from "react-loader-spinner";

export default function Subscribe() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    let [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function signUp(event) {

        event.preventDefault();

        const userData = {
            email: email,
            name: name,
            image: image,
            password: password
        }

        console.log(userData);
        setLoading(true);
        const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', userData);

        request.then(() => {
            navigate('/');
        });

        request.catch((err) => {
            if (err.response.status === 409) {
                alert("Usuário já existente. Tente novamente!");
            }
            setLoading(false);
        });
    }

    return (
        <Container>
            <img src={logo} alt='Logo Trackit' />
            <form onSubmit={signUp}>
                <input type='email' placeholder='email' value={email} onChange={e => setEmail(e.target.value)} disabled={loading} required />
                <input type='password' placeholder='senha' value={password} onChange={e => setPassword(e.target.value)} disabled={loading} required />
                <input type='text' placeholder='nome' value={name} onChange={e => setName(e.target.value)} disabled={loading} required />
                <input type='url' placeholder='foto' value={image} onChange={e => setImage(e.target.value)} disabled={loading} required />
                <Button disabled={loading} type='submit'>{loading ? <ThreeDots color="white" /> : "Cadastrar"}</Button>
            </form>
            <Link to="/">Já tem uma conta? Faça login!</Link>
        </ Container>
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