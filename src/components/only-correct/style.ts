import styled from "@emotion/styled";

export const Container = styled.div`
    transition: all 0.3s ease;
    display: flex;
    width: 5%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--4px, 4px);
    align-self: stretch;

    border-radius: var(--8px, 8px);
    border: 4px solid var(--background-fill);
    background: var(--background-fill);

    /* 글래스 인 글래스 */
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(50px);

    cursor: pointer;
    user-select: none;

    &:hover {
        scale: 1.05;
    }
`

export const Text = styled.p`
    color: var(--text-primary);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    background: transparent;
`;

export const SelectedText = styled.p`
    color: var(--text-primary);
    font-size: 12px;
    font-style: bold;
    font-weight: 700;
    line-height: 140%;
    background: transparent;
`;

export const Checkbox = styled.img`
    width: 24px;
    height: 24px;
    background: transparent;
`;