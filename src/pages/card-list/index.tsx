import Header from "@/components/header";
import * as _ from './style';
import SearchBar from "@/components/search";

const CardList = () =>{
    return(
        <>
            <Header />
            <_.Container>
                <SearchBar />
            </_.Container>
        </>
    )
}

export default CardList;