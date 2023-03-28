import { Routes, Route } from 'react-router-dom';
import { Main } from "./pages/Main";
import { Menu } from './pages/Menu';

export const App = () => {
  const arr = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Menu />} />
        {arr.map((el, i) =>
          <Route path={`/${i+1}`} element={<Main />} />
        )}
      </Routes>
    </div>
  );
}
