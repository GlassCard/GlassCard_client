import { QuestionCardStyled, InnerQuestionCardContainer, Buzzer, QuestionCardTitle, MeaningContainer, InnerMeaningContainer, Meaning, HintButton, HintText } from './style';
import buzzer from '../../assets/buzzer.svg';
import { useState, useEffect } from 'react';

export default function QuestionCard() {
    const [isHintVisible, setIsHintVisible] = useState(false);
    const [hintText, setHintText] = useState('Paris'); // 실제 힌트 텍스트

    const handleHintClick = () => {
        setIsHintVisible(true);
        
        // 3초 후 힌트 숨기기
        setTimeout(() => {
            setIsHintVisible(false);
        }, 3000);
    };

    return (
        <>
        <QuestionCardStyled>
            <InnerQuestionCardContainer>
                <Buzzer src={buzzer} alt="buzzer" />
                <QuestionCardTitle>
                    What is the capital of France?
                </QuestionCardTitle>
            </InnerQuestionCardContainer>
            <MeaningContainer>
                <InnerMeaningContainer>
                    <Meaning placeholder="정답을 입력하세요" />
                    {!isHintVisible && (
                        <HintButton onClick={handleHintClick}>힌트 보기</HintButton>
                    )}
                    {isHintVisible && (
                        <HintText>{hintText}</HintText>
                    )}
                </InnerMeaningContainer>
            </MeaningContainer>
        </QuestionCardStyled>
        </>
    )
}