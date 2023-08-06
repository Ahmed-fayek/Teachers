import { useState } from "react";
import "./styles.css";
import Students from "../students";
import Teachers from "../teachers";
function Home() {
  const [switchtable, setSwitchtable] = useState("students");
  return (
    <div className="main">
      <div className="container">
        <h1 className="header">Students and Teachers Information</h1>
        <div className="switch-btns">
          <button
            className={switchtable == "students" ? "active" : ""}
            onClick={() => {
              setSwitchtable("students");
            }}
          >
            students
          </button>
          <button
            className={switchtable == "teachers" ? "active" : ""}
            onClick={(e) => {
              setSwitchtable("teachers");
            }}
          >
            teachers
          </button>
        </div>
        <div className="table-data">
          {switchtable == "students" ? <Students /> : <Teachers />}
        </div>
      </div>
    </div>
  );
}
export default Home;
