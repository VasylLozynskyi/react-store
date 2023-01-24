import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import { db } from "../../utils/firebase";
import { onValue, ref } from "firebase/database";
import style from "./product.module.scss"
import {EmptyPage} from "../emptyPage/EmptyPage"
import star_icon from "../../../assets/images/star-unfilled.png"

export const Product = () => {
    let {id} = useParams();
    const [products, setProducts] = useState([]);
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
    let datas = products.filter(data => data.id === id);
    let data = {};
    if(datas.length === 1){
        data= datas[0];
        function countrate (){
            return <img src={star_icon} alt="star_icon" />
        }
        return (
            <div className={style.productpage}>
                <div className={style.flex}>
                    <img src={data.img} alt="" />
                    <div>
                        <h2>{data.name}</h2>
                        <p className={style.subname}>{data.subName}</p>
                        <p className={style.price}>{`price: ${data.price}$`}</p>
                        <p className={style.rate}>{countrate()} {data.rating.rate}</p>
                    </div>
                   
                </div>
                <p>{data.about}</p>
            </div>
        )
    } else {
        return (
            <EmptyPage />
        )
    }
    
}