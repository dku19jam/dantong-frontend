import styled from "styled-components"
import {
    faArrowRightToBracket,
    faBell, faBook, faBookOpen, faCubes, faHome, faUserPlus
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from "next/link"
import {useRouter} from "next/router"
import { MouseEvent,useState } from "react"


const NavBackground = styled.div`
    position:fixed;
    left:0;
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: #fff;
    width: 100px;
    height: 100vh;
    padding: 10px 0px;
    box-sizing: border-box;
    .logo {
        font-size: 40px;
        color: #0D276B!important;
    }

    .navBtn {
        font-size: 40px;
        color: #C4C4C4;
        &:hover {color:#889fd7}
    }

    button {
        background-color: transparent;
        border:0;
    }

    .active {
        color: #0D276B;
    }
`
const NotiContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
`
const NotiBox = styled.div`
    position: absolute;
    right: 0;
    width: 600px;
    height: 100vh;
    padding: 10px;
    background-color: #F0F4FF;   
`
export default function NavBar(){
    const router = useRouter()
    const [notiShow, setNotiShow] = useState<boolean>(false);
      
    type BtnProps = {
        children: React.ReactNode;
      };
      
    function notiContainerClick(){
        setNotiShow(!notiShow)
    }
    function NotiBtn(props: BtnProps){
        const click = (event: React.MouseEvent<HTMLButtonElement>) => {
            setNotiShow(!notiShow)
        }
        return(
            <button onClick={click}>
                {props.children}
            </button>
        )
    }
    return(
        <>
            <NavBackground>
                <FontAwesomeIcon className="logo" icon={faBookOpen} />
                <Link href="/">
                    <FontAwesomeIcon className={`${router.pathname === "/" ? "active" : ""} navBtn`} icon={faHome} />
                </Link>
                <NotiBtn>
                    <FontAwesomeIcon className={`${notiShow ? "active" : ""} navBtn`}  icon={faBell} />
                </NotiBtn>
                <Link href="/signup">
                    <FontAwesomeIcon className={`${router.pathname === "/signup" ? "active" : ""} navBtn`} icon={faUserPlus} />
                </Link>
                <Link href="/login">
                    <FontAwesomeIcon className={`${router.pathname === "/login" ? "active" : ""} navBtn`} icon={faArrowRightToBracket} />
                </Link>
            </NavBackground>
            {notiShow  ? <><NotiContainer onClick={notiContainerClick}></NotiContainer><NotiBox><b>알림</b></NotiBox></>:""}
        </>
    )
}