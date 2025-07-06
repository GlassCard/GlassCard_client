import { useState, useEffect } from 'react';
import * as _ from './style';

interface AccessKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (accessKey: string) => void;
    title: string;
    hasError?: boolean;
}

const AccessKeyModal = ({ isOpen, onClose, onSubmit, title, hasError = false }: AccessKeyModalProps) => {
    const [accessKey, setAccessKey] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (accessKey.trim()) {
            onSubmit(accessKey);
            // onClose()는 onSubmit에서 성공 시에만 호출하도록 수정
        }
    };

    // 에러가 있으면 입력값 초기화
    useEffect(() => {
        if (hasError && accessKey) {
            setAccessKey('');
        }
    }, [hasError, accessKey]);

    if (!isOpen) return null;

    return (
        <_.Overlay onClick={onClose}>
            <_.Modal onClick={(e) => e.stopPropagation()}>
                <_.Title>Access Key 입력</_.Title>
                <_.SubTitle>{title} 단어장을 수정하려면 Access Key가 필요합니다.</_.SubTitle>
                <_.Form onSubmit={handleSubmit}>
                    <_.Input
                        type="password"
                        placeholder="Access Key를 입력하세요"
                        value={accessKey}
                        onChange={(e) => setAccessKey(e.target.value)}
                        autoFocus
                        hasError={hasError}
                    />
                    <_.ButtonContainer>
                        <_.CancelButton type="button" onClick={onClose}>
                            취소
                        </_.CancelButton>
                        <_.SubmitButton type="submit">
                            확인
                        </_.SubmitButton>
                    </_.ButtonContainer>
                </_.Form>
            </_.Modal>
        </_.Overlay>
    );
};

export default AccessKeyModal; 