import * as _ from './style';
import checkBoxActive from '@/assets/checkBox-active.svg';
import checkBoxDisable from '@/assets/checkBox-disable.svg';
import { useState } from 'react';

interface PropsInterface{
    name: string,

}

const Option = ({name} : PropsInterface) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <_.Option onClick={()=>setIsChecked(!isChecked)}>
            <_.OptionTitle>{name}</_.OptionTitle>
            <_.CheckBox src={isChecked ? checkBoxActive : checkBoxDisable} />
        </_.Option>
    );
}

export default Option;