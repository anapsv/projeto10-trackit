import styled from "styled-components";

export default function History() {

    return (
        <Container>
            <h1>Histórico</h1>
            <ProgressSubtitle>
                Em breve você poderá ver o histórico dos seus hábitos aqui!
            </ProgressSubtitle>
        </Container>
    );
}
const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #E5E5E5;
    display: flex;
    flex-direction: column;

    h1{
        color: #126BA5;
        font-size: 23px;
        margin-top: 98px;
        padding-left: 5%;
    }
`;

const ProgressSubtitle = styled.div`
  margin: 20px 0;
  color: #666666;
  padding-left: 5%;
  font-size: 18px;
`;