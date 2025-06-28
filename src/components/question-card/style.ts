import styled from '@emotion/styled';

export const QuestionCardStyled = styled.div`
    border-radius: 36px;
    border: 12px solid var(--background-surface);
    background: transparent;
    box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(60px);
    width: 100%;
    max-width: 600px;
    padding: 30px;
    box-sizing: border-box;

    /* 태블릿 */
    @media (max-width: 768px) {
        border-radius: 24px;
        border: 8px solid var(--background-surface);
        padding: 20px;
        max-width: 500px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        border-radius: 20px;
        border: 6px solid var(--background-surface);
        padding: 16px;
        max-width: 100%;
        margin: 0 10px;
    }
`;

export const InnerQuestionCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background: transparent;
    margin-bottom: 30px;

    /* 태블릿 */
    @media (max-width: 768px) {
        gap: 16px;
        margin-bottom: 24px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        gap: 12px;
        margin-bottom: 20px;
    }
`;

export const Buzzer = styled.img`
    width: 36px;
    height: 36px;
    aspect-ratio: 1/1;

    /* 태블릿 */
    @media (max-width: 768px) {
        width: 32px;
        height: 32px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        width: 28px;
        height: 28px;
    }
`;

export const QuestionCardTitle = styled.p`
    color: var(--text-primary);
    font-family: "Pretendard Variable";
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    text-align: center;
    margin: 0;

    /* 태블릿 */
    @media (max-width: 768px) {
        font-size: 28px;
        line-height: 130%;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        font-size: 24px;
        line-height: 140%;
    }
`;

export const MeaningContainer = styled.div`
    display: flex;
    padding: 15px 20px;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 100%;
    box-sizing: border-box;

    /* 태블릿 */
    @media (max-width: 768px) {
        padding: 12px 16px;
        gap: 12px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        padding: 10px 12px;
        gap: 10px;
    }
`;

export const InnerMeaningContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;

    /* 태블릿 */
    @media (max-width: 768px) {
        gap: 10px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        gap: 8px;
    }
`;

export const Meaning = styled.input`
    transition: all 0.2s ease;
    display: flex;
    height: 40px;
    padding: 15px;
    align-items: center;
    width: 100%;
    border-radius: 24px;
    background: var(--background-fill);
    border: 2px solid var(--primary-light-active);
    font-size: 16px;
    outline: none;
    box-sizing: border-box; 

    &::placeholder {
        color: var(--text-disabled);
    }

    &:focus {
        border-color: var(--primary-light-active);
        background: var(--background-fill);
    }

    /* 태블릿 */
    @media (max-width: 768px) {
        height: 36px;
        padding: 12px;
        border-radius: 20px;
        font-size: 15px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        height: 32px;
        padding: 10px;
        border-radius: 16px;
        font-size: 14px;
    }
`;

export const Hint = styled.p`
    color: var(--primary-normal);
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    margin: 0;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        color: var(--primary-darker);
        transform: scale(1.05);
    }

    /* 태블릿 */
    @media (max-width: 768px) {
        font-size: 15px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

export const HintButton = styled.p`
    color: var(--primary-normal);
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    margin: 0;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 8px 16px;
    border-radius: 20px;
    background: var(--background-fill);
    border: 1px solid var(--primary-light-active);

    &:hover {
        color: var(--primary-darker);
        background: var(--primary-light-active);
        transform: scale(1.05);
    }

    /* 태블릿 */
    @media (max-width: 768px) {
        font-size: 15px;
        padding: 6px 12px;
        border-radius: 16px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        font-size: 14px;
        padding: 5px 10px;
        border-radius: 14px;
    }
`;

export const HintText = styled.p`
    color: var(--text-primary);
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    margin: 0;
    padding: 8px 16px;
    border-radius: 20px;
    background: var(--correct-green-fill);
    border: 1px solid var(--correct-green-stroke);
    animation: fadeIn 0.3s ease-in;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* 태블릿 */
    @media (max-width: 768px) {
        font-size: 15px;
        padding: 6px 12px;
        border-radius: 16px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        font-size: 14px;
        padding: 5px 10px;
        border-radius: 14px;
    }
`;