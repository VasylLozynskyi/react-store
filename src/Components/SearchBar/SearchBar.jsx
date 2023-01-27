import { useState, useEffect } from "react"
import style from "./search.module.scss"
import { db } from "../utils/firebase";
import { onValue, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { filterIt } from "../utils/functions";

export const SearchBar = ({onSearch}) => {
    const [input, setInput]=useState("");
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const query = ref(db, "products");
            return onValue(query, (snapshot) => {
        const data = snapshot.val();

        if (snapshot.exists()) {
        // eslint-disable-next-line
        Object.values(data).map((product) => {
        setProducts((products) => [...products, product]);
    });    
  }
});
}, []);

    const handleSearch = (e) => {
        if (input && products){
            navigate(`/Products/search`)
            onSearch(filterIt(products, input));
            if (filterIt(products, input) !== []){
                e.target.previousElementSibling.value = "";
            }
        }
    }
    const handelChange = (e) => {
        setInput(e.target.value)
    }
    return (
        <div className={style.search_container}>
            <input type="text" placeholder="Search" onChange={handelChange}  />
            <button className={style.btn_searchbar} onClick={handleSearch}>Search</button>
        </div>
    )
}