import * as _ from './style';
import modify from '@/assets/modify.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AccessKeyModal from '../access-key-modal';
import { supabase } from '@/pages/card-list/data';

interface PropsInterface{
    tag: string[],
    title: string,
    count?: number,
    id?: string,
    expiresAt?: string
}

const Vocard = ({tag, title, count, id} : PropsInterface) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasError, setHasError] = useState(false);
    
    const handleCardClick = () => {
        if (id) {
            navigate(`/vocab-detail/${id}`);
        }
    };

    const handleModifyClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(true);
        setHasError(false); // 모달 열 때 에러 상태 초기화
    };

    const handleAccessKeySubmit = async (accessKey: string) => {
        try {
            // Access Key 검증
            const { data, error } = await supabase
                .from('vocab_lists')
                .select('id, title')
                .eq('id', id)
                .eq('access_key', accessKey)
                .single();

            if (error || !data) {
                console.log('잘못된 Access Key:', accessKey);
                setHasError(true);
                return;
            }

            // 검증 성공 시에만 모달 닫고 수정 페이지로 이동
            setIsModalOpen(false);
            if (id) {
                navigate(`/make-card?edit=${id}&key=${accessKey}`);
            }
        } catch (error) {
            console.error('Access Key 검증 오류:', error);
            setHasError(true);
        }
    };

    return(
        <>
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
                    <_.Modify onClick={handleModifyClick}>
                        <_.ModifyIcon src={modify}/>
                    </_.Modify>
                </_.ButtonContainer>
            </_.Container>
            <AccessKeyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAccessKeySubmit}
                title={title}
                hasError={hasError}
            />
        </>
    );
}

export default Vocard;