import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/header";
import { supabase } from '../card-list/data';
import * as _ from './style';

interface VocabItem {
    id: string;
    word: string;
    meaning: string;
    partOfSpeech?: string;
}

const VocabDetail = () => {
    const { vocabListId } = useParams<{ vocabListId: string }>();
    const navigate = useNavigate();
    const [vocabItems, setVocabItems] = useState<VocabItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVocabItems = async () => {
            try {
                // vocab_lists 테이블에서 단어장 정보와 items JSONB 가져오기
                const { data: vocabList, error: listError } = await supabase
                    .from('vocab_lists')
                    .select('id, title, items')
                    .eq('id', vocabListId)
                    .single();
                
                if (listError || !vocabList) {
                    console.error('단어장 조회 오류:', listError);
                    return;
                }
                
                // items JSONB에서 단어 목록 가져오기
                const items = vocabList.items || [];
                
                const vocabItems = items.map((item: any, index: number) => ({
                    id: `item-${index}`,
                    word: item.word || '',
                    meaning: item.meaning || '',
                    partOfSpeech: item.part_of_speech || ''
                }));
                
                setVocabItems(vocabItems);
                setLoading(false);
            } catch (error) {
                console.error('데이터 로드 오류:', error);
                setLoading(false);
            }
        };
        
        if (vocabListId) {
            fetchVocabItems();
        }
    }, [vocabListId]);

    const handleStartStudy = () => {
        navigate(`/study/${vocabListId}`);
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <>
            <Header />
            <_.Container>
                <_.Title>단어장 상세</_.Title>
                <_.WordList>
                    {vocabItems.map((item, index) => (
                        <_.WordItem key={item.id}>
                            <_.WordNumber>{index + 1}</_.WordNumber>
                            <_.WordContent>
                                <_.Word>{item.word}</_.Word>
                                <_.Meaning>{item.meaning}</_.Meaning>
                                {item.partOfSpeech && (
                                    <_.PartOfSpeech>{item.partOfSpeech}</_.PartOfSpeech>
                                )}
                            </_.WordContent>
                        </_.WordItem>
                    ))}
                </_.WordList>
                <_.StartButton onClick={handleStartStudy}>
                    학습 시작
                </_.StartButton>
            </_.Container>
        </>
    );
};

export default VocabDetail; 