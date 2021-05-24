import styled from 'styled-components';
import {Avatar, Button, IconButton} from "@material-ui/core";
import {ChatOutlined, MoreVert, SearchOutlined} from "@material-ui/icons";

const Sidebar = () => {
    return (
        <Container>
            <Header>
                <UserAvatar />

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

            <SidebarButton>
                Start a new chat
            </SidebarButton>

        {/*    Chats    */}
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
