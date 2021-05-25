import styled from "styled-components";
import {Button} from "@material-ui/core";
import {Head} from "next/document";
import {auth, provider} from "../firebase";

const Login = () => {

    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error));
    }

    return (
        <Container>
            {/*<Head>*/}

            {/*</Head>*/}

            <LoginContainer>
                <Logo src="https://i.pinimg.com/originals/f7/5d/94/f75d94874d855a7fcfcc922d89ac5e80.png" />
                <Button onClick={signIn} variant="outlined">Sign In With Google</Button>
            </LoginContainer>
        </Container>
    );
};

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction:column;
  align-items: center;
  background-color: white;
  border-radius:5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
;

`
const Logo = styled.img`
 height: 200px;
  object-fit: contain;
  width: 200px;
  margin-bottom: 50px;
`
