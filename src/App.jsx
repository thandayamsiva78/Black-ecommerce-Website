
import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import MainComponent from './components/ui/MainComponent';
import ProductViewComponent from './components/ui/ProductViewComponent';
import CartComponent from './components/ui/CartComponent';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainComponent/>}/>
        <Route path='/ProductViewComponent' element={<ProductViewComponent/>}/>
        <Route path='/CartComponent' element={<CartComponent/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
