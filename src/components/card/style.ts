import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    width: 100%;
    min-height: calc(100vh - 89px); /* 헤더 높이(16px*2 + 57px)를 고려한 최소 높이 */
    padding: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    background: transparent;
    margin-top: 89px; /* 헤더 높이만큼 상단 여백 추가 */

    /* 태블릿 */
    @media (max-width: 768px) {
        padding: 16px;
        gap: 24px;
        margin-top: 83px; /* 헤더 높이(16px*2 + 51px) 조정 */
        min-height: calc(100vh - 83px);
    }

    /* 모바일 */
    @media (max-width: 480px) {
        padding: 12px;
        gap: 20px;
        margin-top: 77px; /* 헤더 높이(16px*2 + 45px) 조정 */
        min-height: calc(100vh - 77px);
    }
`;

export const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 916px;
    width: 100%;
    background: transparent;

    /* 태블릿 */
    @media (max-width: 768px) {
        gap: 16px;
        max-width: 100%;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        gap: 12px;
        max-width: 100%;
    }
`;

export const Counter = styled.p`
    color: var(--text-primary);
    font-family: "Pretendard Variable";
    font-size: 24px;
    font-weight: 600;
    margin: 0;
    background: transparent;

    /* 태블릿 */
    @media (max-width: 768px) {
        font-size: 22px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

export const CurrentCounter = styled.span`
    color: var(--primary-normal);
    font-family: "Pretendard Variable";
    font-size: 24px;
    font-weight: 600;
    margin: 0;
    background: transparent;

    /* 태블릿 */
    @media (max-width: 768px) {
        font-size: 22px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        font-size: 20px;
    }
`;

export const TotalCounter = styled.span`
    margin-left: 5px;
    color: var(--text-primary);
    font-family: "Pretendard Variable";
    font-size: 24px;
    font-weight: 600;
    margin: 0;
    background: transparent;

    /* 태블릿 */
    @media (max-width: 768px) {
        font-size: 22px;
        margin-left: 4px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        font-size: 20px;
        margin-left: 3px;
    }
`;

export const CardContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 800px;
    flex-direction: column;
    align-items: center;
    background: transparent;
    margin-bottom: 30px;

    /* 태블릿 */
    @media (max-width: 768px) {
        max-width: 100%;
        margin-bottom: 24px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        max-width: 100%;
        margin-bottom: 20px;
    }
`;