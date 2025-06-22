import * as _ from './style';

interface ExampleInputProps {
    value: string;
    onChange: (value: string) => void;
}

const ExampleInput = ({ value, onChange }: ExampleInputProps) => {
    return (
        <_.Input
            placeholder="예문을 입력하세요"
            value={value}
            onChange={e => onChange(e.target.value)}
            aria-label="예문 입력"
        />
    );
};

export default ExampleInput;