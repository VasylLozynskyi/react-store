import style from "./search.module.scss"

export const SearchBar = () => {
    const handleSearch = () => {
        
    }

    return (
        <div className={style.search_container}>
            <input type="text" placeholder="Search"  />
            <button className={style.btn_searchbar} onClick={handleSearch}>Search</button>
        </div>
    )
}