import styled from 'styled-components';

const Container2 = styled.div`
  background: ${props => props.color || '#2b2d2f'};
  border-radius: 4px;

  display: flex;
  align-items: center;
  margin: 3px 0;
  padding: 5px;
`;

export default Container2;
