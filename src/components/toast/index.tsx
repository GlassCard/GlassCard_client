import * as _ from './style';
import { useEffect, useState } from 'react';

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    type?: 'success' | 'error' | 'info';
}

const Toast = ({ message, isVisible, onClose, type = 'success' }: ToastProps) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(false);
            const timer = setTimeout(() => {
                setIsAnimating(true);
                setTimeout(() => {
                    onClose();
                }, 300); // 애니메이션 시간만큼 대기
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <_.Container type={type} isAnimating={isAnimating}>
            <_.Message>{message}</_.Message>
            <_.CloseButton onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                    onClose();
                }, 300);
            }}>×</_.CloseButton>
        </_.Container>
    );
};

export default Toast; 