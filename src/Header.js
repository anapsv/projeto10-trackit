import trackit from './assets/TrackIt.png';
import styled from 'styled-components';
import UserContext from './contexts/UserContext';
import { useContext } from 'react';

export default function Header() {
    
    const { userInfo } = useContext(UserContext);

    return (
        <Container>
            <img src={trackit} alt='TrackIt' />
            <Icone src={userInfo.image} alt='Ícone do usuário' />
        </ Container>
    );
}

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    background-color: #126BA5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 18px;
    padding-right: 18px;
    position: fixed;
    top: 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    z-index: 1;
`;

const Icone = styled.img`
    height: 51px;
    width: 51px;
    border-radius: 98px;
`;