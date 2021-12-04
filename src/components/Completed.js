import ShowHide from './css-components/ShowHide';
import Container1 from './css-components/Container1';
import BlockContainer from './css-components/BlockContainer';
import Label from './css-components/Label';

import Todo from './Todo';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useMeasure } from 'react-use';

const CustomContainer1 = styled(Container1)`
  overflow: hidden;
  width: 98.5%;
`;

export default function Completed({
  handleEditPopActive,
  handleCheckboxClick,
}) {
  const todos = useSelector(state => state.todos);
  const categories = useSelector(state => state.categories);
  const selectedCategory = categories.find(category => category.selected) || {
    id: 'false',
  };

  // States
  const [completeIsMinimized, setCompleteIsMinimized] = useState(false);

  const [completeElem, { height }] = useMeasure();

  const animation = useSpring({
    height: completeIsMinimized ? '42px' : `${height + 13}px`,
  });
  // Populate Functions

  const populateCompleted = () => {
    const completedTodos = todos.filter(
      todo => todo.categoryId === selectedCategory.id && todo.completed === true
    );
    return completedTodos.map((todo, i) => (
      <Todo
        key={i}
        title={todo.title}
        color={todo.color}
        id={todo.id}
        completed={todo.completed || true}
        handleEditPopActive={handleEditPopActive}
        handleCheckboxClick={handleCheckboxClick}
      />
    ));
  };

  return (
    <animated.div style={{ ...animation, overflow: 'hidden' }}>
      <CustomContainer1 ref={completeElem}>
        <BlockContainer>
          <ShowHide
            handleIsMinimized={() =>
              setCompleteIsMinimized(!completeIsMinimized)
            }
            isMinimized={completeIsMinimized}
          />
          <Label>Completed</Label>
        </BlockContainer>
        {populateCompleted()}
      </CustomContainer1>
    </animated.div>
  );
}
