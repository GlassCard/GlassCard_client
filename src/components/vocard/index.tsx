import * as _ from './style';
import modify from '@/assets/modify.svg';
import { Link, useNavigate } from 'react-router-dom';

interface PropsInterface{
    tag: string[],
    title: string,
    count?: number,
    id?: string
}

const Vocard = ({tag, title, count, id} : PropsInterface) => {
    const navigate = useNavigate();
    
    const handleCardClick = () => {
        if (id) {
            navigate(`/vocab-detail/${id}`);
        }
    };
    
    return(
        <_.Container onClick={handleCardClick}>
            <_.TagContainer>
                {
                    tag.map((item, index) => (
                        <_.Tag key={index}><_.TagText>#</_.TagText><_.TagText>{item}</_.TagText></_.Tag>
                    ))
                }
            </_.TagContainer>
            <_.TextContainer>
                <_.Title>{title}</_.Title>
                <_.SubTitle>{count} 카드</_.SubTitle>
            </_.TextContainer>
            <_.ButtonContainer>
                <_.Modify>
                    <_.ModifyIcon src={modify}/>
                </_.Modify>
            </_.ButtonContainer>
        </_.Container>
    );
}

export default Vocard;