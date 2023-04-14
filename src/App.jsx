import { Routes, Route } from 'react-router-dom';
import { Main } from "./pages/Main";
import { Menu } from './pages/Menu';

import first from "./previews/1.webp";
import second from "./previews/2.webp";
import third from "./previews/3.webp";
import fourth from "./previews/4.webp";
import fifth from "./previews/5.webp";
import sixth from "./previews/6.webp";

export const App = () => {
  const arr = [first, second, third, fourth, fifth, sixth];
  return (
    <div className="App">
      <Routes>
        <Route path='starwars_wiki/' element={<Menu paths={arr} />} />
        <Route path='/' element={<Menu paths={arr} />} />
        {arr.map((el, i) =>
          <Route path={`/${i+1}`} element={<Main chapter={i+1} preview={el} />} key={i} />
        )}
        {arr.map((el, i) =>
          <Route path={`starwars_wiki/${i+1}`} element={<Main chapter={i+1} preview={el} />} key={i} />
        )}
      </Routes>
    </div>
  );
}
