import * as _ from './style';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from "react-dom";
import categoryDown from '@/assets/category-down.svg';
import categoryUp from '@/assets/category-up.svg';
import checkBoxActive from '@/assets/checkBox-active.svg';
import checkBoxDisable from '@/assets/checkBox-disable.svg';

const SearchBar = () => {
    const [isClicked, setIsClicked] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const [optionPos, setOptionPos] = useState<{ left: number, top: number }>({ left: 0, top: 0 });

    const updateOptionPos = () => {
        if (selectRef.current) {
            const rect = selectRef.current.getBoundingClientRect();
            setOptionPos({
                left: rect.left + window.scrollX,
                top: rect.bottom + window.scrollY + 10
            });
        }
    };

    useEffect(() => {
        if (isClicked) {
            updateOptionPos();
            window.addEventListener("scroll", updateOptionPos);
            window.addEventListener("resize", updateOptionPos);
            return () => {
                window.removeEventListener("scroll", updateOptionPos);
                window.removeEventListener("resize", updateOptionPos);
            };
        }
    }, [isClicked]);

    const handleClick = () => {
        setIsClicked((prev) => !prev);
    };

    return (
        <_.Container>
            <_.InputBox type='text' placeholder='제목을 입력하세요 ...' />
            <_.BtnBox>
                <_.CategorySelectWrapper>
                    <_.CategorySelect ref={selectRef} onClick={handleClick}>
                        <_.CategoryPlaceholder>카테고리 선택</_.CategoryPlaceholder>
                        <_.CategoryImg src={isClicked ? categoryDown : categoryUp} />
                    </_.CategorySelect>
                    {isClicked && createPortal(
                        <_.OptionBox style={{
                            position: "absolute",
                            left: optionPos.left,
                            top: optionPos.top,
                            zIndex: 3000
                        }}>
                            <_.Option>
                                <_.OptionTitle>옵션 1</_.OptionTitle>
                                <_.CheckBox src={checkBoxActive}/>
                            </_.Option>
                            <_.Option>
                                <_.PlusCategory>새로운 카테고리 +</_.PlusCategory>
                            </_.Option>
                        </_.OptionBox>,
                        document.body
                    )}
                </_.CategorySelectWrapper>
                <_.SearchBtn>
                    <_.SearchBtnText>검색</_.SearchBtnText>
                </_.SearchBtn>
            </_.BtnBox>
        </_.Container>
    );
}

export default SearchBar;