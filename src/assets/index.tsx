import Logo from'./logo.png';
import RemoveIcn from'./remove.png';
import AvatarImg from'./avatar.jpg';

const LogoCG = (props) => (
    <img src={Logo} alt={"Coding Garden Logo"} draggable="false" {...props}></img>
)

const Avatar = (props) => (
    <img src={AvatarImg} alt={"Avatar Logo"} draggable="false" {...props}></img>
)

const Remove = (props) => (
    <img src={RemoveIcn} alt={"Remove Logo"} draggable="false" {...props}></img>
)

export {
    LogoCG,
    Avatar,
    Remove
};