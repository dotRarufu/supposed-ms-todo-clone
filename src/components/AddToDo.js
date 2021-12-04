import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../actions';

import Container1 from './css-components/Container1';
import Container2 from './css-components/Container2';
import Input from './css-components/Input';
import AddButton from './css-components/AddButton';

const CustomContainer2 = styled(Container2)`
  display: inline-block;
  width: 100%;

  padding: 0 5px 0 5px;
`;

const InnerContainer = styled(Container1)`
  display: flex;
  align-items: center;

  width: 100%;
  margin: 5px 0 0 0;
`;

const OuterContainer = styled.div`
  position: fixed;
  bottom: 5px;

  @media (max-width: 550px) {
    width: 94vw;
    left: 50%;
    transform: translateX(-50%);
  }

  @media (min-width: 551px) {
    width: 57.8vw;
    max-width: 500px;
  }
`;

export default function AddToDo({ categoryId }) {
  const dispatch = useDispatch();

  // States
  const [newTodo, setNewTodo] = useState({
    title: '',
    color: '',
  });

  // Handlers
  const handleAddTodo = (title, color, category) => {
    dispatch(addTodo(title, color, category));
  };

  return (
    <OuterContainer>
      <InnerContainer>
        <AddButton
          handleClick={e => {
            if (newTodo.title === '') return;
            handleAddTodo(newTodo.title, newTodo.color, categoryId);
            setNewTodo({ title: '', color: '' });
          }}
        />
        <CustomContainer2>
          <Input
            onChange={e => setNewTodo({ ...newTodo, title: e.target.value })}
            value={newTodo.title}
            placeholder="Add to do"
            maxRows={4}
            color={'#3FA0EF'}
          />
        </CustomContainer2>
      </InnerContainer>
    </OuterContainer>
  );
}
