import { HexColorPicker, HexColorInput } from 'react-colorful';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { useDispatch } from 'react-redux';
import { changeColor } from '../actions';

const OuterContainer = styled.div`
  height: 80px;
  width: 450px;
 
  position: relative;
  display: flex
  align-items: center;
  justify-content: space-between;
  
`;
const Global = createGlobalStyle`
   .color-container .react-colorful {
        width: 80px;
        height: 80px;
        
    }
    .color-container .react-colorful__hue {
        height: 15px;
        border-radius: 4px;
    }
    .color-container .react-colorful__saturation {
        // height: 15px;
        border-radius: 4px;
    }
    .color-container .react-colorful__hue-pointer, .color-container .react-colorful__saturation-pointer {
        width: 20px;
        height: 20px;
}
    .color-container input {
        float: left;
        width: 50px;
        

        outline: none;
        border: none;
        background: none;
        color: #ffffff;
        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        
        
`;

function Color({ todoId, inColor }) {
  const dispatch = useDispatch();
  // States
  const [color, setColor] = useState(inColor);

  // Effects
  useEffect(() => {
    dispatch(changeColor(todoId, color));
  }, [color, dispatch, todoId]);
  return (
    <OuterContainer className="color-container">
      <Global />
      <HexColorInput color={color} onChange={setColor} />
      <HexColorPicker color={color} onChange={setColor} />
    </OuterContainer>
  );
}

export default Color;
