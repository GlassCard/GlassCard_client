import * as _ from './style';
import EnableCheckbox from '@/assets/enabled-checkbox-in-vocab.svg';
import DisableCheckbox from '@/assets/disabled-checkbox-in-vocab.svg';

interface OnlyCorrectProps {
    checked: boolean;
    onChange: (value: boolean) => void;
}

const OnlyCorrect = ({ checked, onChange }: OnlyCorrectProps) => {
    const handleCheckbox = () => {
        onChange(!checked);
    };

    return (
        <_.Container>
            {checked ? <_.SelectedText>정확</_.SelectedText> : <_.Text>정확</_.Text>}
            <_.Checkbox 
                src={checked ? EnableCheckbox : DisableCheckbox} 
                alt="OnlyCorrect" 
                onClick={handleCheckbox} 
            />
        </_.Container>
    );
};

export default OnlyCorrect;