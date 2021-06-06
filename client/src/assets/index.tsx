import Logo from'./logo.png';
import RemoveIcn from'./remove.png';
import ExitIcn from'./exit.svg';
import AvatarImg from'./avatar.jpg';

const LogoCG = (props: any) => (
    <img src={Logo} alt={"Coding Garden Logo"} draggable="false" {...props}></img>
)

const Avatar = (props: any) => (
    <img src={AvatarImg} alt={"Avatar Logo"} draggable="false" {...props}></img>
)

const Remove = (props: any) => (
    <img src={RemoveIcn} alt={"Remove Logo"} draggable="false" {...props}></img>
)

const LogoutBtn = (props: any) => (
    <img src={ExitIcn} alt={"Logout Logo"} draggable="false" {...props}></img>
)


export {
    LogoCG,
    Avatar,
    Remove,
    LogoutBtn
};