import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renameTodo, addStep, deleteTodo } from '../actions';
import { v4 as uuidv4 } from 'uuid';
import { Scrollbars } from 'react-custom-scrollbars';
import { animated, useSpring } from 'react-spring';

import Title from './css-components/Title';
import Container1 from './css-components/Container1';
import Container2 from './css-components/Container2';
import BlockContainer from './css-components/BlockContainer';

import Input from './css-components/Input';

import AddButton from './css-components/AddButton';
import Color from './Color';
import Step from './Step';

const InnerContainer = styled(Scrollbars).attrs({ id: 'edit-pop' })``;
const OuterContainer = styled(animated.div)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px 0 5px 5px;
  height: 100%;
  overflow: hidden;

  background: #1f2123;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  @media (max-width: 550px) {
    width: 70vw;
  }

  @media (min-width: 551px) {
    width: 350px;
  }
`;

const CustomContainer2 = styled(Container2)`
  display: inline-block;
  width: calc(100% - 20px);

  padding: 0 5px 0 5px;
`;

export default function EditPop({ todoId, setEditPopInactive, anim }) {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const categories = useSelector(state => state.categories);
  const selectedCategory = categories.find(category => category.selected) || {
    id: 'false',
  };
  const selectedTodo = todos.find(
    todo => todo.categoryId === selectedCategory.id && todo.id === todoId
  ) || { title: null };
  const animationOuterContainer = useSpring({
    from: { opacity: 0, transform: 'translateX(50%)' },
    to: { opacity: 1, transform: 'translateX(0%)' },
    reverse: anim,
    reset: anim,
  });

  // States
  const [todo, setTodo] = useState({
    title: selectedTodo.title,
    // steps: selectedTodo.steps,
    id: selectedTodo.id,
  });
  const [newStepValue, setNewStepValue] = useState();
  const [removeIsHovered, setRemoveIsHovered] = useState(false);
  const [todoSteps, setTodoSteps] = useState(selectedTodo.steps);
  console.log(todos);
  // Populate Functions
  const populateSteps = () => {
    return todoSteps.map((stepOuter, i) => (
      <Step
        key={i}
        stepOuter={stepOuter}
        todoSteps={todoSteps}
        i={i}
        setTodoSteps={setTodoSteps}
        id={todo.id}
      />
    ));
  };
  return (
    <OuterContainer style={animationOuterContainer}>
      <InnerContainer
        autoHeight
        autoHeightMin={200}
        autoHeightMax={document.querySelector('#inner-container').offsetHeight}
        autoHide
      >
        <Container1>
          <Container2 style={{ margin: '0' }}>
            <Input
              onChange={e => setTodo({ ...todo, title: e.target.value })}
              placeholder="Title here"
              value={todo.title}
              onBlur={e => dispatch(renameTodo(e.target.value, todo.id))}
              maxRows={4}
            />
          </Container2>
        </Container1>
        <Container1>
          {populateSteps()}

          <BlockContainer>
            <AddButton
              handleClick={() => {
                if (!newStepValue) return;
                const uniqueId = uuidv4();
                setTodoSteps([
                  ...todoSteps,
                  {
                    name: newStepValue,
                    completed: false,
                    id: uniqueId,
                  },
                ]);

                dispatch(addStep(newStepValue, todo.id, uniqueId));
                setNewStepValue('');
              }}
            />
            <CustomContainer2 style={{ margin: '0' }}>
              <Input
                placeholder="Add step"
                onChange={e => setNewStepValue(e.target.value)}
                value={newStepValue}
                maxRows={4}
                color={'#3FA0EF'}
                style={{ padding: '5px' }}
              />
            </CustomContainer2>
          </BlockContainer>
        </Container1>

        <Container1>
          <Container2>
            <Title>Color: </Title>
            <Color todoId={todoId} inColor={selectedTodo.color} />
          </Container2>

          <Container2
            onMouseOver={() => setRemoveIsHovered(true)}
            onMouseLeave={() => setRemoveIsHovered(false)}
            onClick={() => {
              setEditPopInactive();
              dispatch(deleteTodo(todo.id));
            }}
          >
            <Title isHovered={removeIsHovered}>Remove</Title>
          </Container2>
        </Container1>
      </InnerContainer>
    </OuterContainer>
  );
}
