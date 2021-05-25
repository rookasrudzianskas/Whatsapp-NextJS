import styled from "styled-components";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../firebase";
import {useRouter} from "next/router";
import {Avatar, IconButton} from "@material-ui/core";
import {AttachFile, MicOutlined, MoreVertOutlined} from "@material-ui/icons";
import {useCollection} from "react-firebase-hooks/firestore";
import Message from "./Message";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {useState} from "react";
import firebase from "firebase";

const ChatScreen = ({chat, messages}) => {

    const [input, setInput] = useState()

    const [user] = useAuthState(auth);
    const router = useRouter();
    const [messagesSnapshot] = useCollection(db.collection("chats").doc(router.query.id).collection('messages').orderBy('timestamp', 'asc'));

    const showMessages = () => {
        if(messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                        <Message
                                key={message.id}
                                user={message.data().user}
                                message={{
                                    ...message.data(),
                                    timestamp: message.data().timestamp?.toDate().getTime(),
                                }}
                        />
            ));
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        // update last seen
        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, {merge: true});

        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email.big(),
            photoURL: user.photoURL,
        });
      setInput('');
    };

    return (
        <Container>

            <Header>
                <Avatar />

                <HeaderInformation>
                    <h3>Recipient email</h3>
                    <p>Last seen ....</p>
                </HeaderInformation>

                <HeaderIcons>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertOutlined />
                    </IconButton>

                </HeaderIcons>
            </Header>

            <MessageContainer>
                {showMessages()}
                <EndOfMessages />
            </MessageContainer>
            <InputContainer>
                <InsertEmoticonIcon />
                <Input value={input} onChange={e => setInput(e.target.value)}/>
                <button type="submit" hidden disabled={!input} onClick={sendMessage}>
                    Send Message
                </button>
                <MicOutlined />
            </InputContainer>

        </Container>
    );
};

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 11px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  flex: 1;
  margin-left: 15px;
  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;

const HeaderIcons = styled.div``;
const MessageContainer = styled.div`
  background-color: #e5ded8;
  padding: 30px;
  min-height: 90vh;
`;
const EndOfMessages = styled.div`
  margin-bottom: 50px;
`;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;


