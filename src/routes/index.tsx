import { Route, Routes } from "react-router-dom";
import AddUpdataStudent from "../views/students/addupdata";
import AddUpdataTeacher from "../views/teachers/AddUpdate";
import Home from "../views/main";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/student/:studentId?"
          element={<AddUpdataStudent />}
        ></Route>
        <Route
          path="/teacher/:teacherId?"
          element={<AddUpdataTeacher />}
        ></Route>
      </Routes>
    </>
  );
};
export default MainRouter;
