import * as _ from './style';
import WordInput from '@/components/input/word/index';
import MeaningInput from '@/components/input/meaning/index';
import ExampleInput from '@/components/input/example/index';
import OnlyCorrect from '@/components/only-correct/index';
import DeleteButton from '@/components/delete-button/index';

interface VocabData {
    id: string;
    word: string;
    meaning: string;
    example: string;
    isCorrect: boolean;
}

interface VocabRowProps {
    id: string;
    data: VocabData;
    onUpdate: (id: string, field: keyof Omit<VocabData, 'id'>, value: string | boolean) => void;
    onDelete: (id: string) => void;
}

const VocabRow = ({ id, data, onUpdate, onDelete }: VocabRowProps) => {
    const handleWordChange = (value: string) => {
        onUpdate(id, 'word', value);
    };

    const handleMeaningChange = (value: string) => {
        onUpdate(id, 'meaning', value);
    };

    const handleExampleChange = (value: string) => {
        onUpdate(id, 'example', value);
    };

    const handleCorrectChange = (value: boolean) => {
        onUpdate(id, 'isCorrect', value);
    };

    return (
        <_.Container>
            <DeleteButton onClick={() => onDelete(id)} />
            <WordInput value={data.word} onChange={handleWordChange} />
            <MeaningInput value={data.meaning} onChange={handleMeaningChange} />
            <ExampleInput value={data.example} onChange={handleExampleChange} />
            <OnlyCorrect checked={data.isCorrect} onChange={handleCorrectChange} />
        </_.Container>
    );
};

export default VocabRow;