import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import TeachersContext from "../../../context/dataCon";
import { ITeachers } from "../../teachers";
import axios from "axios";
const AddUpdataTeacher = () => {
  const { teacherId } = useParams();
  const { teachers } = useContext<any>(TeachersContext);
  let { student } = useContext<any>(TeachersContext);
  const { setupdate } = useContext<any>(TeachersContext);
  const { update } = useContext<any>(TeachersContext);
  const [teachersdata, setteachersdata] = useState<ITeachers[]>([]);
  const [ISUpdate, setISUpdate] = useState<boolean>(false);
  const [teacherName, setteacherName] = useState("");
  const [age, setage] = useState("");
  const [teaches, setteaches] = useState("");
  const [ErrMsg, setErrMsg] = useState("");
  const navigator = useNavigate();
  // handle first name
  const firtsNameFun = (e: any) => {
    setteacherName(e.target.value);
  };

  // handle age
  const ageFun = (e: any) => {
    setage(e.target.value);
  };
  // handle teaches
  const teachesFun = (e: any) => {
    setteaches(e.target.value);
  };

  //check if we add or ypdate
  useEffect(() => {
    if (teacherId) {
      setISUpdate(true);
      if (student) {
        setteacherName(teachers[+teacherId - 1].Name);
        setage(teachers[+teacherId - 1].Age);
        setteaches(teachers[+teacherId - 1].Teaches);
      }
    }
  }, [student]);
  //get teachers data to choose
  useEffect(() => {
    if (teachers) {
      setteachersdata(teachers);
    }
  }, [teachers]);
  //handle submit
  const handleSubmit = async () => {
    //handle empty data
    if (teacherName == "" || age == "" || teaches == "") {
      setErrMsg("please complete the data");
    } else {
      //add
      if (!ISUpdate) {
        const newstudent = {
          Name: teacherName,
          Age: age,
          Teaches: teaches,
        };

        await axios
          .post("http://localhost:9000/teachers", newstudent)
          .then((response) => {
            console.log(response);
            setupdate(!update);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            navigator("/");
          });
      } else {
        //edit
        const newstudent = {
          id: teacherId,
          Name: teacherName,
          Age: age,
          Teaches: teaches,
        };
        await axios
          .patch(`http://localhost:9000/teachers/${teacherId}`, newstudent)
          .then((response) => {
            console.log(response);
            setupdate(!update);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            navigator("/");
          });
      }
    }
  };
  return (
    <>
      <>
        <div className="form">
          <div className="container">
            <div className="input-feild">
              <label>add name</label>
              <input
                onChange={(e) => {
                  firtsNameFun(e);
                }}
                type="text"
                value={teacherName}
              ></input>
            </div>
          </div>
          <div className="input-feild">
            <label>add age </label>
            <input
              onChange={(e) => {
                ageFun(e);
              }}
              type="number"
              value={age}
            ></input>
          </div>
          <div className="input-feild">
            <label>teaches what</label>
            <input
              onChange={(e) => {
                teachesFun(e);
              }}
              type="text"
              value={teaches}
            ></input>
          </div>
          <div className="submit-feild">
            <button
              onClick={() => {
                handleSubmit();
              }}
            >
              submit
            </button>
            <Link className="cansel-feild" to={"/"}>
              cansel
            </Link>
            {ErrMsg}
          </div>
        </div>
      </>
    </>
  );
};
export default AddUpdataTeacher;
