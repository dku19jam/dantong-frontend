import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import { setCookie } from "./Cookie";
import { useForm } from "react-hook-form";
import axios from "axios";

const SignUpContainer = styled.div`
  display:block;
  padding:30px;
  .row {
    margin-top:10px;
  }
  button {
    margin-top:10px;
    width: 300px;
    background-color: #0D276B;
    &:hover,&:active,&.active,&:active:hover{
      background-color: #889fd7;
      border: #889fd7 1px solid;
    }
  }
  button:active {
    background-color: #889fd7;
      border: #889fd7 1px solid;
  }
  .alert {
    margin-top:10px;
    margin-bottom:0;
  }
`
interface ILoginForm {
  email: string;
  password: string;
}
export default function SignUp() {
  const { register, handleSubmit} = useForm<ILoginForm>();
  const [pwValue, setPwValue] = useState("");
  const [validated, setValidated] = useState(false);

  const passwordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwValue(e.target.value);
  };
  
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false ) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //   setValidated(true);
  // };

  const api = axios.create({
    baseURL: "http://localhost:8080",
  });

  const onLoginValid = ({email, password}:ILoginForm) => {
    const requestBody = {email, password};
    api
      .post("users/login", requestBody)
      .then((res) => {
        const{
          data: { accessToken, refreshTokenId, tokenExpireTime },
        } = res;
        setCookie("accessToken", accessToken);
        localStorage.setItem("refreshTokenId", refreshTokenId);
        localStorage.setItem("tokenExpireTime", String(tokenExpireTime * 1000));
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  return (
    <SignUpContainer>
      <h1>로그인</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit(onLoginValid)}>
        <Row>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>이메일 주소</Form.Label>
            <Form.Control
              type="email"
              placeholder="이메일 (ex.dantong@dankook.ac.kr)"
              {...register("email", {
                required: "Email is required.",
              })}
              required
            />
            <Form.Control.Feedback type="invalid">
              {" "}
              알맞은 이메일 형식으로 입력해주세요{" "}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="formGroupPassword1">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
            {...register("password", {
              required: "Password is required.",
            })}
              onChange={passwordCheck}
              value={pwValue}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              autoComplete=""
              required
           
            />
          </Form.Group>
        </Row>
        <Row>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              로그인
            </Button>
          </div>
        </Row>
      </Form>
    </SignUpContainer>
  );
}
