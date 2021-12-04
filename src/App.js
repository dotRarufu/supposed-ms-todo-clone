import Todos from './components/Todos';
import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background: #101010;
    overflow: hidden;
  }
`;

function App() {
  return (
    <div className="App">
      <Global />
      <Todos></Todos>
    </div>
  );
}

export default App;
