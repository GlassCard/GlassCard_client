import styled from "@emotion/styled";


export const Container = styled.div`
    display: flex;
    flex:1;
    min-width: 0;
    height: 207px;
    padding: 16px 24px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    border-radius: 24px;
    border: 8px solid var(--background-surface);
    background: var(--background-fill);
    cursor: pointer;
    transition: transform 0.2s ease;

    /* 글래스처리 */
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(40px);
    
    &:hover {
        transform: translateY(-2px);
    }
`

export const TagContainer = styled.div`
    display: flex;
    padding: 4px;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
    background-color:transparent;
`

export const TextContainer = styled.div`
    display: flex;
    padding: 0px 4px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    background-color:transparent;
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    align-self: stretch;    
    background-color:transparent;
`

export const ModifyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    align-self: stretch;    
    background-color:transparent;
`

export const Tag = styled.div`
    display: flex;
    padding: 4px 8px;
    align-items: center;
    gap: 4px;
    border-radius: 16px;
    border: 1px solid var(--primary-normal);
    background: var(--primary-light-active);
`

export const TagText = styled.span`
    color: var(--text-primary);

    font-family: "Pretendard Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    background-color:transparent;
`

export const Title = styled.p`
    color: var(--text-primary);

    font-family: "Pretendard Variable";
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
    background-color:transparent;
`

export const SubTitle = styled.p`
    color: var(--text-primary);

    font-family: "Pretendard Variable";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    background-color:transparent;
`

export const Modify = styled.div`
    display: flex;
    padding: 8px;
    align-items: center;
    gap: 8px;
    border-radius: 16px;
    border: 1px solid var(--primary-normal);
    background: var(--primary-light-active);
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: var(--primary-normal);
        transform: scale(1.05);
    }
`

export const ModifyIcon = styled.img`
    width: 14px;
    height: 14px;
    aspect-ratio: 1/1;
    background-color: transparent;
    pointer-events: none;
`

export const StudyButton = styled.button`
    display: flex;
    padding: 8px 16px;
    align-items: center;
    gap: 8px;
    border-radius: 16px;
    border: 1px solid var(--primary-normal);
    background: var(--primary-light-active);
    color: var(--text-primary);
    font-family: "Pretendard Variable";
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: var(--primary-normal);
        color: white;
    }
`