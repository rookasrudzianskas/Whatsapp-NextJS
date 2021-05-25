import styled from 'styled-components';
import {Avatar} from "@material-ui/core";
import getRecipientEmail from "../utils/getRecipientEmail";
import {auth, db} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import {useRouter} from "next/router";

const Chat = ({ id, users }) => {
    // console.log(id, users)
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '===', getRecipientEmail(users, user)));
    // getting all the data from the recipient, and storing into the variable
    const recipient = recipientSnapshot?.docs?.[0]?.data();

    const recipientEmail = getRecipientEmail(users, user)

    const enterChat = () => {
        router.push(`/chat/${id}`);
    }
    return (
        <Container onClick={enterChat}>
            {recipient ? (
                <UserAvatar src={recipient?.photoURL} />
            ) : (
                <UserAvatar>{recipientEmail[0]}</UserAvatar>
            )}
            <p>{recipientEmail}</p>

        </Container>
    );
};

export default Chat;
const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-wrap: break-word;
  transition: all 0.1s;

  :hover {
    background-color: #e9eaeb;
  }
`
const UserAvatar = styled(Avatar)`
  margin:5px;
  margin-right: 15px;
`
