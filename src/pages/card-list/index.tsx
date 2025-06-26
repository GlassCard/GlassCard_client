import Header from "@/components/header";
import * as _ from './style';
import SearchBar from "@/components/search";
import Vocard from "@/components/vocard";
import { supabase, type CardItem, type VocabList } from "./data";
import { useEffect, useState } from "react";

const chunkArray = <T,>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );

const CardList = () => {
    const [result, setResult] = useState<CardItem[]>([]);
    const [rows,setRows] = useState<CardItem[][]>([]);
    const [search, setSearch] = useState("");      // 입력값
    const [query, setQuery] = useState("");        // 실제 검색에 쓸 값

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSearchClick = () => {
        setQuery(search); // 버튼 클릭 시에만 query 변경
    };

    useEffect(() => {
        const filtered = query
            ? result.filter(card => card.title.includes(query))
            : result;
        setRows(chunkArray(filtered, 3));
    }, [result, query]);

    useEffect(() => {
        const fetchAll = async () => {
            // select id, title, tags from vocab_lists
            const { data: listData, error: listError } = await supabase
                .from('vocab_lists')
                .select('id, title, tags');
            if (listError) {
                console.error(listError);
                return;
            }
            // 각 단어카드마다 count 애트리뷰트 추가
            const promises = (listData ?? []).map(async (list: VocabList) => {
                const { count, error: countError } = await supabase
                    .from('vocab_items')
                    .select('*', { count: 'exact', head: true })
                    .eq('vocab_list_id', list.id);
                if (countError) {
                    console.error(countError);
                }
                return {
                    title: list.title,
                    tags: list.tags,
                    count: count ?? 0,
                };
            });
            const results = await Promise.all(promises);
            setResult(results);
        };
        fetchAll();
    }, []);


    useEffect(()=>{
        setRows(chunkArray(result,3));
        console.log(rows);
        console.log(result);
    },[result])
    return (
        <>
            <Header />
            <_.Container>
                <SearchBar value={search} onChange={handleSearch} onSearch={handleSearchClick} />
                <_.CardListBox>
                    <_.CardListInner>
                        {rows.map((row, rowIdx) => (
                            <_.Row key={rowIdx}>
                                {row.map((card, idx) => (
                                    <Vocard
                                        key={card.title + idx}
                                        tag={card.tags}
                                        title={card.title}
                                        count={card.count}
                                    />
                                ))}
                                {Array.from({ length: 3 - row.length }).map(() => (
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