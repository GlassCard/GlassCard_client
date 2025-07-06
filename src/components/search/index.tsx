import * as _ from './style';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from "react-dom";
import categoryDown from '@/assets/category-down.svg';
import categoryUp from '@/assets/category-up.svg';
import Option from '@/components/option';
import { options } from './data';

const SearchBar = ({ 
    value, 
    onChange, 
    onSearch, 
    onCategorySelect,
    selectedCategories
}: { 
    value: string; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    onSearch: () => void;
    onCategorySelect?: (category: string) => void;
    selectedCategories?: string[];
}) => {
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
            <_.InputBox type='text' placeholder='제목을 입력하세요 ...' value={value} onChange={onChange}/>
            <_.BtnBox>
                <_.CategorySelectWrapper>
                    <_.CategorySelect ref={selectRef} onClick={handleClick}>
                        <_.CategoryPlaceholder>
                            {selectedCategories && selectedCategories.length > 0 
                                ? selectedCategories.join(", ") 
                                : "카테고리 선택"
                            }
                        </_.CategoryPlaceholder>
                        <_.CategoryImg src={isClicked ? categoryDown : categoryUp} />
                    </_.CategorySelect>
                                        {isClicked && createPortal(
                        <_.OptionBox style={{
                            position: "absolute",
                            left: optionPos.left,
                            top: optionPos.top,
                            zIndex: 3000
                        }}>
                            <_.OptionHeader>
                                <_.OptionTitle>카테고리 선택</_.OptionTitle>
                                <_.CloseButton onClick={() => setIsClicked(false)}>
                                    ✕
                                </_.CloseButton>
                            </_.OptionHeader>
                            {
                                options.map((item, index)=>(
                                    <Option 
                                        key={index}
                                        name={item.name} 
                                        isSelected={selectedCategories?.includes(item.name) || false}
                                        onClick={() => {
                                            onCategorySelect?.(item.name);
                                            // 카테고리 선택 시 드롭다운을 닫지 않음
                                        }}
                                    />
                                ))
                            }
                        </_.OptionBox>,
                        document.body
                    )}
                </_.CategorySelectWrapper>
                <_.SearchBtn onClick={() => {
                    onSearch();
                    setIsClicked(false); // 검색 버튼 클릭 시에만 드롭다운 닫기
                }}>
                    <_.SearchBtnText>
                        {window.location.pathname === '/make-card' 
                            ? (window.location.search.includes('edit=') ? '수정' : '만들기')
                            : '검색'
                        }
                    </_.SearchBtnText>
                </_.SearchBtn>
            </_.BtnBox>
        </_.Container>
    );
}

export default SearchBar;