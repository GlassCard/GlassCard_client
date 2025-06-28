import Header from "@/components/header";
import SearchBar from '@/components/search';
import VocabRow from '@/components/vocab-row';
import AddButton from '@/components/add-button/index';
import Toast from '@/components/toast';
import * as _ from './style';
import { useMemo, useState } from 'react';
import { useVocabStore } from '@/store/vocabStore';

const MakeCard = () => {
    const { vocabList, addVocab, updateVocab, deleteVocab } = useVocabStore();
    const [toast, setToast] = useState({ isVisible: false, message: '' });

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
                <SearchBar />
                <_.VocabRowContainer>
                    {vocabRows}
                    <AddButton onClick={addVocab} />
                </_.VocabRowContainer>
            </_.Container>
            <Toast
                message={toast.message}
                isVisible={toast.isVisible}
                onClose={() => setToast({ isVisible: false, message: '' })}
                type="success"
            />
        </>
    );
};

export default MakeCard;