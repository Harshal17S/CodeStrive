import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar/Navbar'

import Form from './components/Form';
import Past from './components/Past'
import Upcoming from './components/Upcoming'

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Past/> */}
      <Upcoming />
      <Form />
    </div>
  );
}

export default App;
