import Header from "@/components/header";
import * as _ from './style';
import SearchBar from "@/components/search";
import Vocard from "@/components/vocard";
import { cardData } from "./data";

const CardList = () =>{
    return(
        <>
            <Header />
            <_.Container>
                <SearchBar />
                <_.CardListBox>
                    <_.CardListInner>
                        {
                            cardData.map((card) => (
                                <Vocard tag={card.tag} title={card.title} count={card.count}/>
                            ))
                        }     
                    </_.CardListInner>
                </_.CardListBox>
            </_.Container>
        </>
    )
}

export default CardList;