import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
// import { useNavigate } from 'react-router-dom';
import loadingContext from "../context/Context";
import { getDomain, login } from "../network/ApiAxios";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wraper = styled.div`
  width: 30%;
  padding: 20px;
  background: rgb(2, 11, 85);
  border-radius: 2%;
  border: 1px solid black;
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 500;
  font-style: inherit;
  text-align: center;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 0px;
  padding: 10px;
`;

const Button = styled.button`
  /* width: 40%; */
  border: none;
  padding: 15px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 20px;
`;

const Select = styled.select`
  padding: 10px;
  width: 60%;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Option = styled.option``;

const Login = () => {
  const context = useContext(loadingContext);
  //    const navigate =useNavigate()
  useEffect(() => {
    getDomains();
  }, []);
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    domain: "",
  });
  const [domains, setDomains] = useState(null);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    // const navigate= useNavigate();
    e.preventDefault();
    context.setIsLoading(true);
    const data = await login(credentials.email, credentials.password, credentials.domain)
    context.setIsLoading(false);
    console.log(data)
    if (data.status) {
      // console.log(data.response.token);
      localStorage.setItem("token", data.response.token);
      // navigate('/contabo/instances')
    } else {
      context.showToast("error", data.error);
    }
  };

  const getDomains = async () => {
    const response = await getDomain();
    if (response.status) {
      setDomains(response.response);
    }
  };

  return (
    <Container>
      <Wraper>
        <Title>SIGN IN</Title>
        <Form onSubmit={submitHandler}>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            required
          />

          <Select
            value={credentials.domain}
            name="domain"
            onChange={onChange}
            required
          >
            <Option value="">Select Domain</Option>
            {domains &&
              domains.map((data, index) => (
                <Option value={data.doamin} key={index}>
                  {data.domain}
                </Option>
              ))}
          </Select>

          <Button onSubmit={submitHandler}>Login</Button>
        </Form>
      </Wraper>
    </Container>
  );
};

export default Login;
