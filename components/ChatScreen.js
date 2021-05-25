import styled from "styled-components";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";
import {useRouter} from "next/router";
import {Avatar} from "@material-ui/core";

const ChatScreen = ({chat, messages}) => {

    const [user] = useAuthState(auth);
    const router = useRouter();

    return (
        <Container>

            <Header>
                <Avatar />

                <HeaderInformation />
            </Header>

        </Container>
    );
};

export default ChatScreen;

const Container = styled.div`
  
`
const Header = styled.div`
  
`

const HeaderInformation = styled.div`
  
`
