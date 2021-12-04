import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { checkedTodo } from '../actions';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import Category from './Category';
import EditPop from './EditPop';
import HamburgerMenu from './css-components/HamburgerMenu';
import Completed from './Completed';
import AddToDo from './AddToDo';
import Menu from './Menu';

const InnerContainer = styled.div.attrs({ id: 'inner-container' })`
  ${props => props.iscentered}
`;
const OuterContainer = styled.div`
  border-radius: 8px;

  padding: 10px 15px;

  height: 100vh;
  overflow: hidden;
`;

const CoverOthers = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
`;

export default function Todos() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const selectedCategory = categories.find(category => category.selected) || {
    id: 'false',
  };

  // States
  const [editPop, setEditPop] = useState({ isActive: false, todoId: null });
  const [hamburgerMenuIsActive, setHamburgerMenuIsActive] = useState(false);
  const [isGreaterThan550pxWide, setIsGreaterThan550pxWide] = useState(
    window.innerWidth >= 550
  );
  const [anim, setAnim] = useState({ menu: false, editPop: false });

  // Effects
  useEffect(() => {
    const handleWindowResize = () => {
      setIsGreaterThan550pxWide(window.innerWidth >= 550);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // Handlers
  const handleHamburgerMenuIsActive = value => {
    setHamburgerMenuIsActive(value);
  };
  const handleHamburgerMenuClick = value => {
    handleHamburgerMenuIsActive(value);
  };
  const handleEditPopActive = (e, id) => {
    if (e.target.id === 'checkbox' || e.target.id === 'checkbox-container')
      return;

    setEditPop({ isActive: true, todoId: id });
  };
  const handleClickEditPopInactive = e => {
    if (!editPop.isActive) return;

    const editPopElem = document.querySelector('#edit-pop');
    const editPopChildren = [...editPopElem.children];
    if (
      editPopChildren.find(child => child === e.target) ||
      editPopElem === e.target
    )
      return;

    setAnim({ ...anim, editPop: true });

    setTimeout(() => {
      setEditPop({ ...editPop, isActive: false });
      setAnim({ ...anim, editPop: false });
    }, 500);
  };
  const handleHamburgerMenuPopInactive = e => {
    if (!hamburgerMenuIsActive) return;

    setAnim({ ...anim, menu: true });
    setTimeout(() => {
      handleHamburgerMenuClick(false);
      setAnim({ ...anim, menu: false });
    }, 500);
  };

  // Populate Functions
  const populateTodos = () => {
    return categories.map((category, i) => {
      if (category.selected)
        return (
          <Category
            key={i}
            categoryId={category.id}
            handleEditPopActive={handleEditPopActive}
            handleCheckboxClick={handleCheckboxClick}
          />
        );
      return null;
    });
  };

  // Handlers
  const handleCheckboxClick = id => {
    dispatch(checkedTodo(id));
  };

  return (
    <OuterContainer>
      {isGreaterThan550pxWide ? <Menu position="relative" /> : null}

      <InnerContainer
        iscentered={
          isGreaterThan550pxWide
            ? 'display: inline-block; width: 58vw; max-width: 500px'
            : 'margin: 0 auto; width: 95vw;'
        }
      >
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          style={{ height: '100vh' }}
        >
          {!isGreaterThan550pxWide ? (
            <HamburgerMenu
              handleHamburgerMenuClick={handleHamburgerMenuClick}
            />
          ) : null}

          {populateTodos()}

          <Completed
            handleEditPopActive={handleEditPopActive}
            handleCheckboxClick={handleCheckboxClick}
          />
          <div style={{ height: '35px' }}></div>

          <AddToDo categoryId={selectedCategory.id} />
          {editPop.isActive || hamburgerMenuIsActive ? (
            <CoverOthers
              onClick={e => {
                handleClickEditPopInactive(e);
                handleHamburgerMenuPopInactive(e);
              }}
            />
          ) : null}
        </Scrollbars>
      </InnerContainer>

      {editPop.isActive ? (
        <EditPop
          todoId={editPop.todoId}
          setEditPopInactive={() => setEditPop({ ...editPop, isActive: false })}
          anim={anim.editPop}
        />
      ) : null}

      {hamburgerMenuIsActive && !isGreaterThan550pxWide ? (
        <Menu anim={anim.menu} />
      ) : null}
    </OuterContainer>
  );
}
