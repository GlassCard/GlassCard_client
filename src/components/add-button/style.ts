import styled from "@emotion/styled";

export const Container = styled.div`
    transition: all 0.3s ease;
    display: flex;
    width: 44px;
    height: 44px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 5.333px;
    border: 2.667px solid var(--Background-Fill, rgba(255, 255, 255, 0.10));
    background: rgba(242, 244, 254, 0.50);
    box-shadow: 0px 2.667px 13.333px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(10px);

    cursor: pointer;
    user-select: none;

    &:hover {
        background: var(--primary-hover);
        scale: 1.05;
    }

    &:active {
        background: var(--primary-active);
        scale: 0.95;
    }


`

export const Plus = styled.p`
    color: var(--primary-normal);
    font-family: "Pretendard Variable";
    font-size: 34.54px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 41.448px */
    background: transparent;
`;