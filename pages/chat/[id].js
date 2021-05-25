import styled from "styled-components";
import {Head} from "next/document";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";

const Chat = () => {
    return (
        <Container>
           <Sidebar />

            <ChatContainer>
                <ChatScreen />

            </ChatContainer>
        </Container>
    );
};

export default Chat;

const Container = styled.div`
  display: flex;
`

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;
  
  ::-webkit-scrollbar {
    display:none;
  }
  
  -ms-overflow-style: none;
  scrollbar-width: none;
`
