
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Join from './Component/Join';
import Chat from './Component/Chat';

function App() {

  return (
    <Router>
    <div className="App">
    <h6 style={{textAlign:'center', margin:'10px'}}>Chat App <i className="far fa-comments"></i></h6>
    </div>
    <Switch>
    <Route path='/' exact component={Join} />
    <Route path='/chat' exact component={Chat} />
    </Switch> 
    </Router>

  );
}

export default App;
