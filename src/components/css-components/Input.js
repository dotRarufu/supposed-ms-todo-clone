import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

const Input = styled(TextareaAutosize)`
  outline: none;
  border: none;
  background: none;
  color: #ffffff;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;

  width: calc(100% - ${props => props.minuswidth || '0px'});
  display: block;

  resize: none;

  &::placeholder {
    color: ${props => props.color || 'gray'};
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
  }
`;

export default Input;
