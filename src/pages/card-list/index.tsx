import Header from "@/components/header";
import * as _ from './style';
import SearchBar from "@/components/search";
import Vocard from "@/components/vocard";
import { supabase, type CardItem, type VocabList } from "./data";
import { useEffect, useState } from "react";
import 'react-loading-skeleton/dist/skeleton.css';

const chunkArray = <T,>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );

const CardList = () => {
    const [result, setResult] = useState<CardItem[]>([]);
    const [rows, setRows] = useState<CardItem[][]>([]);
    const [search, setSearch] = useState("");      // 입력값
    const [query, setQuery] = useState("");        // 실제 검색에 쓸 값
    const [loading, setLoading] = useState(true);

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
            try {
                // 1. 단어장 목록 가져오기
                const { data: listData, error: listError } = await supabase
                    .from('vocab_lists')
                    .select('id, title, description, expires_at, access_key')
                    .eq('is_deleted', false);
                
                if (listError) {
                    console.error('단어장 목록 조회 오류:', listError);
                    return;
                }

                // 2. 각 단어장의 태그와 단어 개수 가져오기
                const promises = (listData ?? []).map(async (list: any) => {
                    // 태그 가져오기
                    const { data: tagData, error: tagError } = await supabase
                        .from('vocab_list_tags')
                        .select(`
                            tags (
                                name
                            )
                        `)
                        .eq('vocab_list_id', list.id);
                    
                    if (tagError) {
                        console.error('태그 조회 오류:', tagError);
                    }

                    // 단어 개수 가져오기
                    const { count, error: countError } = await supabase
                        .from('vocab_items')
                        .select('*', { count: 'exact', head: true })
                        .eq('vocab_list_id', list.id);
                    
                    if (countError) {
                        console.error('단어 개수 조회 오류:', countError);
                    }

                    return {
                        id: list.id,
                        title: list.title,
                        description: list.description,
                        tags: tagData?.map((t: any) => t.tags.name) || [],
                        count: count ?? 0,
                        expiresAt: list.expires_at,
                    };
                });

                const results = await Promise.all(promises);
                setResult(results);
                setLoading(false);
            } catch (error) {
                console.error('데이터 로드 오류:', error);
                setLoading(false);
            }
        };
        fetchAll();
    }, []);


    useEffect(() => {
        setRows(chunkArray(result, 3));
        console.log(rows);
        console.log(result);
    }, [result])


    return (
        <>
            <Header />
            <_.Container>
                <SearchBar value={search} onChange={handleSearch} onSearch={handleSearchClick} />
                {loading ? (
                    <_.CardListBox>
                        <_.CardListInner>
                            {[0, 1, 2].map(rowIdx => (
                                <_.Row key={rowIdx}>
                                    {[0, 1, 2].map(idx => (
                                        <div key={idx} style={{ width: '100%', margin: '0 8px' }}>
                                            <_.SkeletonCard />
                                        </div>
                                    ))}
                                </_.Row>
                            ))}
                        </_.CardListInner>
                    </_.CardListBox>
                ) : (
                    <_.CardListBox>
                        <_.CardListInner>
                            {rows.map((row, rowIdx) => (
                                <_.Row key={rowIdx}>
                                    {row.map((card, idx) => (
                                        <Vocard
                                            key={card.title + idx}
                                            id={card.id}
                                            tag={card.tags}
                                            title={card.title}
                                            count={card.count}
                                        />
                                    ))}
                                    {[...Array(3 - row.length)].map((_, index) => (
                                        <div key={`empty-${rowIdx}-${index}`} style={{ flex: 1, minWidth: 0 }} />
                                    ))}
                                </_.Row>
                            ))}
                        </_.CardListInner>
                    </_.CardListBox>
                )}
            </_.Container>
        </>
    );
};

export default CardList;