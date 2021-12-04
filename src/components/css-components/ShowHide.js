import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import { animated, useSpring } from 'react-spring';
import { useState } from 'react';

const OuterContainer = styled.div`
  width: 20px;
  height: 20px;
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
    background: #2b2d2f;
  }
`;

export default function ShowHide({ isMinimized, handleIsMinimized }) {
  // States
  const animation = useSpring({
    from: { rotateZ: '-90deg' },
    to: { rotateZ: '0deg' },
    reverse: isMinimized,
    reset: isMinimized,
  });
  const [localCopy, setLocalCopy] = useState(isMinimized);

  const removeAnimationBug = () => {
    if (isMinimized === localCopy)
    return (
      <OuterContainer
        onClick={() => {
          handleIsMinimized();
          setLocalCopy(isMinimized);
        }}
      >
        <InnerContainer>
          <IoIosArrowDown color="#ffffff" />
        </InnerContainer>
      </OuterContainer>
    );

  return (
    <OuterContainer
      onClick={() => {
        handleIsMinimized();
        setLocalCopy(isMinimized);
      }}
    >
      <InnerContainer>
        <animated.div style={animation}>
          <IoIosArrowDown color="#ffffff" />
        </animated.div>
      </InnerContainer>
    </OuterContainer>
  );
  }
  return removeAnimationBug();
}
