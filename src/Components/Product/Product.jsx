import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import { db } from "../utils/firebase";
import { onValue, ref } from "firebase/database";
import style from "./product.module.scss"
import {EmptyPage} from "../components/emptyPage/EmptyPage"
import star_icon from "../../assets/images/star-unfilled.png"
import { newDate, updateToMassResponds, saveProductRespond, generateCode } from "../utils/functions";
import { RespondItem } from "./RespondItem";
import { StarRating } from "../components/starRating/StarRating";
import { Loading } from "../components/loading/Loading";

export const Product = (props) => {
    let {id} = useParams();
    const [user, setUser]=useState({});
    const [title, setTitle]= useState("");
    const [textArea, setTextArea] = useState("");
    const [responds, setResponds] =useState([]);
    const [datas, setDatas]= useState("");
    const [rate, setRate]= useState("")

    useEffect(() => {
        setUser(props.userdata)
    }, [props.userdata]);

    useEffect(() => {
        const query = ref(db, "products");
            return onValue(query, (snapshot) => {
        const data = snapshot.val();
            if (snapshot.exists()) {
                // eslint-disable-next-line
                if (data.filter(data => data.id == id).length === 0){
                    setDatas("false")
                } else {
                    setDatas(data.filter(data => data.id === id)[0]);
                    setRate(data.filter(data => data.id === id)[0].rating.rate)
                }
            }
        });
    },[id]);

    useEffect(() => {
        if (datas || datas === "false") setResponds(updateToMassResponds(datas));
    }, [datas]);
    
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
                uid: user.uid,
                title: title,
                text: textArea,
                date: newDate(),
                rating: "2"
            }
            setTextArea("");
            setTitle("");
            saveProductRespond(datas, respond);
        }
    }
    const toLogin = () => {
        props.toLogin();
    }
    const handleChange = (e) => {
      if (e.target.id === "title"){
            setTitle(e.target.value);
      } else if (e.target.id === "respond") setTextArea(e.target.value);
    }

    const addToBasketHandler =() =>{
        if (datas) props.addToBasketProduct(datas);
    }
   
    if(!datas) {
        return (
            <Loading />
        )
    } else if (datas === "false") {
        return (
            <EmptyPage />
        )
    } else {
        let respondsmap = responds.map(resp => <RespondItem key={resp.id} resp={resp} />)
        return (
            <div className={style.productpage}>
                <div className={style.flex}>
                    <img src={datas.img} alt="" />
                    <div>
                        <h2>{datas.name}</h2>
                        <p className={style.subname}>{datas.subName}</p>
                        <p className={style.price}>{`price: ${datas.price}$`}</p>
                        <p className={style.rate}>{countrate()} {rate.toFixed(2)}</p>
                        <button className={style.btn_add_tobasket} onClick={addToBasketHandler}>
                            +
                        </button>
                    </div>
                </div>
                <p>{datas.about}</p>
                <div className={style.rating_container}>
                    <p>Please rate a product</p>
                    <StarRating user={user} product={datas} toLogin={toLogin} />
                </div>
                <div className={style.responds_container}>
                    <h2>Responds</h2>
                    <label htmlFor="title">Title </label>
                    <input type="text" id="title" name="title" onChange={handleChange} value={title} />
                    <textarea name="respond" id="respond" placeholder="Write respond" onChange={handleChange} value={textArea}></textarea>
                    <button onClick={handleSaveTextArea}>save respond</button>
                    <div className={style.data_responds_container}>
                        {respondsmap}
                    </div>
                </div>
            </div>
        )
    }     
}