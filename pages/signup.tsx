import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import styled from "styled-components";

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
  .alert {
    margin-top:10px;
    margin-bottom:0;
  }
`
export default function SignUp() {
  const [pwAlert, setPwAlert] = useState<undefined|Boolean>(undefined);
  const [pwValue, setPwValue] = useState("");
  const [pwValue2, setPwValue2] = useState("");
  const [validated, setValidated] = useState(false);
  const [pwResult, setPwResult] = useState<undefined|Boolean>(undefined);
  const passwordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwValue(e.target.value);
  };
  const passwordCheck2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwValue2(e.target.value);
  };
  const setFirstPW = (e: React.FocusEvent<HTMLInputElement>) => {
    setPwValue(e.target.value);
    console.log(pwValue);
  };
  const checkPW = () => {
    if (pwValue == pwValue2 && pwValue.length>0 && pwValue2.length>0) {
      console.log("right");
      setPwResult(true);
    } else if ( pwValue2.length>0) {
      setPwResult(false);
      console.log("false");
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false ) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (pwResult === true){
      setValidated(true);
      setPwAlert(false)
    } else {
      setPwAlert(true)
      console.log("alert here")
    }
  };
  return (
    <SignUpContainer>
      <h1>회원가입</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>이메일 주소</Form.Label>
            <Form.Control
              type="email"
              placeholder="이메일 (ex.dantong@dankook.ac.kr)"
              required
            />
            <Form.Control.Feedback type="invalid">
              {" "}
              알맞은 이메일 형식으로 입력해주세요{" "}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3" controlId="formGroupPassword1">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              onChange={passwordCheck}
              onBlur={(e: React.FocusEvent<HTMLInputElement>)=>{setFirstPW(e);checkPW()}}
              value={pwValue}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              autoComplete=""
              required
              isValid={pwResult === undefined ? undefined : (pwResult ? true: false)}
              isInvalid={pwResult === undefined ? undefined : (pwResult ? false: true)}
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="formGroupPassword2">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={passwordCheck2}
              onBlur={checkPW}
              required
              isValid={pwResult === undefined ? undefined : (pwResult ? true: false)}
              isInvalid={pwResult === undefined ? undefined : (pwResult ? false: true)}
              autoComplete=""
            />
            <Form.Text id="passwordHelpBlock" muted>
              {pwResult === undefined ? undefined : (pwResult ? "일치합니다" : "일치하지 않습니다")}
            </Form.Text>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formGroupStudentName">
            <Form.Label>이름</Form.Label>
            <Form.Control
              type="text"
              placeholder="이름을 입력해주세요"
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGroupStudentNum">
            <Form.Label>학번</Form.Label>
            <Form.Control
              type="text"
              placeholder="학번 (ex.32212345)"
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="formGroupMajor">
            <Form.Label>전공</Form.Label>
            <Form.Control
              type="text"
              placeholder="전공 (ex.소프트웨어학과)"
              required
            />
          </Form.Group>
        </Row>
        {pwAlert === undefined ? "" : (pwAlert && !pwResult ? <div className="row"><div className="mb-3"><Alert variant="danger">비밀번호를 다시 확인해주세요</Alert></div></div>:"")}
        <Row>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              회원가입
            </Button>
          </div>
        </Row>
      </Form>
    </SignUpContainer>
  );
}
