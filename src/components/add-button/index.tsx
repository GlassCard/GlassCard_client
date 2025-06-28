import * as _ from './style';

const AddButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <_.Container onClick={onClick}>
            <_.Plus>+</_.Plus>
        </_.Container>
    )
}

export default AddButton;