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
                        <Vocard tag={["1학년","2학년"]} title={"2025 BSSM 영어 단어왕 선발대회"} subtitle={"170 카드"}/>
                    </_.CardListInner>
                </_.CardListBox>
            </_.Container>
        </>
    )
}

export default CardList;