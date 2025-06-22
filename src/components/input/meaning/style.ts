import styled from "@emotion/styled";

export const Input = styled.input`
    transition: all 0.3s ease;
    display: flex;
    width: 25%;
    height: 66px;
    padding: var(--8px, 8px) var(--16px, 16px);
    align-items: center;
    gap: var(--8px, 8px);

    border-radius: var(--16px, 16px);
    border: 4px solid var(--background-surface);
    background: var(--background-fill);

    /* 글래스 인 글래스 */
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(50px);

    color: var(--text-primary);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;

    &::placeholder {
        color: var(--text-disabled);
    }

    &:focus {
        color: var(--text-primary);
        border: 4px solid var(--primary-normal);
        background: var(--primary-light);
    }
` 