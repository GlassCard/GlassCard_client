import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    padding: 16px;
    align-items: center;
    gap: 16px;
    align-self: stretch;

    border-radius: 16px;
    border: 8px solid var(--background-surface);
    background: var(--background-fill);

    // 글래스 인 글래스
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(50px);
`;