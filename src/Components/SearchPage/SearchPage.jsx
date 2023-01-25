import { EmptyPage } from "../components/emptyPage/EmptyPage";
import { SearchCard } from "./SearchCard";

export const SearchPage = (props) => {
  if (props.data.length === 0 || props === undefined){
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