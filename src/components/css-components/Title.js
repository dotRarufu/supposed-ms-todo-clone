import styled from 'styled-components';

const Title = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;

  width: calc(100% - 45px);
  color: ${props => (props.isHovered ? '#DA3435' : '#ffffff')};
  cursor: default;

  overflow: hidden;
`;

export default Title;
