import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, deleteCategory } from '../actions';
import { animated, useSpring } from 'react-spring';

import Container2 from './css-components/Container2';
import Title from './css-components/Title';
import XButton from './css-components/XButton';

const CustomContainer2 = styled(Container2)`
  cursor: pointer;
  display: relative;

  &:hover {
    background: #1a74e2;
    color: #ffffff;
  }
`;

const CustomTitle = styled(Title)`
  width: 100%;
  color: ${props =>
    props.selected && props.isHovered
      ? '#ffffff'
      : props.selected
      ? '#1A74E2'
      : '#ffffff'};
`;

export default function CategoryTitle({ category }) {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);

  // States
  const [isHovered, setIsHovered] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const animation = useSpring({
    from: { translateX: '-50%', opacity: '0' },
    to: { translateX: '0%', opacity: '1' },
    reverse: isRemoved,
    reset: isRemoved,
  });
  return (
    <div>
      {category.selected ? (
        <animated.div style={animation}>
          <CustomContainer2
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CustomTitle selected={category.selected} isHovered={isHovered}>
              {category.name}
            </CustomTitle>
            {isHovered ? (
              <XButton
                handleClick={() => {
                  dispatch(deleteCategory(category.id));
                  dispatch(selectCategory(categories[0].id));
                }}
              />
            ) : null}
          </CustomContainer2>
        </animated.div>
      ) : (
        <animated.div style={animation}>
          <CustomContainer2
            style={animation}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => dispatch(selectCategory(category.id))}
          >
            <CustomTitle>{category.name}</CustomTitle>
            {isHovered ? (
              <XButton
                handleClick={() => {
                  dispatch(deleteCategory(category.id));
                }}
              />
            ) : null}
          </CustomContainer2>
        </animated.div>
      )}
    </div>
  );
}
