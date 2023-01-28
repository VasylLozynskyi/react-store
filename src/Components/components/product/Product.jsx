import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import { db } from "../../utils/firebase";
import { onValue, ref } from "firebase/database";
import style from "./product.module.scss"
import {EmptyPage} from "../emptyPage/EmptyPage"
import star_icon from "../../../assets/images/star-unfilled.png"
import { findResponds, newDate, updateToMassResponds, saveProductRespond } from "../../utils/functions";
import { generateCode } from "../../utils/functions";
import { RespondItem } from "./RespondItem";

export const Product = (props) => {
    let {id} = useParams();
    const [user, setUser]=useState({});
    const [products, setProducts] = useState([]);
    const [title, setTitle]= useState("");
    const [textArea, setTextArea] = useState("");
    const [responds, setResponds] =useState([]);
    const [respond, setRespond]=useState({});

    useEffect(() => {
        setUser(props.userdata)
    }, [props.userdata]);

    useEffect(() => {
        const query = ref(db, "products");
            return onValue(query, (snapshot) => {
        const data = snapshot.val();
            if (snapshot.exists()) {
                // eslint-disable-next-line
                setProducts(data);
            }
        });
    }, []);
   
    let datas = products.filter(data => data.id === id);
    let data = {};
    data= datas[0];
    useEffect(() => {
        setResponds(updateToMassResponds(data));
    }, [data]);
    
    function countrate (){
        return <img src={star_icon} alt="star_icon" />
    }

    const handleSaveTextArea = () => {
        if (!title){
            alert("write title")
        } else if (!textArea){
            alert("write textarea")
        } else if (!user.uid){
            props.toLogin()
        } else {
            let respond={
                id: generateCode(),
                author: user.name,
                title: title,
                text: textArea,
                date: newDate(),
                rating: "2"
            }
            setRespond(respond);
            setTextArea('')
            saveProductRespond(data, respond);
            // setResponds(getResponds(data));
        }
    }

    const handleChange = (e) => {
      if (e.target.id === "title"){
            setTitle(e.target.value);
      } else if (e.target.id === "respond") setTextArea(e.target.value);
    }

    const addToBasketHandler =() =>{
        props.addToBasketProduct(data);
    }
    if(datas.length === 1){
        let respondsmap = responds.map(resp => <RespondItem key={resp.id}resp={resp} />)
        return (
            <div className={style.productpage}>
                <div className={style.flex}>
                    <img src={data.img} alt="" />
                    <div>
                        <h2>{data.name}</h2>
                        <p className={style.subname}>{data.subName}</p>
                        <p className={style.price}>{`price: ${data.price}$`}</p>
                        <p className={style.rate}>{countrate()} {data.rating.rate}</p>
                        <button className={style.btn_add_tobasket} onClick={addToBasketHandler}>
                        +
                    </button>
                    </div>
                </div>
                <p>{data.about}</p>
                <div className={style.responds_container}>
                    <h2>Responds</h2>
                    <label htmlFor="title">Title </label>
                    <input type="text" id="title" name="title" onChange={handleChange} value={title} />
                    <textarea name="respond" id="respond" placeholder="Write respond" onChange={handleChange} value={textArea}></textarea>
                    <button onClick={handleSaveTextArea}>save respond</button>
                    {respondsmap}
                </div>
            </div>
        )
    } else {
        return (
            <EmptyPage />
        )
    }
    
}