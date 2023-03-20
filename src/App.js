import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Homepage from './page/HomePage';
import { rootStore } from './redux';

function App() {
  return (
    // <Provider store={rootStore}>
    <BrowserRouter>
      <div className="App">
        <Homepage />
      </div>
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
