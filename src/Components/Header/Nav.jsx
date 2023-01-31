import {Link} from "react-router-dom";

export const Nav = (props) =>{
    let link = `/react-store/${props.nav}`
    return (
        <Link to={link}>{props.nav}</Link>
    )
}