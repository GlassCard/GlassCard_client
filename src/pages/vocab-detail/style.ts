import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px;
    min-height: 100vh;
    background-color: rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(25px);

`;

export const Title = styled.h1`
    font-size: 28px;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
`;

export const WordList = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;
    background-color: transparent;
`;

export const WordItem = styled.div`
    display: flex;
    padding: 20px;
    border-radius: 24px;
    gap: 15px;
    border: 8px solid var(--background-surface);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(40px);
    background: var(--background-fill);
`;

export const WordNumber = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: var(--primary-dark);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(40px);
    color: white;
    border-radius: 50%;
    font-weight: bold;
    font-size: 14px;
`;

export const WordContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: transparent;
`;

export const Word = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #333;
    background-color: transparent;
`;

export const Meaning = styled.div`
    font-size: 16px;
    color: #666;
    background-color: transparent;
`;

export const PartOfSpeech = styled.div`
    font-size: 12px;
    color: #666;
    font-style: italic;
    padding: 4px 8px;
    background-color: var(--primary-light-active);
    border-radius: 4px;
    display: inline-block;
    margin-top: 4px;
`;

export const StartButton = styled.button`
    padding: 15px 40px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    transition: all 0.3s ease;
    border-radius: 64px;
    border: 4px solid var(--background-surface);
    background: rgba(45, 49, 87, 0.90);
    cursor: pointer;
    
    &:hover {
        background: var(--primary-darker);
    }
`; 