import styled from "styled-components";
import {Head} from "next/document";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import {auth, db} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";

const Chat = ({chat, messages}) => {

    const [user] = useAuthState(auth);

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

export async function getServerSideProps(context) {
    // this all happens in server
    // before you even see the page

    // we are going where the the id is
    const ref = db.collection("chats").doc(context.query.id);

    // prep the messages on the server

    const messageRes = await ref.collection("messages").orderBy("timestamp", "desc").get();

    const messages = messageRes.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })).map(messages => ({
        ...messages,
        // will get normal time
        timestamp: messages.timestamp.toDate().getTime(),
    }));

    // prep the chats

    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data(),
    }

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        },
    };
}

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
