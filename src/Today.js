import axios from "axios";
import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import UserContext from "./contexts/UserContext";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";


export default function Today() {

    const currentWeekdayIndex = dayjs().format("d");
    const dayAndMonth = dayjs().format("DD/MM");
    let currentWeekday = "";

    if (currentWeekdayIndex === "0") {
        currentWeekday = "Domingo";
    } else if (currentWeekdayIndex === "1") {
        currentWeekday = "Segunda";
    } else if (currentWeekdayIndex === "2") {
        currentWeekday = "Terça";
    } else if (currentWeekdayIndex === "3") {
        currentWeekday = "Quarta";
    } else if (currentWeekdayIndex === "4") {
        currentWeekday = "Quinta";
    } else if (currentWeekdayIndex === "5") {
        currentWeekday = "Sexta";
    } else if (currentWeekdayIndex === "6") {
        currentWeekday = "Sábado";
    }

    const { userInfo, percent, setPercent } = useContext(UserContext);
    const navigate = useNavigate();

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        }
    };

    const [habits, setHabits] = useState([]);

    function updatePercentage() {
        if (habits.length > 0) {
            let aux = 0;
            for (let i = 0; i < habits.length; i++) {
                if (habits[i].done === true) aux++;
            }
            setPercent((aux / habits.length) * 100);
        }
    }

    // eslint-disable-next-line
    useEffect(() => updatePercentage(), [habits]);
    function importHabits() {
        const promise = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
            config
        );
        promise
            .then((response) => setHabits([...response.data]))
            .catch((err) => {
                if (err.response.status === 401) {
                    alert("Seu login expirou");
                    navigate("/");
                }
            });
    }

    // eslint-disable-next-line
    useEffect(() => importHabits(), []);

    function done(id, status) {
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;
        if (!status) {
            const promise = axios.post(`${URL}/check`, null, config);
            promise
                .then(() => importHabits())
                .catch((err) => console.log(err.response));
        } else {
            const promise = axios.post(`${URL}/uncheck`, null, config);
            promise
                .then(() => importHabits())
                .catch((err) => console.log(err.response));
        }
    }

    console.log(userInfo, 'today');
    return (
        <Container>
            <h1>
                {currentWeekday}, {dayAndMonth}
            </h1>
            <ProgressSubtitle>
                {percent === 0 ? (
                    <p>Nenhum hábito concluído ainda</p>
                ) : (
                    <PercentProgress>
                        {percent.toFixed(0) + "%"} dos hábitos concluídos
                    </PercentProgress>
                )}
            </ProgressSubtitle>
            {habits.map((el, index) => {
                return (
                    <HabitsDiv>
                        <Habit
                            done={el.done}
                            key={index}
                            current={el.currentSequence}
                            highest={el.highestSequence}
                        >
                            <h3>{el.name}</h3>
                            <p>
                                Sequência atual: <span>{el.currentSequence} dias</span>{" "}
                            </p>
                            <p>
                                Seu recorde: <span>{el.highestSequence} dias</span>{" "}
                            </p>
                            <ion-icon
                                onClick={() => done(el.id, el.done)}
                                name="checkmark-outline"
                            ></ion-icon>
                        </Habit>
                    </HabitsDiv>
                );
            })}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #E5E5E5;

    h1{
        color: #126BA5;
        font-size: 23px;
        margin-top: 98px;
        padding-left: 5%;
    }
`;

const ProgressSubtitle = styled.div`
  width: 90%;
  margin: 10px 0;
  p {
    color: #BABABA;
    margin-left: 5%;
  }
`;

const PercentProgress = styled.div`
  color: #8fc549;
  margin-left: 5%;
`;

const HabitsDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const Habit = styled.div`
  background-color: #ffffff;
  width: 85%;
  padding: 20px;
  margin-top: 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #666666;
  font-size: 12px;
  position: relative;
  p {
    max-width: 60%;
  }
  p:nth-child(2) span {
    color: ${({ done }) => (done ? "#8FC549" : "#666666")};
  }
  p:nth-child(3) span {
    color: ${({ done, current, highest }) =>
        done && current === highest ? "#8FC549" : "#666666"};
  }
  h3 {
    font-size: 20px;
    padding-bottom: 10px;
    max-width: 60%;
  }
  ion-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-40px);
    font-size: 60px;
    background-color: ${({ done }) => (done ? "#8fc549" : "#EBEBEB")};
    border-radius: 5px;
    color: white;
  }
`;