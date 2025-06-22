import * as _ from './style';
import modify from '@/assets/modify.svg';

interface PropsInterface{
    tag: string[],
    title: string,
    count: number
}

const Vocard = ({tag, title, count} : PropsInterface) => {
    return(
        <_.Container>
            <_.TagContainer>
                {
                    tag.map((item) => (
                        <_.Tag><_.TagText>#</_.TagText><_.TagText>{item}</_.TagText></_.Tag>
                    ))
                }
            </_.TagContainer>
            <_.TextContainer>
                <_.Title>{title}</_.Title>
                <_.SubTitle>{count} 카드</_.SubTitle>
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