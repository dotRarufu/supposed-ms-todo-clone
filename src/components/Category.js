import Todo from './Todo';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useState } from 'react';
import { useMeasure } from 'react-use';
import { animated, useSpring } from 'react-spring';
import { renameCategory } from '../actions';

import ShowHide from './css-components/ShowHide';
import Container1 from './css-components/Container1';
import BlockContainer from './css-components/BlockContainer';
import Input from './css-components/Input';

const CustomContainer1 = styled(Container1)`
  overflow: hidden;
  width: 98.5%;
`;

const CustomInput = styled(Input)`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 36px;
  cursor: default;
  color: #ffffff;

  margin-left: 2px;
  display: inline-block;
`;

export default function TodoCategory({
  categoryId,
  handleEditPopActive,
  handleCheckboxClick,
}) {
  const todos = useSelector(state => state.todos);
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const [categoryElem, { height }] = useMeasure();

  // States
  const [categoryIsMinimized, setCategoryIsMinimized] = useState(false);
  const [categoryName, setCategoryName] = useState(
    categories.find(category => category.id === categoryId).name
  );

  const animation = useSpring({
    height: categoryIsMinimized ? '42px' : `${height + 13}px`,
  });

  // Populate Functions
  const populateTodo = () => {
    const todosOfThisCategory = todos.filter(
      todo => todo.categoryId === categoryId
    );
    return todosOfThisCategory.map((todo, i) => {
      if (!todo.completed)
        return (
          <Todo
            key={i}
            title={todo.title}
            color={todo.color}
            id={todo.id}
            handleEditPopActive={handleEditPopActive}
            handleCheckboxClick={handleCheckboxClick}
          />
        );
      return null;
    });
  };

  return (
    <animated.div style={{ ...animation, overflow: 'hidden' }}>
      <CustomContainer1 ref={categoryElem}>
        <BlockContainer>
          <ShowHide
            handleIsMinimized={() =>
              setCategoryIsMinimized(!categoryIsMinimized)
            }
            isMinimized={categoryIsMinimized}
          />
          <CustomInput
            value={categoryName.replace(/\r?\n|\r/g, '')}
            onChange={e => {
              dispatch(renameCategory(e.target.value, categoryId));
              setCategoryName(e.target.value);
            }}
          />
        </BlockContainer>
        {populateTodo()}
      </CustomContainer1>
    </animated.div>
  );
}
