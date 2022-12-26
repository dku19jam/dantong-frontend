import styled from "styled-components"

const Content = styled.div`
    display: flex;
    padding: 10px 0px;
    h3 {
        color: #0D276B;
        font-weight: 700;
    }
`

const SearchBar = styled.div`
    
`

export default function Header(){
    return(
        <>
            <Content>
                <h3>단통</h3>
            </Content>
        </>
    )
}