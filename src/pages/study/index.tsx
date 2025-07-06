import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/header";
import { supabase } from '../card-list/data';
import { useStudyStore, type VocabItem } from '@/store/studyStore';
import * as _ from './style';
import Sound from '@/assets/sound.svg';
import Check from '@/assets/check.svg';
import X from '@/assets/X.svg';
import doughnut from '@/assets/doughnut.svg';
import cheese from '@/assets/cheese.svg';

const Study = () => {
    const { vocabListId } = useParams<{ vocabListId: string }>();
    const navigate = useNavigate();

    const {
        vocabItems,
        currentIndex,
        userAnswer,
        isCorrect,
        answerType,
        showHint,
        studySession,
        studyMode,
        wrongAnswers,
        isCompleted,
        isLoading,
        error,
        setUserAnswer,
        setShowHint,
        initializeSession,
        submitAnswer,
        nextQuestion,
        resetStudy,
        setError
    } = useStudyStore();

    // 단어장 데이터 로드
    useEffect(() => {
        const fetchVocabItems = async () => {
            try {
                const { data, error } = await supabase
                    .from('vocab_items')
                    .select('id, word, meaning, part_of_speech')
                    .eq('vocab_list_id', vocabListId);

                if (error) {
                    console.error('단어 목록 조회 오류:', error);
                    setError('단어 목록을 불러오는데 실패했습니다.');
                    return;
                }

                const items: VocabItem[] = data?.map((item: any) => ({
                    id: item.id,
                    word: item.word,
                    meaning: item.meaning,
                    partOfSpeech: item.part_of_speech,
                    correctAnswer: item.meaning // 단어→뜻 학습 모드 기준
                })) || [];

                // 학습 세션 초기화
                initializeSession(vocabListId || '', items);
            } catch (error) {
                console.error('데이터 로드 오류:', error);
                setError('데이터를 불러오는데 실패했습니다.');
            }
        };

        if (vocabListId) {
            fetchVocabItems();
        }
    }, [vocabListId, initializeSession, setError]);

    const handleSubmit = async () => {
        if (!vocabItems[currentIndex] || !studySession || !userAnswer.trim()) return;
        await submitAnswer();

        // 3초 후 다음 문제로
        setTimeout(() => {
            nextQuestion();
        }, 3000);

    };

    const getCurrentQuestion = () => {
        if (!vocabItems[currentIndex]) return null;

        const item = vocabItems[currentIndex];

        switch (studyMode) {
            case 'word-to-meaning':
                return {
                    question: `${item.word}`,
                    hint: item.partOfSpeech ? `${item.partOfSpeech} (품사)` : '힌트 없음'
                };
            case 'meaning-to-word':
                return {
                    question: `"${item.meaning}"`,
                    hint: item.partOfSpeech ? `${item.partOfSpeech} (품사)` : '힌트 없음'
                };
            case 'example-fill':
                return {
                    question: `"${item.meaning}"`,
                    hint: item.partOfSpeech ? `${item.partOfSpeech} (품사)` : '힌트 없음'
                };
        }
    };

    const currentQuestion = getCurrentQuestion();

    if (isCompleted) {
        return (
            <>
                <Header />
                <_.Container>
                    <_.CompletionContainer>
                        <_.CompletionTitle>🎉 100% 완료!</_.CompletionTitle>
                        <_.CompletionText>모든 단어를 성공적으로 학습했습니다!</_.CompletionText>
                        <_.ButtonGroup>
                            <_.RestartButton onClick={() => {
                                resetStudy();
                                window.location.reload();
                            }}>
                                다시 시작
                            </_.RestartButton>
                            <_.ExitButton onClick={() => navigate('/card-list')}>
                                나가기
                            </_.ExitButton>
                        </_.ButtonGroup>
                    </_.CompletionContainer>
                </_.Container>
            </>
        );
    }

    if (!currentQuestion || !studySession) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return (
            <>
                <Header />
                <_.Container>
                    <_.ErrorContainer>
                        <_.ErrorText>{error}</_.ErrorText>
                        <_.RestartButton onClick={() => window.location.reload()}>
                            다시 시도
                        </_.RestartButton>
                    </_.ErrorContainer>
                </_.Container>
            </>
        );
    }

    return (
        <>
            <_.FloatingImg src={doughnut} top={"20%"} left={"70%"} time={"3s"}/>
            <_.FloatingImg src={cheese} top={"70%"} left={"10%"} time={"2.5s"}/>
            <_.Container>
                <_.QuestionNumber>
                    {currentIndex + 1} / {vocabItems.length}
                </_.QuestionNumber>
                <_.QuestionContainer>
                    <_.QuestionContainerTop>
                        {
                            answerType !== null && (
                                <_.StatusIndex status={answerType === null ? undefined : answerType}>
                                    {answerType === "Correct" || answerType === "Flexible" && (
                                        <_.IndexImg src={Check}></_.IndexImg>
                                    )}
                                    {answerType === "Incorrect" && (
                                        <_.IndexImg src={X}></_.IndexImg>
                                    )}
                                </_.StatusIndex>
                            )
                        }
                        <_.QuestionContainerTopInner>
                            <_.SoundImg src={Sound}></_.SoundImg>
                            <_.Question>{currentQuestion.question}</_.Question>
                        </_.QuestionContainerTopInner>
                    </_.QuestionContainerTop>



                    <_.AnswerContainer>
                        <_.AnswerContainerInner>
                            <_.AnswerInput
                                value={userAnswer}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserAnswer(e.target.value)}
                                placeholder="단어의 의미를 입력하세요."
                                disabled={isCorrect !== null || isLoading}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && userAnswer.trim() && isCorrect === null && !isLoading) {
                                        handleSubmit();
                                    }
                                }}
                                status={answerType === null ? undefined : answerType}
                            />
                            {isCorrect !== null && (
                                <_.ResultMessage>정답: {vocabItems[currentIndex]?.correctAnswer}</_.ResultMessage>
                            )}
                            {!showHint && isCorrect === null && (
                                <_.HintButton onClick={() => setShowHint(true)}>
                                    힌트 보기
                                </_.HintButton>
                            )}
                            {isCorrect === null && showHint && (
                                <_.HintButton>힌트: {currentQuestion.hint}</_.HintButton>
                            )}
                        </_.AnswerContainerInner>


                        {isLoading && (
                            <_.LoadingText>답안을 확인하는 중...</_.LoadingText>
                        )}

                    </_.AnswerContainer>
                </_.QuestionContainer>
                <_.SubmitButton
                    onClick={handleSubmit}
                    disabled={!userAnswer.trim() || isCorrect !== null || isLoading}
                    status={answerType === null ? undefined : answerType}
                >
                    {isLoading ? 'Checking...' : 'Next'}
                </_.SubmitButton>

            </_.Container>
        </>
    );
};

export default Study;