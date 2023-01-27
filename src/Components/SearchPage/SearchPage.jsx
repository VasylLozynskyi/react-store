import { EmptyPage } from "../components/emptyPage/EmptyPage";
import { CardInList } from "../components/cardInlist/CardInList";

export const SearchPage = (props) => {
  if (props.data.length === 0 || props === undefined){
    return(
        <EmptyPage />
    )
  } else {
    return(
        <>
        {props.data.map((card, index) => <CardInList key={index} data={card}/>)}
        </>
    )
  }
}