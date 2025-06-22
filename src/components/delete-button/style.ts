import styled from "@emotion/styled";

export const Container = styled.div`
    transition: all 0.3s ease;
    display: flex;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    aspect-ratio: 1/1;

    border-radius: 4px;
    background: rgba(239, 68, 68, 1);

    cursor: pointer;
    user-select: none;

    &:hover {
        scale: 1.05;
    }

    &:active {
        scale: 0.95;
    }
`;

export const Delete = styled.p`
    width: 12px;
    height: 3px;
    flex-shrink: 0;
    color: #fff;
    `;
