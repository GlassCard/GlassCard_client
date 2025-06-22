import * as _ from './style';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const isHome = currentPath === '/';
    const isCardList = currentPath === '/card-list';
    const isMakeCard = currentPath === '/make-card';

    return(
        <_.Container>
            <_.Logo />
            <_.Nav>
                <_.NavA href='/' isSelected={isHome}>홈</_.NavA>
                <_.Contour>|</_.Contour>
                <_.NavA href='/card-list' isSelected={isCardList}>단어장</_.NavA>
                <_.Contour>|</_.Contour>
                <_.NavA href='/make-card' isSelected={isMakeCard}>단어장 만들기</_.NavA>
            </_.Nav>
        </_.Container>
    );
}

export default Header;