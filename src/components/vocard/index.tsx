import * as _ from './style';
import modify from '@/assets/modify.svg';

const Vocard = () => {
    return(
        <_.Container>
            <_.TagContainer>
                <_.Tag><_.TagText>#</_.TagText><_.TagText>1학년</_.TagText></_.Tag>
                <_.Tag><_.TagText>#</_.TagText><_.TagText>1학년</_.TagText></_.Tag>
            </_.TagContainer>
            <_.TextContainer>
                <_.Title>2025 BSSM 영어 단어왕 선발대회</_.Title>
                <_.SubTitle>170 카드</_.SubTitle>
            </_.TextContainer>
            <_.ModifyContainer>
                <_.Modify>
                    <_.ModifyIcon src={modify}/>
                </_.Modify>
            </_.ModifyContainer>
        </_.Container>
    );
}

export default Vocard;