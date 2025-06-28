import styled from "@emotion/styled";
import logo from '@/assets/logo.svg';

export const Container = styled.header`
    width:100%;
    background: rgba(255, 255, 255, 0.50);
    backdrop-filter: blur(15px);
    display: flex;
    height:100%;
    padding: 16px 64px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;

    /* 태블릿 */
    @media (max-width: 768px) {
        padding: 16px 32px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        padding: 16px 20px;
    }
`

export const Logo = styled.div`
    width: 54px;
    height: 57px;
    background-image: url(${logo});
    background-color:transparent;
    cursor: pointer;

    /* 태블릿 */
    @media (max-width: 768px) {
        width: 48px;
        height: 51px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        width: 42px;
        height: 45px;
    }
`

export const Nav = styled.nav`
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    align-items: flex-start;
    gap: 8px;
    background-color:transparent;

    /* 태블릿 */
    @media (max-width: 768px) {
        padding: 8px;
        gap: 6px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        padding: 6px;
        gap: 4px;
    }
`

export const NavA = styled.a<{ isSelected?: boolean }>`
    color: ${({ isSelected }) => isSelected ? 'var(--primary-normal)' : 'var(--text-primary)'};
    font-family: "Pretendard Variable";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    background-color:transparent;
    text-decoration-line: none;

    /* 태블릿 */
    @media (max-width: 768px) {
        font-size: 16px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        font-size: 14px;
    }
`

export const Contour = styled.p`
    color: var(--text-disabled);
    font-family: "Pretendard Variable";
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    background-color:transparent;
    opacity: 0.4;

    /* 태블릿 */
    @media (max-width: 768px) {
        font-size: 16px;
    }

    /* 모바일 */
    @media (max-width: 480px) {
        font-size: 14px;
    }
`