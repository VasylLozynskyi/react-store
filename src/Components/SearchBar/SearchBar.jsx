import { useState, useEffect } from "react"
import style from "./search.module.scss"
import { db } from "../utils/firebase";
import { onValue, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";

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

function filterIt(arr, searchKey) {
    return arr.filter(item=>item.name.toLowerCase().includes((searchKey.toLowerCase())));
  }
  let search_page = filterIt(products, input);


    const handleSearch = () => {
        if (input && search_page){
            navigate(`/Products/search`)
            onSearch(search_page);
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