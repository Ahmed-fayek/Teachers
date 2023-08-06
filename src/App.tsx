import "./App.css";
import "./assets/all/all.min.css";
import TeachersData from "./services/getData";
import MainRouter from "./routes";
import Home from "./views/main";
function App() {
  TeachersData();
  return (
    <>
      <div className="App">
        <MainRouter />
      </div>
    </>
  );
}

export default App;
