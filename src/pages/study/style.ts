import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    min-height: 100vh;
    background-color:transparent;
`;

export const QuestionContainer = styled.div`
    width: 100%;
    position: relative;
    max-width: 700px;
    background: white;
    padding: 0 0 30px 0;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 48px;
    text-align: center;
    border-radius: 36px;
    border: 12px solid var(--background-surface);
    background: var(--background-fill);
    box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(60px);
    box-sizing:border-box;
`;

export const QuestionNumber = styled.div`
    color: var(--text-primary);
    font-family: "Pretendard Variable";
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
    margin-bottom:10px;
`;

export const Question = styled.h2`
    color: var(--text-primary);
    font-family: "Pretendard Variable";
    font-size: 38px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 57.6px */
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
    display: flex;
    padding: 48px 48px 0 48px;
    justify-content: center;
    align-items: center;
    gap: 15px;
    flex: 1 0 0;
    align-self: stretch;
    background-color:transparent;
    width:100%;
    box-sizing:border-box;
`;

export const AnswerInput = styled.input<{ status: 'Correct' | 'Flexible' | 'Incorrect' | undefined }>`
    width: 100%;
    padding: 15px 20px;
    font-size: 18px;
    outline: none;
    color: #333;
    transition: all 0.3s ease;
    border-radius: 24px;
    background: #FFF;
    border: 2px solid;

    border-color: ${({ status }) => {
        switch (status) {
            case 'Correct':
                return 'var(--correct-green-stroke)';
            case 'Flexible':
                return '(--flexible-yellow-stroke)';
            case 'Incorrect':
                return 'var(--incorrect-red-stroke)';
            default:
                return 'var(--background-surface)';
        }
    }};
    
    &::placeholder {
        color: #999;
    }
`;

export const SubmitButton = styled.button<{ status: 'Correct' | 'Flexible' | 'Incorrect' | undefined }>`
    padding: 15px 40px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    background: ${({ status }) => {
        switch (status) {
            case 'Correct':
                return 'var(--correct-green-fill)'; // 초록
            case 'Flexible':
                return 'var(--flexible-yellow-fill)'; // 노랑
            case 'Incorrect':
                return 'var(--incorrect-red-fill)'; // 빨강
            default:
                return 'rgba(63, 66, 101, 0.8)';
        }
    }};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(40px);
    cursor: pointer;
    border-radius: 24px;
    border: 5px solid;
    transition: all 0.3s ease;
    width: 100%;
    max-width: 700px;
    box-sizing: border-box;
    border-color: ${({ status }) => {
        switch (status) {
            case 'Correct':
                return 'var(--correct-green-stroke)';
            case 'Flexible':
                return '(--flexible-yellow-stroke)';
            case 'Incorrect':
                return 'var(--incorrect-red-stroke)';
            default:
                return 'var(--background-surface)';
        }
    }};
    
    &:hover:not(:disabled) {
        background: #45a049;
    }
    
    &:disabled {
        cursor: not-allowed;
    }
`;

export const HintButton = styled.button`
    color: var(--primary-dark-hover, #4D5495);

    /* text-md */
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
    border:none;
    background:transparent;
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

export const QuestionContainerTop = styled.div`
    display: flex;
    padding: 15px;
    height: 150px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    align-self: stretch;
    border-bottom: 1.5px dashed var(--text-disabled);
    background-color:transparent;
`

export const QuestionContainerTopInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
`

export const SoundImg = styled.img`
    width: 32px;
    height: 32px;
    aspect-ratio: 1/1;
`

export const AnswerContainerInner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    flex: 1 0 0;
    background-color:transparent;
`

export const ResultMessage = styled.p`
    color: var(--correct-green-fill);
    /* text-md */
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: border;
    font-weight: 700;
    line-height: 140%;
    background:transparent;
`

export const StatusIndex = styled.div<{ status: 'Correct' | 'Flexible' | 'Incorrect' | undefined }>`
    display: flex;
    width: 30px;
    height: 60px;
    padding: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    position: absolute;
    top: 0;
    right: 20px;

    border-color: ${({ status }) => {
        switch (status) {
            case 'Correct':
                return 'var(--correct-green-stroke)';
            case 'Flexible':
                return '(--flexible-yellow-stroke)';
            case 'Incorrect':
                return 'var(--incorrect-red-stroke)';
            default:
                return 'var(--background-surface)';
        }
    }};

    background: ${({ status }) => {
        switch (status) {
            case 'Correct':
                return 'var(--correct-green-fill)';
            case 'Flexible':
                return 'var(--flexible-yellow-fill)';
            case 'Incorrect':
                return 'var(--incorrect-red-fill)';
            default:
                return 'rgba(63, 66, 101, 0.8)';
        }
    }};
    
    border-radius: 0px 0px var(--16px, 16px) var(--16px, 16px);
    border-right: 5px solid ${({ status }) => {
        switch (status) {
            case 'Correct': return 'var(--correct-green-stroke)';
            case 'Flexible': return 'var(--flexible-yellow-stroke)';
            case 'Incorrect': return 'var(--incorrect-red-stroke)';
            default: return 'var(--background-surface)';
        }
    }};
    border-bottom: 5px solid ${({ status }) => {
        switch (status) {
            case 'Correct': return 'var(--correct-green-stroke)';
            case 'Flexible': return 'var(--flexible-yellow-stroke)';
            case 'Incorrect': return 'var(--incorrect-red-stroke)';
            default: return 'var(--background-surface)';
        }
    }};
    border-left: 5px solid ${({ status }) => {
        switch (status) {
            case 'Correct': return 'var(--correct-green-stroke)';
            case 'Flexible': return 'var(--flexible-yellow-stroke)';
            case 'Incorrect': return 'var(--incorrect-red-stroke)';
            default: return 'var(--background-surface)';
        }
    }};

    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(50px);
`

export const IndexImg = styled.img`
    width: 20px;
    height: 20px;
    background:transparent;
`