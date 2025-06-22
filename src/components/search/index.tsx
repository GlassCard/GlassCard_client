import * as _ from './style';
import { useState } from 'react';
import categoryDown from '@/assets/category-down.svg';
import categoryUp from '@/assets/category-up.svg';

const SearchBar = () => {
    const [isClicked,setIsClicked] = useState(false);
    return(
        <_.Container>
            <_.InputBox type='text'placeholder='제목을 입력하세요 ...'/>
            <_.BtnBox>
                <_.CategorySelect  onClick={() => setIsClicked(!isClicked)}>
                    <_.CategoryPlaceholder>카테고리 선택</_.CategoryPlaceholder>
                    <_.CategoryImg src={isClicked ? categoryDown:categoryUp}/>
                </_.CategorySelect>
                <_.SearchBtn>
                    <_.SearchBtnText>검색</_.SearchBtnText>
                </_.SearchBtn>
            </_.BtnBox>
        </_.Container>
    );
}

export default SearchBar;