import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AddNewHabit from './AddNewHabit';
import UserContext from './contexts/UserContext';

function RenderHabits({
    habits, weekdays, getHabits
}) {

    console.log(habits);

    const { userInfo } = useContext(UserContext);
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        }
    }

    function deleteHabit(id) {
        
        const text = "Deletar hábito?"
        if (window.confirm(text) === true) {
            const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);

            promise
                .then(() => {
                    getHabits();
                })
                .catch((error) => {
                    alert(error.data);
                  });
        }
    }

    function getSelectedWeekdays(daysArr) {
        const aux = [];
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < daysArr.length; j++) {
                if (i === daysArr[j]) {
                    aux.push(true);
                }
            }
            if (aux.length < i + 1) aux.push(false);
        }
        return aux;
    }

    const selectedWeekdays = habits.map((el) => getSelectedWeekdays(el.days));

    // eslint-disable-next-line
    useEffect(() => getHabits(), []);
    if (habits === 0) {
        return (
            <NoHabits>
                Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
                começar a trackear!
            </NoHabits>
        );
    } else {
        return (
            <>
                {habits.map((i, el) => {
                    return (
                        <Habit key={i.id}>
                            <p>{i.name}</p>
                            <DaysDiv>
                                {weekdays.map((e, index) => (
                                    <Day selected={selectedWeekdays[el][index]} key={index} >
                                        {e.name}
                                    </Day>
                                ))}
                            </DaysDiv>
                            <ion-icon name="trash-outline" onClick={() => deleteHabit(i.id)} ></ion-icon>
                        </Habit>
                    );
                })}
            </>
        );
    }
}

export default function Habits() {

    const navigate = useNavigate();

    const { userInfo } = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [showAddNewHabit, setShowAddNewHabit] = useState(false);
    const [name, setName] = useState('');
    let days = [];
    const [weekdays, setWeekdays] = useState([
        { name: 'D', selected: false },
        { name: 'S', selected: false },
        { name: 'T', selected: false },
        { name: 'Q', selected: false },
        { name: 'Q', selected: false },
        { name: 'S', selected: false },
        { name: 'S', selected: false },
    ]);

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        }
    }

    function getHabits() {

        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', config);

        request
            .then((response) => {
                setHabits([...response.data]);
            })
            .catch((err) => {
                const status = err.response.request.status;
                console.log(status);
                if (status === 401) {
                    alert('Login expirado!');
                    navigate('/');
                }
            });
    }

    // eslint-disable-next-line
    useEffect(() => getHabits(), []);

    return (
        <Container>
            <DivTop>
                <h1>Meus hábitos</h1>
                <AddHabitButton onClick={() => setShowAddNewHabit(!showAddNewHabit)}>+</AddHabitButton>
            </DivTop>
            {showAddNewHabit ? (<AddNewHabit
                setShowAddNewHabit={setShowAddNewHabit}
                name={name}
                setName={setName}
                days={days}
                weekdays={weekdays}
                setWeekdays={setWeekdays}
                getHabits={getHabits}
            />) : ('')}
            <RenderHabits
                habits={habits}
                weekdays={weekdays}
                getHabits={getHabits}
            />
        </Container>
    );
}

const Container = styled.div`
    box-sizing: border-box;
    margin-top: 80px;
    padding-bottom: 120px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: #E5E5E5;
`;

const DivTop = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    color: #126BA5;
    font-size: 23px;
    margin-bottom: 70px;

    h1{
        position: absolute;
        top: 98px;
    }

`;

const AddHabitButton = styled.button`
    width: 40px;
    height: 40px;
    background-color: #52B6FF;
    color: #FFFFFF;
    font-size: 26px;
    text-align: center;
    position: absolute;
    top: 90px;
    right: 18px;
    border-radius: 5px;
    border: none;
`;

const NoHabits = styled.div`
    width: 88%;
    color: #666666;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 15px;
`;

const Habit = styled.div`
    margin-bottom: 10px;
    width: 90%;
    height: 91px;
    background-color: #FFFFFF;
    box-sizing: border-box;
    padding-top: 18px;
    padding-bottom: 15px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    position: relative;
    border-radius: 5px;
    position: relative;

    p {
        font-size: 20px;
        color: #666666;
        padding-left: 5%;
    }

    ion-icon {
        position: absolute;
        right: 5%;
    }

`;


const DaysDiv = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-start;
    padding-left: 5%;
    box-sizing: border-box;
`;

const Day = styled.div`
    width: 30px;
    height: 30px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: ${({ selected }) => (selected ? '#FFFFFF' : '#DBDBDB')};
    background-color: ${({ selected }) => (selected ? '#CFCFCF' : '#FFFFFF')};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin-top: 8px;
    margin-right: 4px;
`;