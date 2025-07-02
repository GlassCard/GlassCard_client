import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/header";
import { supabase } from '../card-list/data';
import * as _ from './style';

interface VocabItem {
    id: string;
    word: string;
    meaning: string;
    partOfSpeech?: string;
    correctAnswer: string;
}

type AnswerType = 'Correct' | 'Flexible' | 'Incorrect';

interface StudySession {
    vocabListId: string;
    currentIndex: number;
    correctCount: number;
    totalCount: number;
    startTime: Date;
    answers: Array<{
        itemId: string;
        userAnswer: string;
        isCorrect: boolean;
        similarity: number;
    }>;
}

const Study = () => {
    const { vocabListId } = useParams<{ vocabListId: string }>();
    const navigate = useNavigate();
    
    const [vocabItems, setVocabItems] = useState<VocabItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [answerType, setAnswerType] = useState<AnswerType | null>(null);
    const [showHint, setShowHint] = useState(false);
    const [studySession, setStudySession] = useState<StudySession | null>(null);
    const [studyMode, setStudyMode] = useState<'word-to-meaning' | 'meaning-to-word' | 'example-fill'>('word-to-meaning');
    const [wrongAnswers, setWrongAnswers] = useState<VocabItem[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);

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
                    return;
                }
                
                const items: VocabItem[] = data?.map((item: any) => ({
                    id: item.id,
                    word: item.word,
                    meaning: item.meaning,
                    partOfSpeech: item.part_of_speech,
                    correctAnswer: item.meaning // 단어→뜻 학습 모드 기준
                })) || [];
                
                setVocabItems(items);
                
                // 학습 세션 초기화
                const session: StudySession = {
                    vocabListId: vocabListId || '',
                    currentIndex: 0,
                    correctCount: 0,
                    totalCount: items.length,
                    startTime: new Date(),
                    answers: []
                };
                setStudySession(session);
            } catch (error) {
                console.error('데이터 로드 오류:', error);
            }
        };
        
        if (vocabListId) {
            fetchVocabItems();
        }
    }, [vocabListId]);

    const checkAnswer = (userInput: string, correctAnswer: string): { isCorrect: boolean; similarity: number; type: AnswerType } => {
        // 1. Exact match 확인
        if (userInput.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
            return { isCorrect: true, similarity: 1.0, type: 'Correct' };
        }
        
        // 2. 유사도 분석 (실제로는 AI 모델 사용)
        // 임시로 단순 키워드 매칭
        const userWords = userInput.toLowerCase().split(' ');
        const correctWords = correctAnswer.toLowerCase().split(' ');
        const commonWords = userWords.filter(word => correctWords.includes(word));
        const similarity = commonWords.length / Math.max(userWords.length, correctWords.length);
        
        if (similarity > 0.3) {
            return { isCorrect: true, similarity, type: 'Flexible' };
        } else {
            return { isCorrect: false, similarity, type: 'Incorrect' };
        }
    };

    const handleSubmit = () => {
        if (!vocabItems[currentIndex] || !studySession) return;
        
        const currentItem = vocabItems[currentIndex];
        const result = checkAnswer(userAnswer, currentItem.correctAnswer);
        
        // 답변 기록
        const newAnswer = {
            itemId: currentItem.id,
            userAnswer,
            isCorrect: result.isCorrect,
            similarity: result.similarity
        };
        
        setStudySession(prev => prev ? {
            ...prev,
            correctCount: prev.correctCount + (result.isCorrect ? 1 : 0),
            answers: [...prev.answers, newAnswer]
        } : null);
        
        setIsCorrect(result.isCorrect);
        setAnswerType(result.type);
        
        // 틀린 답이면 wrongAnswers에 추가
        if (!result.isCorrect) {
            setWrongAnswers(prev => [...prev, currentItem]);
        }
        
        // 3초 후 다음 문제로
        setTimeout(() => {
            if (currentIndex < vocabItems.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setUserAnswer('');
                setIsCorrect(null);
                setAnswerType(null);
                setShowHint(false);
            } else {
                // 모든 문제 완료, 틀린 문제들 다시 학습
                if (wrongAnswers.length > 0) {
                    setVocabItems(wrongAnswers);
                    setCurrentIndex(0);
                    setWrongAnswers([]);
                    setUserAnswer('');
                    setIsCorrect(null);
                    setAnswerType(null);
                    setShowHint(false);
                } else {
                    // 완전히 완료
                    setIsCompleted(true);
                }
            }
        }, 3000);
    };

    const getCurrentQuestion = () => {
        if (!vocabItems[currentIndex]) return null;
        
        const item = vocabItems[currentIndex];
        
        switch (studyMode) {
            case 'word-to-meaning':
                return {
                    question: `${item.word}의 뜻을 입력하세요`,
                    hint: item.partOfSpeech ? `${item.partOfSpeech} (품사)` : '힌트 없음'
                };
            case 'meaning-to-word':
                return {
                    question: `"${item.meaning}"에 해당하는 영어 단어를 입력하세요`,
                    hint: item.partOfSpeech ? `${item.partOfSpeech} (품사)` : '힌트 없음'
                };
            case 'example-fill':
                return {
                    question: `"${item.meaning}"에 해당하는 영어 단어를 입력하세요`,
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
                            <_.RestartButton onClick={() => window.location.reload()}>
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

    return (
        <>
            <Header />
            <_.Container>
                <_.ProgressBar>
                    <_.ProgressFill 
                        width={`${((currentIndex + 1) / vocabItems.length) * 100}%`} 
                    />
                </_.ProgressBar>
                
                <_.QuestionContainer>
                    <_.QuestionNumber>
                        {currentIndex + 1} / {vocabItems.length}
                    </_.QuestionNumber>
                    <_.Question>{currentQuestion.question}</_.Question>
                    
                    {!showHint && (
                        <_.HintButton onClick={() => setShowHint(true)}>
                            힌트 보기
                        </_.HintButton>
                    )}
                    
                    {showHint && (
                        <_.Hint>힌트: {currentQuestion.hint}</_.Hint>
                    )}
                </_.QuestionContainer>

                <_.AnswerContainer>
                    <_.AnswerInput
                        value={userAnswer}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserAnswer(e.target.value)}
                        placeholder="답을 입력하세요..."
                        disabled={isCorrect !== null}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && userAnswer.trim() && isCorrect === null) {
                                handleSubmit();
                            }
                        }}
                    />
                    
                    {isCorrect !== null && (
                        <_.ResultContainer>
                            <_.ResultMessage isCorrect={isCorrect}>
                                {isCorrect ? '정답입니다! 🎉' : '틀렸습니다.'}
                            </_.ResultMessage>
                            <_.AnswerType type={answerType || 'Incorrect'}>
                                {answerType === 'Correct' && '정확한 답'}
                                {answerType === 'Flexible' && '유연한 답'}
                                {answerType === 'Incorrect' && '틀린 답'}
                            </_.AnswerType>
                            {!isCorrect && (
                                <_.CorrectAnswer>
                                    정답: {vocabItems[currentIndex]?.correctAnswer}
                                </_.CorrectAnswer>
                            )}
                        </_.ResultContainer>
                    )}
                    
                    <_.SubmitButton 
                        onClick={handleSubmit}
                        disabled={!userAnswer.trim() || isCorrect !== null}
                    >
                        제출
                    </_.SubmitButton>
                </_.AnswerContainer>
            </_.Container>
        </>
    );
};

export default Study; 