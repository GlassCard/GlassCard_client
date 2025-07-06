import { useState, useRef, useEffect } from 'react';
import * as _ from './style';
import { options } from '@/components/search/data';
import Option from '@/components/option';
import categoryDown from '@/assets/category-down.svg';
import categoryUp from '@/assets/category-up.svg';

interface CreateVocabModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (accessKey: string, expiresAt: string, categories: string[]) => void;
    title: string;
}

const CreateVocabModal = ({ isOpen, onClose, onSubmit, title }: CreateVocabModalProps) => {
    const [accessKey, setAccessKey] = useState('');
    const [expiresAt, setExpiresAt] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const categoryRef = useRef<HTMLDivElement>(null);
    const [categoryPos, setCategoryPos] = useState<{ left: number, top: number }>({ left: 0, top: 0 });

    const updateCategoryPos = () => {
        if (categoryRef.current) {
            const rect = categoryRef.current.getBoundingClientRect();
            setCategoryPos({
                left: rect.left + window.scrollX,
                top: rect.bottom + window.scrollY + 10
            });
        }
    };

    useEffect(() => {
        if (isCategoryOpen) {
            updateCategoryPos();
            window.addEventListener("scroll", updateCategoryPos);
            window.addEventListener("resize", updateCategoryPos);
            
            // ESC 키로 드롭다운 닫기
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    setIsCategoryOpen(false);
                }
            };
            
            document.addEventListener("keydown", handleKeyDown);
            
            return () => {
                window.removeEventListener("scroll", updateCategoryPos);
                window.removeEventListener("resize", updateCategoryPos);
                document.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [isCategoryOpen]);

    const handleCategorySelect = (category: string) => {
        console.log('카테고리 선택:', category);
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                const newCategories = prev.filter(cat => cat !== category);
                console.log('카테고리 제거됨:', newCategories);
                return newCategories;
            } else {
                const newCategories = [...prev, category];
                console.log('카테고리 추가됨:', newCategories);
                return newCategories;
            }
        });
        // 카테고리 선택 시 드롭다운을 닫지 않음
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (accessKey.trim() && expiresAt) {
            onSubmit(accessKey, expiresAt, selectedCategories);
            setAccessKey('');
            setExpiresAt('');
            setSelectedCategories([]);
            onClose();
        }
    };

    const handleCancel = () => {
        setAccessKey('');
        setExpiresAt('');
        setSelectedCategories([]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <_.Overlay onClick={handleCancel}>
            <_.Modal onClick={(e) => e.stopPropagation()}>
                <_.Title>단어장 설정</_.Title>
                <_.SubTitle>{title} 단어장을 생성하기 위한 설정을 입력해주세요.</_.SubTitle>
                <_.Form onSubmit={handleSubmit}>
                    <_.InputGroup>
                        <_.Label>Access Key</_.Label>
                        <_.Input
                            type="password"
                            placeholder="Access Key를 입력하세요"
                            value={accessKey}
                            onChange={(e) => setAccessKey(e.target.value)}
                            required
                            autoFocus
                        />
                    </_.InputGroup>
                    <_.InputGroup>
                        <_.Label>만료 시간</_.Label>
                        <_.Input
                            type="datetime-local"
                            value={expiresAt}
                            onChange={(e) => setExpiresAt(e.target.value)}
                            required
                        />
                    </_.InputGroup>
                    <_.InputGroup>
                        <_.Label>카테고리</_.Label>
                        <_.CategorySelectWrapper>
                            <_.CategorySelect ref={categoryRef} onClick={(e) => {
                                e.stopPropagation();
                                console.log('카테고리 드롭다운 클릭, 현재 상태:', isCategoryOpen);
                                setIsCategoryOpen(!isCategoryOpen);
                            }}>
                                <_.CategoryPlaceholder>
                                    {selectedCategories.length > 0 
                                        ? selectedCategories.join(", ") 
                                        : "카테고리 선택 (선택사항)"
                                    }
                                </_.CategoryPlaceholder>
                                <_.CategoryImg src={isCategoryOpen ? categoryDown : categoryUp} />
                            </_.CategorySelect>
                            {isCategoryOpen && (
                                <_.CategoryDropdown 
                                    data-category-dropdown
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {options.map((item, index) => (
                                        <Option 
                                            key={index}
                                            name={item.name} 
                                            isSelected={selectedCategories.includes(item.name)}
                                            onClick={() => handleCategorySelect(item.name)}
                                        />
                                    ))}
                                </_.CategoryDropdown>
                            )}
                        </_.CategorySelectWrapper>
                    </_.InputGroup>
                    <_.ButtonContainer>
                        <_.CancelButton type="button" onClick={handleCancel}>
                            취소
                        </_.CancelButton>
                        <_.SubmitButton type="submit" disabled={!accessKey.trim() || !expiresAt}>
                            생성
                        </_.SubmitButton>
                    </_.ButtonContainer>
                </_.Form>
            </_.Modal>
        </_.Overlay>
    );
};

export default CreateVocabModal; 