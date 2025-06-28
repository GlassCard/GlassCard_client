import { Container, Counter, CurrentCounter, TotalCounter } from './style';
import QuestionCard from '../question-card';

export default function Card() {
    return (
        <>
            <Container>
                <Counter>
                    <CurrentCounter>1</CurrentCounter>
                    <TotalCounter>/10</TotalCounter>
                </Counter>
                <QuestionCard />
            </Container>
        </>
    )
}