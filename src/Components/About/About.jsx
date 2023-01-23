import style from "./about.module.scss"

export const About = () => {
    return (
        <div className={style.about_container}>
            <h2>About company</h2>
            <p>
                Game store is a reliable assistant in the world of computer technology, gadgets, electronics, implementation of IT solutions of varying degrees of complexity.
            </p>
            <p>
                For more than 25 years of activity, the company has become one of the largest sellers in Ukraine in the b2b sales segment (wholesale and corporate sales directions), as well as in the b2c segment (retail trade for consumers).
            </p>
        </div>
    )
}