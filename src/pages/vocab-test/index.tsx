import { useState } from 'react';
import VocabRow from '@/components/vocab-row';

interface VocabData {
    id: string;
    word: string;
    meaning: string;
    example: string;
    isCorrect: boolean;
}

const VocabTest = () => {
    const [vocabData, setVocabData] = useState<VocabData[]>([
        {
            id: '1',
            word: '',
            meaning: '',
            example: '',
            isCorrect: false
        }
    ]);

    const handleUpdate = (id: string, field: keyof Omit<VocabData, 'id'>, value: string | boolean) => {
        setVocabData(prev => prev.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleDelete = (id: string) => {
        setVocabData(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div>
            {vocabData.map(item => (
                <VocabRow
                    key={item.id}
                    id={item.id}
                    data={item}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default VocabTest; 