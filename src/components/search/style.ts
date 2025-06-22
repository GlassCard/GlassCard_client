import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    height: 110px;
    padding: 16px 24px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;

    border-radius: 24px;
    border: 8px solid var(--background-surface);
    background: var(--background-fill);
    box-sizing: border-box;

    /* 글래스처리 */
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(40px);
`

export const InputBox = styled.input`
    color: var(--text-primary);

    font-family: "Pretendard Variable";
    font-size: 24px;
    font-style: normal;
    width: 100%;
    font-weight: 600;
    line-height: 130%;
    border: none;
    outline: none;
    background:transparent;
    &::placeholder{
        color: var(--text-disabled);
    }
`

export const BtnBox = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    height:100%;
    background:transparent;
`

export const CategorySelect = styled.div`
    display: flex;
    width: 231px;
    padding: 0px 16px;
    justify-content:space-between;
    align-items: center;
    gap: 6px;
    border-radius: 6px;
    background: #FFF;
    box-shadow: 0px 3px 10.5px 0px rgba(0, 0, 0, 0.10);
    height:100%;
`

export const CategoryPlaceholder = styled.p`
    color: var(--text-disabled);
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    background:transparent;
`

export const SearchBtn = styled.div`
    display: flex;
    width: 88px;
    height: 100%;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 16px;
    border: 4px solid var(--background-fill);
    background: rgba(45, 49, 87, 0.80);
    box-sizing: border-box;

    /* 글래스 인 글래스 */
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(50px);
`

export const SearchBtnText = styled.p`
    color: var(--primary-light);

    /* text-lg */
    font-family: "Pretendard Variable";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 25.2px */
    background:transparent;
`

export const CategoryImg = styled.img`
    width: 12px;
    height: 9.5px;
    background:transparent;
`

export const OptionBox = styled.div`
    width: 263px;
    z-index: 2000;
    display: flex;
    background:transparent;
    flex-direction: column;
    align-items: center;
    gap: 1px;
    border-radius: 6px;
    background: #FFF;
    overflow: visible;
    box-sizing:border-box;
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.10);
    padding: 9px 12px;
    justify-content: space-between;
    align-self: stretch;
`

export const CategorySelectWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width:100%;
    height:100%;
    background:transparent;
`

