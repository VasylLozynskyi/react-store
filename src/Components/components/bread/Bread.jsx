import { Link} from "react-router-dom"

export const Bread = (props) => {
    let mass = props.mass[0] !== '' ? props.mass.map(el => {
        let l = `/Products/${el}`
        return( <Link key={el} to={l}>/{el}</Link>)}
    ) : "";

    return (
        <div >
            <Link to="/Products">/Products</Link>
            {mass}
        </div>
    )
}