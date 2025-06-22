import Header from "@/components/header";
import * as _ from './style';
import SearchBar from "@/components/search";
import Vocard from "@/components/vocard";

const CardList = () =>{
    return(
        <>
            <Header />
            <_.Container>
                <SearchBar />
                <_.CardListBox>
                    <_.CardListInner>
                        <Vocard />
                    </_.CardListInner>
                </_.CardListBox>
            </_.Container>
        </>
    )
}

export default CardList;