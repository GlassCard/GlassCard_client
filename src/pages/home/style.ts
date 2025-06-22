import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const Card = styled.div`
    display: flex;
    width: 55%;
    max-width:868px;
    margin: auto;
    padding: 64px 32px;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    height:100%;
    border-radius: 64px;
    border: 8px solid var(--background-surface);
    background: var(--background-fill);

    /* 글래스처리 */
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(40px);
`

export const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    background-color:transparent;
`

export const Title = styled.p`
    color: var(--primary-darker);
    text-align: center;

    font-family: "Pretendard Variable";
    font-size: 48px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    background-color:transparent;
`

export const InnerCard = styled.div`
    display: flex;
    height: 246px;
    padding: 24px 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: var(--64px, 64px);
    border: 4px solid var(--background-surface);
    background: var(--background-fill);

    /* 글래스 인 글래스 */
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(50px);
`

export const InnerCardText = styled.p`
    color: var(--primary-darker);

    font-family: "Pretendard Variable";
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    background-color:transparent;
`

export const StartBtn = styled.div`
    display: flex;
    padding: 24px 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 64px;
    border: 4px solid var(--background-surface);
    background: rgba(45, 49, 87, 0.90);
    cursor: pointer;
`

export const StartBtnText = styled.p`
    color: var(--primary-light);

    font-family: "Pretendard Variable";
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    background-color:transparent;
`

export const Highlight = styled.span`
    color: var(--primary-dark);
    background-color:transparent;
`

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-40px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const FloatingImg = styled.img<{top : string, left: string, time: string}>`
    width: 240px;
    height: 273px;
    flex-shrink: 0;
    position:absolute;
    background-color:transparent;
    user-drag: none;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    left:${({ left }) => left};
    top:${({ top }) => top};
    animation: ${float} ${({ time }) => time} ease-in-out infinite;
`

