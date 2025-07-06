import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    padding: 64px;
    min-height: 100vh;
    background-color:transparent;
`;

export const QuestionContainer = styled.div`
    width: 100%;
    max-width: 600px;
    background: white;
    border: 1px solid #e0e0e0;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    text-align: center;
`;

export const QuestionNumber = styled.div`
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
`;

export const Question = styled.h2`
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    line-height: 1.4;
`;

export const Hint = styled.div`
    font-size: 16px;
    color: #333;
    font-style: italic;
    padding: 15px;
    background: #f0f8ff;
    border-radius: 8px;
    border-left: 4px solid #4CAF50;
`;

export const AnswerContainer = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export const AnswerInput = styled.input`
    width: 100%;
    padding: 15px 20px;
    font-size: 18px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    outline: none;
    color: #333;
    transition: all 0.3s ease;
    
    &::placeholder {
        color: #999;
    }
    
    &:focus {
        border-color: #4CAF50;
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
    }
    
    &:disabled {
        background: #f5f5f5;
        color: #999;
    }
`;

export const ResultMessage = styled.div<{ isCorrect: boolean }>`
    padding: 15px 20px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    background-color: ${props => props.isCorrect ? '#d4edda' : '#f8d7da'};
    color: ${props => props.isCorrect ? '#155724' : '#721c24'};
    border: 1px solid ${props => props.isCorrect ? '#c3e6cb' : '#f5c6cb'};
`;

export const SubmitButton = styled.button`
    padding: 15px 40px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    background: rgba(63, 66, 101, 0.8);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(40px);
    cursor: pointer;
    border-radius: 24px;
    border: 5px solid var(--background-surface);
    transition: all 0.3s ease;
    width: 100%;
    max-width: 600px;
    
    &:hover:not(:disabled) {
        background: #45a049;
    }
    
    &:disabled {
        cursor: not-allowed;
    }
`;

export const HintButton = styled.button`
    padding: 8px 16px;
    font-size: 14px;
    color: #666;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background-color: #e0e0e0;
    }
`;

export const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
`;

export const AnswerType = styled.div<{ type: 'Correct' | 'Flexible' | 'Incorrect' }>`
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    background-color: ${props => {
        switch (props.type) {
            case 'Correct': return '#d4edda';
            case 'Flexible': return '#fff3cd';
            case 'Incorrect': return '#f8d7da';
        }
    }};
    color: ${props => {
        switch (props.type) {
            case 'Correct': return '#155724';
            case 'Flexible': return '#856404';
            case 'Incorrect': return '#721c24';
        }
    }};
    border: 1px solid ${props => {
        switch (props.type) {
            case 'Correct': return '#c3e6cb';
            case 'Flexible': return '#ffeaa7';
            case 'Incorrect': return '#f5c6cb';
        }
    }};
`;

export const CorrectAnswer = styled.div`
    padding: 10px 15px;
    background-color: #e3f2fd;
    color: #1565c0;
    border-radius: 6px;
    font-weight: bold;
    border: 1px solid #bbdefb;
`;

export const CompletionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
    gap: 30px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 24px;
    padding: 40px;
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
`;

export const CompletionTitle = styled.h1`
    font-size: 36px;
    color: var(--text-primary);
    margin: 0;
`;

export const CompletionText = styled.p`
    font-size: 18px;
    color: var(--text-primary);
    margin: 0;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 20px;
`;

export const RestartButton = styled.button`
    padding: 15px 30px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background: linear-gradient(135deg, var(--primary-normal) 0%, var(--primary-dark) 100%);
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(129, 140, 248, 0.3);
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(129, 140, 248, 0.4);
    }
`;

export const ExitButton = styled.button`
    padding: 15px 30px;
    font-size: 16px;
    font-weight: bold;
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    
    &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
    }
`;

export const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
    gap: 30px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 24px;
    padding: 40px;
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
`;

export const ErrorText = styled.p`
    font-size: 18px;
    color: #f44336;
    margin: 0;
    font-weight: bold;
`;

export const LoadingText = styled.div`
    font-size: 16px;
    color: #666;
    text-align: center;
    padding: 10px;
    font-style: italic;
`; 