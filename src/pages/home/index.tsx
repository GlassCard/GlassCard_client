import Header from "@/components/header";
import * as _ from './style';
import { Link } from "react-router-dom";
import doughnut from '@/assets/doughnut.svg';
import cheese from '@/assets/cheese.svg';

const Home = () =>{
    return(
        <>
            <Header />
            <_.FloatingImg src={doughnut} top={"20%"} left={"70%"} time={"3s"}/>
            <_.FloatingImg src={cheese} top={"70%"} left={"10%"} time={"2.5s"}/>
            <_.Card>
                <_.TitleContainer>
                    <_.Title>AI가 도와주는 <_.Highlight>똑똑한</_.Highlight> 단어 학습</_.Title>
                </_.TitleContainer>
                <_.InnerCard>
                    <_.InnerCardText>정확한 답만 인정하는 경직된 학습에서 벗어나,</_.InnerCardText>
                    <_.InnerCardText>AI 유사도 분석으로 더 <_.Highlight>자연스럽고 효과적인</_.Highlight></_.InnerCardText>
                    <_.InnerCardText>단어 암기를 경험하세요.</_.InnerCardText>
                </_.InnerCard>
                <Link to={"/card-list"} style={{ all: 'unset', cursor: 'pointer', width: '100%'}}>
                    <_.StartBtn>
                        <_.StartBtnText>시작하기</_.StartBtnText>
                    </_.StartBtn>
                </Link>
            </_.Card>
        </>
    )
}

export default Home;