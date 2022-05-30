import { Link } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbar } from "react-circular-progressbar";
import UserContext from "./contexts/UserContext";
import { useContext } from "react";
import { buildStyles } from "react-circular-progressbar";

export default function Menu() {

    let { percent } = useContext(UserContext);

    return (
        <Container>
            <Link to='/habitos'>Hábitos</Link>
            <Circle>
                <Link to='/hoje'>
                    <ProgressBarContainer>
                        <CircularProgressbar
                            value={percent}
                            text="Hoje"
                            background={true}
                            styles={{
                                root: {},
                                path: {
                                    stroke: "#FFFFFF",
                                },
                                trail: {
                                    stroke: "#52b6ff",
                                },
                                text: {
                                    fill: "#ffffff",
                                },
                                background: {
                                    fill: "#52b6ff",
                                },
                            }}
                        />
                    </ProgressBarContainer>
                </Link>
            </Circle>
            <Link to='/historico' >Histórico</Link>
        </Container>
    );
}

const Container = styled.div`
  height: 70px;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;

  a {
    color: #52b6ff;
    cursor: pointer;
    font-size: 23px;
    text-decoration: none;
  }
`;
const Circle = styled.div`
  width: 91px;
  height: 91px;
  background-color: #52b6ff;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;

  CircularProgressbar {
      text-align: center;
  }
`;

const ProgressBarContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  cursor: pointer;

  CircularProgressbar {
      text-align: center;
  }
`;
