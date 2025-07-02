import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px;
    min-height: 100vh;
    background-color: #F5F1FF;
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
`;

export const WordItem = styled.div`
    display: flex;
    background: white;
    border: 1px solid #e0e0e0;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    gap: 15px;
`;

export const WordNumber = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: #4CAF50;
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
`;

export const Word = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #333;
`;

export const Meaning = styled.div`
    font-size: 16px;
    color: #666;
`;

export const PartOfSpeech = styled.div`
    font-size: 12px;
    color: #666;
    font-style: italic;
    padding: 4px 8px;
    background-color: #f0f0f0;
    border-radius: 4px;
    display: inline-block;
    margin-top: 4px;
`;

export const StartButton = styled.button`
    padding: 15px 40px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    background: #4CAF50;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background: #45a049;
    }
`; 