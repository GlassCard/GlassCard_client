import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    padding: 64px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    background: transparent;
`;

export const VocabRowContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    align-self: stretch;
    background: transparent;
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    background: transparent;
`;

export const DeleteButton = styled.button`
    display: flex;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    border: 2px solid #ff4757;
    background: rgba(255, 71, 87, 0.1);
    color: #ff4757;
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    background: transparent;

    &:hover {
        background: rgba(255, 71, 87, 0.2);
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
`;