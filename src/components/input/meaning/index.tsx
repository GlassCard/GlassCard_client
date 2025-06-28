import * as _ from './style';

interface MeaningInputProps {
    value: string;
    onChange: (value: string) => void;
}

const MeaningInput = ({ value, onChange }: MeaningInputProps) => {
    return (
        <_.Input
            placeholder="뜻을 입력하세요"
            value={value}
            onChange={e => onChange(e.target.value)}
            aria-label="뜻 입력"
        />
    );
};

export default MeaningInput; 