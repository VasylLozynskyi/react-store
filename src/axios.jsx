import { useEffect, useState } from "react";


const [products, setProduct] = useState([]);
useEffect ( () => {
axios.get("url") // ссилка на сервер
    .then(res => {
        const products = res.data; // витягуємо дані
        setProduct(products)
    })
},[])
