import Header from "@/components/header";
import * as _ from './style';
import SearchBar from "@/components/search";
import Vocard from "@/components/vocard";
import { cardData } from "./data";

const chunkArray = <T,>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );

const CardList = () => {
    const rows = chunkArray(cardData, 3);

    return (
        <>
            <Header />
            <_.Container>
                <SearchBar />
                <_.CardListBox>
                    <_.CardListInner>
                        {rows.map((row, rowIdx) => (
                            <_.Row key={rowIdx}>
                                {row.map((card, idx) => (
                                    <Vocard
                                        key={card.title + idx}
                                        tag={card.tag}
                                        title={card.title}
                                        count={card.count}
                                    />
                                ))}
                                {Array.from({ length: 3 - row.length }).map((i) => (
                                    <_.Empty />
                                ))}
                            </_.Row>
                        ))}
                    </_.CardListInner>
                </_.CardListBox>
            </_.Container>
        </>
    );
};

export default CardList;