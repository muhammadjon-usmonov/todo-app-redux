import { Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Main from "./Component/Main/Main";
import Jobs from "./Component/Jobs/Jobs";
import Level from "./Component/Level/Level";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
function App() {
  return (
    <div className="App">
      <div className="my-container py-2">
        <div className="d-flex justify-content-around">
          <NavLink className="text-decoration-none" to="">
            <div className="h3">Hodimlar</div>
          </NavLink>
          <NavLink className="text-decoration-none" to="jobs">
            <div className="h3">Lavozimlar</div>
          </NavLink>
          <NavLink className="text-decoration-none" to="lavozim">
            <div className="h3">Ilmiy daraja</div>
          </NavLink>
        </div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/lavozim" element={<Level/>}/>
        </Routes>
      </div>
    </div>
  );
}
export default App;
