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
    max-width: 450px;
    backdrop-filter: blur(40px);
    box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.15);
    position: relative;
    overflow: visible;
    
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
    overflow: visible;
`;

export const InputGroup = styled.div`
    background: transparent;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const Label = styled.label`
    background: transparent;
    color: var(--text-primary);
    font-family: "Pretendard Variable";
    font-size: 14px;
    font-weight: 500;
`;

export const Input = styled.input`
    width: 100%;
    padding: 16px;
    border: 2px solid var(--background-surface);
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
        border-color: var(--primary-normal);
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.1);
    }

    &::placeholder {
        color: var(--text-disabled);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const ButtonContainer = styled.div`
    background: transparent;
    display: flex;
    gap: 12px;
    margin-top: 8px;
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

    &:hover:not(:disabled) {
        background: var(--primary-normal-active);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(129, 140, 248, 0.4);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
    }
`;

export const CategorySelectWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    background: transparent;
    overflow: visible;
`;

export const CategorySelect = styled.div`
    display: flex;
    width: 100%;
    padding: 16px;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    border-radius: 12px;
    border: 2px solid var(--background-surface);
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: all 0.2s;
    backdrop-filter: blur(10px);
    box-sizing: border-box;

    &:hover {
        border-color: var(--primary-normal);
        background: rgba(255, 255, 255, 0.15);
    }
`;

export const CategoryPlaceholder = styled.span`
    color: var(--text-primary);
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-weight: 400;
    background: transparent;
    flex: 1;
    text-align: left;
`;

export const CategoryImg = styled.img`
    width: 12px;
    height: 9.5px;
    background: transparent;
`;

export const CategoryDropdown = styled.div`
    width: 100%;
    min-width: 200px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
    border-radius: 12px;
    background: #FFF;
    overflow: visible;
    box-sizing: border-box;
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.10);
    padding: 9px 12px;
    justify-content: space-between;
    align-self: stretch;
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 4px;
`; 