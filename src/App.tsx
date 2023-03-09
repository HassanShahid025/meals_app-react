// 4:43:00

import './App.css';
import { useGlobalContext } from './components/Context';
import { Favourite } from './components/Favourite';
import { Meals } from './components/Meals';
import { Modal } from './components/Modal';
import { Searh } from './components/Search';

function App() {

  const { showModal, favorites } = useGlobalContext()!

  return (
    <main>
      <Searh/>
      {favorites.length > 0 && <Favourite/>}
      <Meals/>
      {showModal && <Modal/>}
    </main>
  );
}

export default App;
