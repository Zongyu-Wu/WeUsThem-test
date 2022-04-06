import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ContactHome from './component/ContactHome';
import CreateContact from './component/CreateContact';
import Header from './component/header';
import UpdateContact from './component/UpdateContact';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<ContactHome/>}></Route>
          <Route exact path="/create" element={<CreateContact/>}></Route>
          <Route exact path="/update/:id" element={<UpdateContact/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
