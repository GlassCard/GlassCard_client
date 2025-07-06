import styled from '@emotion/styled';

export const Overlay = styled.div`
    background: transparent;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const Modal = styled.div`
    background: rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    border: 2px solid var(--background-surface);
    padding: 32px;
    width: 90%;
    max-width: 400px;
    backdrop-filter: blur(40px);
    box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.15);
    position: relative;
    overflow: hidden;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
        border-radius: 24px;
        z-index: -1;
    }
`;

export const Title = styled.h2`
    background: transparent;
    color: var(--primary-light);
    font-family: "Pretendard Variable";
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 8px 0;
    text-align: center;
`;

export const SubTitle = styled.p`
    background: transparent;
    color: var(--primary-light);
    font-family: "Pretendard Variable";
    font-size: 14px;
    margin: 0 0 24px 0;
    text-align: center;
    line-height: 1.4;
`;

export const Form = styled.form`
    background: transparent;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Input = styled.input<{ hasError?: boolean }>`
    width: 100%;
    padding: 16px;
    border: 2px solid ${props => props.hasError ? '#ff4757' : 'var(--background-surface)'};
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
    font-family: "Pretendard Variable";
    font-size: 16px;
    outline: none;
    transition: all 0.2s;
    backdrop-filter: blur(10px);
    box-sizing: border-box;

    &:focus {
        border-color: ${props => props.hasError ? '#ff4757' : 'var(--primary-normal)'};
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 0 4px ${props => props.hasError ? 'rgba(255, 71, 87, 0.1)' : 'rgba(129, 140, 248, 0.1)'};
    }

    &::placeholder {
        color: var(--text-disabled);
    }
`;

export const ButtonContainer = styled.div`
    background:transparent;
    display: flex;
    gap: 12px;
`;

export const CancelButton = styled.button`
    flex: 1;
    padding: 12px;
    border: 2px solid var(--background-surface);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    backdrop-filter: blur(10px);

    &:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: var(--primary-light-active);
        transform: translateY(-1px);
    }
`;

export const SubmitButton = styled.button`
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 12px;
    background: var(--primary-normal);
    color: white;
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 8px rgba(129, 140, 248, 0.3);

    &:hover {
        background: var(--primary-normal-active);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(129, 140, 248, 0.4);
    }
`; 