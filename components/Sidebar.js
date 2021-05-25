import styled from 'styled-components';
import {Avatar, Button, IconButton} from "@material-ui/core";
import {ChatOutlined, MoreVert, SearchOutlined} from "@material-ui/icons";
import * as EmailValidator from "email-validator";
import {auth, db} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import Chat from "./Chat";

const Sidebar = () => {

    const [user] = useAuthState(auth);
    const userChatRef = db
        .collection("chats")
        .where("users", "array-contains", user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = () => {
        const input = prompt(
            "Please enter email address for the user you wish to chat with"
        );

        if (!input) return null;

        if (
            EmailValidator.validate(input) &&
            !chatAlreadyExists(input) &&
            input !== user.email
        ) {
            // We need to add the chat into de DB 'chats collection' if it doesn't already exist and is valid
            db.collection("chats").add({
                users: [user.email, input],
            });
        }
    };

    const chatAlreadyExists = (recipientEmail) =>
        !!chatsSnapshot?.docs.find(
            (chat) =>
                chat.data().users.find((user) => user === recipientEmail)?.length > 0
        );


    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />

                <IconsContainer>
                    <IconButton>
                        <ChatOutlined />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </IconsContainer>
            </Header>

            <Search>
                <SearchOutlined />
                <SearchInput placeholder="Search in chats" />
            </Search>

            <SidebarButton onClick={createChat}>
                Start a new chat
            </SidebarButton>

        {/*    Chats    */}

            {chatsSnapshot?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </Container>
    );
};

export default Sidebar;

const SidebarButton = styled(Button)`
  width:100%;
  
  &&& {
    border-top:1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
  
`

const SearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
`

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
  
`

const Container = styled.div`
  
`

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height:80px;
  border: 1px solid whitesmoke;
  
`
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  transition: all 0.1s;
  
  :hover {
    opacity:0.8;
    
  }
`
const IconsContainer = styled.div`
  
`

// const [user] = useAuthState(auth);
//
// // goes to the database chats, and checks, if in the users there is already the email we are checking on, to prevent chatting rokas with rokas
// const userChatRef = db
//     .collection('chats')
//     .where('users', 'array-contains', user.email);
// const [chatsSnapshot] = useCollection(userChatRef);
//
// const createChat = () => {
//     const input = prompt("Enter the chat email address, you wish to chat with");
//
//     if(!input) {
//         return false;
//     }
//
//     // if that does not already exists
//     if(EmailValidator.validate(input) &&
//         input !== user.email &&
//         !chatAlreadyExists(input)) {
//         // this is where to add the chat into the chat collection
//         db.collection("chats").add({
//             // the current email, and input what is entered
//             users: [user.email, input]
//         });
//     }
// };
//
// const chatAlreadyExists = (recipeientEmail) => {
//     // will convert to true or false
//     // through the chats, and find if there is an email with the same as passed email
//     !!chatsSnapshot?.docs.find(
//         (chat) =>
//             chat.data().users.find((user) => user === recipeientEmail)?.length > 0
//     );
// };
//
// // console.log(chatsSnapshot)

