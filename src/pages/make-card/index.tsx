import Header from "@/components/header";
import SearchBar from '@/components/search';
import VocabRow from '@/components/vocab-row';
import AddButton from '@/components/add-button/index';
import Toast from '@/components/toast';
import CreateVocabModal from '@/components/create-vocab-modal';
import * as _ from './style';
import { useMemo, useState, useEffect } from 'react';
import { useVocabStore } from '@/store/vocabStore';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/pages/card-list/data';

const MakeCard = () => {
    const { vocabList, addVocab, updateVocab, deleteVocab, setVocabList } = useVocabStore();
    const [toast, setToast] = useState({ isVisible: false, message: '' });
    const [, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const editId = searchParams.get('edit');
    const accessKey = searchParams.get('key');
    const [, setTitle] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // 편집 모드일 때 기존 단어장 로드
    useEffect(() => {
        if (editId && accessKey) {
            loadExistingVocabList();
        }
    }, [editId, accessKey]);

    const loadExistingVocabList = async () => {
        setLoading(true);
        try {
            // Access Key 검증
            const { data: vocabList, error: listError } = await supabase
                .from('vocab_lists')
                .select('*')
                .eq('id', editId)
                .eq('access_key', accessKey)
                .single();

            if (listError || !vocabList) {
                setToast({ isVisible: true, message: '잘못된 Access Key입니다.' });
                return;
            }

            // 제목 설정
            setTitle(vocabList.title);
            setSearchValue(vocabList.title);

            // items JSONB에서 단어 목록 가져오기
            const items = vocabList.items || [];
            
            // VocabData 형식으로 변환
            const formattedVocabList = items.map((item: any, index: number) => ({
                id: `vocab-${index}`,
                word: item.word || '',
                meaning: item.meaning || '',
                example: item.example || '',
                isCorrect: false,
            }));

            setVocabList(formattedVocabList);
            setToast({ isVisible: true, message: '단어장이 로드되었습니다.' });
        } catch (error) {
            console.error(error);
            setToast({ isVisible: true, message: '오류가 발생했습니다.' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id: string) => {
        deleteVocab(id);
        if (toast.isVisible) {
            setToast({ isVisible: false, message: '' });
            setTimeout(() => {
                setToast({ isVisible: true, message: '단어가 삭제되었습니다.' });
            }, 100);
        } else {
            setToast({ isVisible: true, message: '단어가 삭제되었습니다.' });
        }
    };

    const handleCreateOrUpdate = async () => {
        if (!searchValue.trim()) {
            setToast({ isVisible: true, message: '제목을 입력해주세요.' });
            return;
        }

        if (vocabList.length === 0) {
            setToast({ isVisible: true, message: '최소 하나의 단어를 입력해주세요.' });
            return;
        }

        try {
            if (editId && accessKey) {
                // 수정 모드: 기존 단어장 업데이트
                await updateExistingVocabList();
            } else {
                // 새로 만들기 모드: 설정 모달 열기
                setIsCreateModalOpen(true);
            }
        } catch (error) {
            console.error(error);
            setToast({ isVisible: true, message: '오류가 발생했습니다.' });
        }
    };

    const handleDeleteVocabList = async () => {
        if (!editId || !accessKey) {
            console.log('삭제 조건 확인 실패:', { editId, accessKey });
            setToast({ isVisible: true, message: '삭제할 수 없습니다.' });
            return;
        }

        // 사용자 확인
        if (!window.confirm('정말로 이 단어장을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) {
            return;
        }

        console.log('삭제 시작:', { editId, accessKey });

        try {
            // 먼저 단어장이 존재하는지 확인
            const { data: existingVocab, error: checkError } = await supabase
                .from('vocab_lists')
                .select('id, title')
                .eq('id', editId)
                .eq('access_key', accessKey)
                .single();

            if (checkError || !existingVocab) {
                console.error('단어장 확인 실패:', checkError);
                setToast({ isVisible: true, message: '단어장을 찾을 수 없습니다.' });
                return;
            }

            console.log('삭제할 단어장:', existingVocab);

            // 단어장 삭제
            const { error: deleteError } = await supabase
                .from('vocab_lists')
                .delete()
                .eq('id', editId)
                .eq('access_key', accessKey);

            if (deleteError) {
                console.error('삭제 오류:', deleteError);
                setToast({ isVisible: true, message: `단어장 삭제에 실패했습니다: ${deleteError.message}` });
                return;
            }

            console.log('삭제 성공');
            setToast({ isVisible: true, message: '단어장이 삭제되었습니다.' });
            
            // 삭제 후 카드 목록 페이지로 이동
            setTimeout(() => {
                window.location.href = '/card-list';
            }, 1500);
        } catch (error) {
            console.error('삭제 중 오류:', error);
            setToast({ isVisible: true, message: '오류가 발생했습니다.' });
        }
    };

    const updateExistingVocabList = async () => {
        // 단어 목록을 JSONB 형태로 변환
        const items = vocabList
            .filter(vocab => vocab.word.trim() && vocab.meaning.trim())
            .map(vocab => ({
                word: vocab.word,
                meaning: vocab.meaning,
                example: vocab.example,
            }));

        // 단어장 업데이트 (제목과 items JSONB)
        const { error: updateError } = await supabase
            .from('vocab_lists')
            .update({ 
                title: searchValue,
                items: items
            })
            .eq('id', editId)
            .eq('access_key', accessKey);

        if (updateError) {
            console.error(updateError);
            setToast({ isVisible: true, message: '단어장 수정에 실패했습니다.' });
            return;
        }

        setToast({ isVisible: true, message: '단어장이 수정되었습니다.' });
    };

    const createNewVocabList = async (accessKey: string, expiresAt: string, categories: string[]) => {
        try {
            // 단어 목록을 JSONB 형태로 변환
            const items = vocabList
                .filter(vocab => vocab.word.trim() && vocab.meaning.trim())
                .map(vocab => ({
                    word: vocab.word,
                    meaning: vocab.meaning,
                    example: vocab.example,
                }));

            // 새 단어장 생성
            const { data, error } = await supabase
                .from('vocab_lists')
                .insert({
                    title: searchValue,
                    items: items,
                    access_key: accessKey,
                    expires_at: expiresAt,
                    tags: categories
                })
                .select()
                .single();

            if (error) {
                console.error('단어장 생성 오류:', error);
                setToast({ isVisible: true, message: '단어장 생성에 실패했습니다.' });
                return;
            }

            setToast({ isVisible: true, message: '새 단어장이 생성되었습니다.' });
            
            // 생성 후 카드 목록 페이지로 이동
            setTimeout(() => {
                window.location.href = '/card-list';
            }, 1500);
        } catch (error) {
            console.error('단어장 생성 중 오류:', error);
            setToast({ isVisible: true, message: '오류가 발생했습니다.' });
        }
    };

    const vocabRows = useMemo(() => 
        vocabList.map(vocab => (
            <VocabRow
                key={vocab.id}
                id={vocab.id}
                data={vocab}
                onUpdate={updateVocab}
                onDelete={handleDelete}
            />
        )), [vocabList, updateVocab, handleDelete]
    );

    return (
        <>
            <Header />
            <_.Container>
                <SearchBar 
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onSearch={handleCreateOrUpdate}
                />
                <_.VocabRowContainer>
                    {vocabRows}
                    <AddButton onClick={addVocab} />
                </_.VocabRowContainer>
                {editId && accessKey && (
                    <_.ButtonContainer>
                        <_.DeleteButton onClick={handleDeleteVocabList}>
                            단어장 삭제
                        </_.DeleteButton>
                    </_.ButtonContainer>
                )}
                {/* 디버깅용 정보 */}
                <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                    editId: {editId || '없음'}, accessKey: {accessKey ? '있음' : '없음'}
                </div>
            </_.Container>
            <Toast
                message={toast.message}
                isVisible={toast.isVisible}
                onClose={() => setToast({ isVisible: false, message: '' })}
                type="success"
            />
            <CreateVocabModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={createNewVocabList}
                title={searchValue}
            />
        </>
    );
};

export default MakeCard;