import { useEffect } from "react";
import { useState } from "react";
import { setcreateToUserRate } from "../../utils/functions";
import style from "./starrating.module.scss"

export const StarRating = (props) => {
    const [rating, setRating] = useState("");
    const [hover, setHover] = useState(0);
    const [isRate, setIsRate]=useState("")
    useEffect(() => {
        if(props.user.uid){
        for (let r in props.user.rates){
            if(r === props.product.id){
                setRating(props.user.rates[r].productRate);
                setIsRate("You had rates this product")
            }
        }
    }
    }, [props.user])
    return (
      <div className={style.star_rating}>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            
                <button
                    type="button"
                    key={index}
                    className={index <= (hover || rating) ? style.on : style.off}
                    onClick={() => {
                        if (props.user.uid && !rating) {
                            setRating(index);
                            setcreateToUserRate(index, props.product, props.user.uid)
                        } else if(!props.user.uid) {props.toLogin();} else if (rating) {
                            alert("you just had rates this product")
                        }}}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                >
                    <span className={style.star}>&#9733;</span>
                </button>
          )
        })}
        <span>{isRate}</span>
    </div>
    )
  }