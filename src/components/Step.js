import Container2 from './css-components/Container2';
import Checkbox from './css-components/Checkbox';
import Input from './css-components/Input';
import XButton from './css-components/XButton';

import { useDispatch } from 'react-redux';
import { renameStep, completeStep, deleteStep } from '../actions';
import { animated, useSpring } from 'react-spring';
import { useState } from 'react';

const AnimatedContainer2 = animated(Container2);

export default function Step({ stepOuter, todoSteps, i, setTodoSteps, id }) {
  const dispatch = useDispatch();

  const [isRemoved, setIsRemoved] = useState(false);

  const animationContainer2 = useSpring({
    from: { translateX: '100%', opacity: 0 },
    to: { translateX: '0%', opacity: 1 },
    reverse: isRemoved,
    reset: isRemoved,
  });

  return (
    <AnimatedContainer2 style={animationContainer2}>
      <Checkbox
        completed={stepOuter.completed}
        handleClick={() => {
          setTodoSteps(
            todoSteps.map(step => {
              if (step.id === stepOuter.id) {
                return { ...step, completed: !step.completed };
              }
              return step;
            })
          );

          dispatch(completeStep(stepOuter.id, id));
        }}
      />
      <Input
        onChange={event =>
          setTodoSteps(
            todoSteps.map((step, g) => {
              if (i === g) return { ...step, name: event.target.value };
              return step;
            })
          )
        }
        onBlur={e => dispatch(renameStep(todoSteps[i].id, e.target.value, id))}
        minuswidth="45px"
        placeholder="Step"
        value={todoSteps[i].name}
        maxRows={4}
      />
      <XButton
        handleClick={() => {
          dispatch(deleteStep(stepOuter.id, id));
          //   setIsRemoved(!isRemoved); causes animation bug
          setTodoSteps(todoSteps.filter(step => step.id !== stepOuter.id));
        }}
      />
    </AnimatedContainer2>
  );
}
