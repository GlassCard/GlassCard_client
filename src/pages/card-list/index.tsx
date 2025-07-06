import Header from "@/components/header";
import * as _ from './style';
import SearchBar from "@/components/search";
import Vocard from "@/components/vocard";
import { supabase, type CardItem } from "./data";
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
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        // 실시간 검색을 위해 query도 함께 업데이트
        setQuery(e.target.value);
    };

    const handleSearchClick = () => {
        setQuery(search); // 버튼 클릭 시에만 query 변경
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                // 이미 선택된 카테고리면 제거
                return prev.filter(cat => cat !== category);
            } else {
                // 선택되지 않은 카테고리면 추가
                return [...prev, category];
            }
        });
        // 카테고리 선택 시 즉시 필터링 적용
    };

    useEffect(() => {
        let filtered = result;
        
        // 제목 검색
        if (query) {
            filtered = filtered.filter(card => 
                card.title.toLowerCase().includes(query.toLowerCase())
            );
        }
        
        // 카테고리 필터링
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(card => 
                selectedCategories.some(selectedCat => 
                    card.tags.some(tag => tag.toLowerCase().includes(selectedCat.toLowerCase()))
                )
            );
        }
        
        setRows(chunkArray(filtered, 3));
    }, [result, query, selectedCategories]);

    useEffect(() => {
        const fetchAll = async () => {
            // select id, title, tags, items from vocab_lists
            const { data: listData, error: listError } = await supabase
                .from('vocab_lists')
                .select('id, title, tags, items');
            if (listError) {
                console.error(listError);
                return;
            }
            // 각 단어카드마다 count 애트리뷰트 추가
            const promises = (listData ?? []).map(async (list: any) => {
                // items JSONB에서 단어 개수 계산
                const items = list.items || [];
                const count = items.length;
                
                return {
                    id: list.id,
                    title: list.title,
                    tags: list.tags || [],
                    count: count,
                    expiresAt: list.expiresAt || new Date().toISOString(),
                };
            });
            const results = await Promise.all(promises);
            setResult(results);
            setLoading(false);
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
                <SearchBar 
                    value={search} 
                    onChange={handleSearch} 
                    onSearch={handleSearchClick} 
                    onCategorySelect={handleCategorySelect}
                    selectedCategories={selectedCategories}
                />
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
                        {rows.length === 0 && (query || selectedCategories.length > 0) ? (
                            <_.NoResultMessage>
                                검색 결과가 없습니다.
                                <br />
                                다른 키워드나 카테고리로 검색해보세요.
                            </_.NoResultMessage>
                        ) : (
                            <_.CardListInner>
                                {rows.map((row, rowIdx) => (
                                    <_.Row key={rowIdx}>
                                        {row.map((card, idx) => (
                                            <Vocard
                                                key={card.title + idx}
                                                tag={card.tags}
                                                title={card.title}
                                                count={card.count}
                                                id={card.id}
                                                expiresAt={card.expiresAt}
                                            />
                                        ))}
                                        {[...Array(3 - row.length)].map((_, index) => (
                                            <div key={`empty-${rowIdx}-${index}`} style={{ flex: 1, minWidth: 0 }} />
                                        ))}
                                    </_.Row>
                                ))}
                            </_.CardListInner>
                        )}
                    </_.CardListBox>
                )}
            </_.Container>
        </>
    );
};

export default CardList;