import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Homepage from './page/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Homepage />
      </div>
    </BrowserRouter>
  );
}

export default App;
