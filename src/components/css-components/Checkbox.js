import styled from 'styled-components';
import { BsCheckSquare, BsSquare } from 'react-icons/bs';

const Container = styled.div.attrs({
  id: 'checkbox-container',
})`
  width: 20px;
  height: 20px;
  margin: 0 10px 0 6px;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const Checkbox = ({ completed, handleClick }) => {
  return (
    <Container onClick={handleClick}>
      {completed ? (
        <BsCheckSquare attr={{ id: 'checkbox' }} color="#ffffff" />
      ) : (
        <BsSquare attr={{ id: 'checkbox' }} color="#ffffff" />
      )}
    </Container>
  );
};

export default Checkbox;
