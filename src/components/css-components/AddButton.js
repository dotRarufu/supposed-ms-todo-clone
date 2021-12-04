import styled from 'styled-components';
import { RiAddLine } from 'react-icons/ri';

const Container = styled.div`
  display: inline-block;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  color: red;

  &:hover {
    background: #2b2d2f;
  }
`;

const AddButton = ({ handleClick }) => {
  return (
    <Container onClick={handleClick}>
      <RiAddLine color="#3FA0EF" />
    </Container>
  );
};

export default AddButton;
