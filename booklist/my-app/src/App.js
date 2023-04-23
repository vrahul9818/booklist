import { BrowserRouter, Route, Routes } from "react-router-dom";
import Addbook from "./component/add_disp";
import UserBookdisplay from "./component/displaybook";
import Login from "./component/login";
import SignUp from "./component/signup";
import { DataProvider } from "./component/context/bookcontext";
import Editbook from "./component/context/editBook";
import Editcurrbook from "./component/context/editcurrbook";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/addbook" element={<Addbook/>}/>
        <Route path="/dispUserbook" element={<DataProvider><UserBookdisplay/></DataProvider>}/>
        <Route path="/editBook" element={<DataProvider><Editbook/></DataProvider>}/>
        <Route path="editcurrbook" element={<DataProvider><Editcurrbook/></DataProvider>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
