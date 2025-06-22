import styled from "@emotion/styled";

interface ContainerProps {
    type: 'success' | 'error' | 'info';
    isAnimating: boolean;
}

export const Container = styled.div<ContainerProps>`
    transition: all 0.3s ease-out;
    position: fixed;
    top: 40px;
    left: 50%;
    transform: translateX(-50%) ${({ isAnimating }) => isAnimating ? 'translateY(-100%)' : 'translateY(0)'};
    opacity: ${({ isAnimating }) => isAnimating ? 0 : 1};
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-radius: 12px;
    background: ${({ type }) => {
        switch (type) {
            case 'success':
                return 'var(--primary-darker)';
            case 'error':
                return '#ff4757';
            case 'info':
                return '#3742fa';
            default:
                return 'var(--primary-darker)';
        }
    }};
    color: white;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    z-index: 1000;
    animation: slideDown 0.3s ease-out;

    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
`;

export const Message = styled.span`
    background: transparent;
    flex: 1;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`; 