import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
`;

export const LoginForm = styled.div`
  background-color: #191F28;
  padding: 30px;
  border-radius: 3px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ButtonDiv = styled.div`
   display: flex;
   flex-direction: column;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #2C313B;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 10px;
`;