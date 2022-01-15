import ReactDOM from 'react-dom';
import './styles/output.css';
import './index.css'
import { App } from './components/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,

  document.getElementById('root')
);

