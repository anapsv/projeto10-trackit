import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "./contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";

export default function AddNewHabit({
    name,
    setName,
    days,
    weekdays,
    setWeekdays,
    setShowAddNewHabit,
    getHabits,
}) {

    const { userInfo } = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${userInfo.token}`
        },
    };
    let [loading, setLoading] = useState(false);

    function createHabit(event) {

        event.preventDefault();
        setLoading(true);
        for (let i = 0; i < weekdays.length; i++) {
            if (weekdays[i].selected === true) {
                days.push(i);
            }
        }

        const habitBody = {
            name: name,
            days: days,
        };
        console.log(habitBody, 'corpo habito')
        const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', habitBody, config);

        request
            .then((obj) => objAPI(obj))

            .catch((err) => {
                setLoading(false);
                const status = err.response.request.status;
                if (status === 422) alert("Nome do hábito não pode estar vazio!");
            });
    }

    function objAPI(obj) {
        setName('');
        days = [];
        for (let i = 0; i < weekdays.length; i++) {
            weekdays[i].selected = false;
        }
        setLoading(false);
        setShowAddNewHabit(false);
        getHabits();
        console.log(obj.data)
    }

    function selectDays(index) {
        let weekday = weekdays[index];
        weekday.selected = !weekday.selected;
        setWeekdays([
            ...weekdays.slice(0, index),
            weekday,
            ...weekdays.slice(index + 1, weekdays.length)
        ])
    }

    return (
        <NewHabitContainer>
            <form onSubmit={createHabit}>
                <input type='text' placeholder='nome do hábito' value={name} onChange={e => setName(e.target.value)}
                    disabled={loading} />
                <DaysDiv>
                    {weekdays.map((e, index) => (
                        <Days key={index} selected={e.selected} onClick={() => { selectDays(index) }} disabled={loading} >
                            {e.name}
                        </Days>
                    ))}
                </DaysDiv>
                <Cancel onClick={() => setShowAddNewHabit(false)}>Cancelar</Cancel>
                <Save disabled={loading} type='submit'>{loading ? <ThreeDots color="white" /> : "Salvar"}</Save>
            </form>
        </NewHabitContainer>
    );
}

const NewHabitContainer = styled.div`

    margin-bottom: 10px;
    width: 90%;
    height: 180px;
    background-color: #FFFFFF;
    box-sizing: border-box;
    padding-top: 18px;
    padding-bottom: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    border-radius: 5px;

    form {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    input {
        box-sizing: border-box;
        width: 90%;
        height: 45px;
        padding-left: 11px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        color: #DBDBDB;
;       
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

const Days = styled.div`
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

const Cancel = styled.button`
    width: 84px;
    height: 35px;
    color: #52B6FF;
    font-size: 20px;
    text-align: center;
    background-color: #FFFFFF;
    border: none;
    border-radius: 5px;
    position: absolute;
    bottom: 15px;
    right: 33%;
`;

const Save = styled.button`
    width: 84px;
    height: 35px;
    color: #FFFFFF;
    font-size: 20px;
    background-color: #52B6FF;
    border: none;
    border-radius: 5px;
    position: absolute;
    bottom: 15px;
    right: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
`;