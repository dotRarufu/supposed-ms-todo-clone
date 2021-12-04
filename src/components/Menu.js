import Label from './css-components/Label';
import Container1 from './css-components/Container1';
import Container2 from './css-components/Container2';
import BlockContainer from './css-components/BlockContainer';
import Input from './css-components/Input';
import AddButton from './css-components/AddButton';

import { addCategory } from '../actions';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import CategoryTitle from './CategoryTitle';
import { animated, useSpring } from 'react-spring';

const Container = styled(animated.div)`
  height: 100%;

  top: 0;
  left: 0;
  float: left;

  ${props =>
    props.position
      ? `${props.position}; background: #101010;`
      : 'position: absolute; background: #1f2123; box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);'}

  @media (max-width: 550px) {
    width: 70vw;
    padding: 0px;
  }

  @media (min-width: 551px) {
    width: 35vw;
    max-width: 300px;
  }
`;

const Custom2Container2 = styled(Container2)`
  display: inline-block;
  width: calc(100% - 20px);

  padding: 0 5px 0 5px;
`;

export default function Menu({ position, anim }) {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const animationContainer = useSpring({
    from: { opacity: 0, transform: 'translateX(-50%)' },
    to: { opacity: 1, transform: 'translateX(0%)' },
    reverse: anim,
    reset: anim,
  });

  // States
  const [newCategoryName, setNewCategoryName] = useState();

  // Populate Functions
  const populateCategoryNames = () => {
    return categories.map((category, i) => (
      <CategoryTitle key={i} category={category} />
    ));
  };

  return (
    <Container position={position} style={animationContainer}>
      <Scrollbars style={{ height: '95vh' }}>
        <Container1>
          <Label>Sections</Label>
          {populateCategoryNames()}
          <BlockContainer>
            <AddButton
              handleClick={() => {
                if (!newCategoryName) return;

                dispatch(addCategory(newCategoryName));

                setNewCategoryName('');
              }}
            />
            <Custom2Container2 style={{ margin: '0' }}>
              <Input
                placeholder="Add new category"
                onChange={e => {
                  setNewCategoryName(e.target.value);
                }}
                value={newCategoryName}
                style={{ padding: '5px' }}
              />
            </Custom2Container2>
          </BlockContainer>
        </Container1>
      </Scrollbars>
    </Container>
  );
}
