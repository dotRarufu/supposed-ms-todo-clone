import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';

import BlockContainer from './BlockContainer';

const InnerContainer = styled.div.attrs({ id: 'hamburger-menu-pop' })`
  margin-bottom: 12px;
  cursor: pointer;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-left: 10px;

  &:hover {
    background: #1f2123;
  }
`;

export default function HamburgerMenu({ handleHamburgerMenuClick }) {
  return (
    <BlockContainer>
      <InnerContainer>
        <GiHamburgerMenu
          color="#3FA0EF"
          onClick={() => handleHamburgerMenuClick(true)}
        />
      </InnerContainer>
    </BlockContainer>
  );
}
