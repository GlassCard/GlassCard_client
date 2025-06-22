import * as _ from './style';

interface WordInputProps {
    value: string;
    onChange: (value: string) => void;
}

const WordInput = ({ value, onChange }: WordInputProps) => {
    return (
        <_.Input
            placeholder="단어를 입력하세요"
            value={value}
            onChange={e => onChange(e.target.value)}
            aria-label="단어 입력"
        />
    );
};

export default WordInput; 