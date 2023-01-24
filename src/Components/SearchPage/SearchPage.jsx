import { EmptyPage } from "../components/emptyPage/EmptyPage";
import { SearchCard } from "./SearchCard";

export const SearchPage = (props) => {
    console.log(props.data);
  if (props.data.length === 0){
    return(
        <EmptyPage />
    )
  } else {
    return(
        <>
        {props.data.map((card, index) => <SearchCard key={index} data={card}/>)}
        </>
    )
  }
}