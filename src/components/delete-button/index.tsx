import * as _ from './style';

const DeleteButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <_.Container onClick={onClick}>
            <_.Delete/>
        </_.Container>
    )
}

export default DeleteButton;