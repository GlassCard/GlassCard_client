import * as _ from './style';
import checkBoxActive from '@/assets/checkBox-active.svg';
import checkBoxDisable from '@/assets/checkBox-disable.svg';

interface PropsInterface{
    name: string;
    onClick?: () => void;
    isSelected?: boolean;
}

const Option = ({name, onClick, isSelected} : PropsInterface) => {
    const handleClick = () => {
        onClick?.();
    };

    return (
        <_.Option onClick={handleClick}>
            <_.OptionTitle>{name}</_.OptionTitle>
            <_.CheckBox src={isSelected ? checkBoxActive : checkBoxDisable} />
        </_.Option>
    );
}

export default Option;