import * as _ from './style';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    const isHome = currentPath === '/';
    const isCardList = currentPath === '/card-list';
    const isMakeCard = currentPath === '/make-card';

    return(
        <_.Container>
            <_.Logo onClick={() => navigate('/')}/>
            <_.Nav>
                <_.NavA isSelected={isHome} onClick={() => navigate('/')}>홈</_.NavA>
                <_.Contour>|</_.Contour>
                <_.NavA isSelected={isCardList} onClick={() => navigate('/card-list')}>단어장</_.NavA>
                <_.Contour>|</_.Contour>
                <_.NavA isSelected={isMakeCard} onClick={() => navigate('/make-card')}>단어장 만들기</_.NavA>
            </_.Nav>
        </_.Container>
    );
}

export default Header;