import style from "./contacts.module.scss"

export const Contacts = () => {
    return (
        <div className={style.contacts}>
            <h2>Contacts</h2>
            <p>tel:<a href="tel:+380981111111">+380981111111</a></p>
            <p>address: Kyiv, Hreshcatyk street </p>
        </div>
    )
}