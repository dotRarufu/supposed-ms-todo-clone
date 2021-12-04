import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';

const Container = styled.div`
  height: 15px;
  width: 15px;
  margin-right: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled.div`
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;

  &:hover {
    background: #da3435;
  }
`;

export default function XButton({ handleClick }) {
  return (
    <Container onClick={handleClick}>
      <InnerContainer>
        <IoMdClose color="#ffffff" />
      </InnerContainer>
    </Container>
  );
}
