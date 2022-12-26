import styled from "styled-components";
import Header from "./Header";
import NavBar from "./NavBar";

const Container = styled.div`
    width: 100%;
    padding-left: 110px;
    box-sizing: border-box;
    margin:0!important;
`

export default function Layout({children}:React.PropsWithChildren<{}>){
    return(
        <>
            <NavBar/>
            <Container>
                <Header/>
                {children}
            </Container>
        </>
    )
}