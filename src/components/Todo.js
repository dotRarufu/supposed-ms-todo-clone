import Title from './css-components/Title';
import Container2 from './css-components/Container2';
import Checkbox from './css-components/Checkbox';

export default function Todo({
  title,
  color,
  id,
  completed,
  handleEditPopActive,
  handleCheckboxClick,
}) {
  return (
    <Container2 color={color} onClick={e => handleEditPopActive(e, id)}>
      <Checkbox
        completed={completed}
        handleClick={() => handleCheckboxClick(id)}
      />
      <Title>{title}</Title>
    </Container2>
  );
}
