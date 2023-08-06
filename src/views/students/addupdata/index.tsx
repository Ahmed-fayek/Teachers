import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import TeachersContext from "../../../context/dataCon";
import { ITeachers } from "../../teachers";
import axios from "axios";
import { Student } from "..";
const AddUpdataStudent = () => {
  const { studentId } = useParams();
  const { teachers } = useContext<any>(TeachersContext);
  let { student } = useContext<any>(TeachersContext);
  const { setupdate } = useContext<any>(TeachersContext);
  const { update } = useContext<any>(TeachersContext);
  const [teachersdata, setteachersdata] = useState<ITeachers[]>([]);
  const [ISUpdate, setISUpdate] = useState<boolean>(false);
  const [studentData, setStudent] = useState<Student>();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setage] = useState("");
  const [classroom, setclassroom] = useState("");
  const [Gpa, setGpa] = useState("");
  const [teacherId, setteacherId] = useState("");
  const [ErrMsg, setErrMsg] = useState("");
  const navigator = useNavigate();
  // handle first name
  const firtsNameFun = (e: any) => {
    setfirstName(e.target.value);
  };
  // handle last name
  const lastNameFun = (e: any) => {
    setlastName(e.target.value);
  };
  // handle age
  const ageFun = (e: any) => {
    setage(e.target.value);
  };
  // handle classroom
  const classRoomFun = (e: any) => {
    setclassroom(e.target.value);
  };
  // handle GPA
  const GPaFun = (e: any) => {
    setGpa(e.target.value);
  };
  // handle Teacher choosing
  const teacherIdFun = (e: any) => {
    setteacherId(e.target.value);
  };
  //check if we add or ypdate
  useEffect(() => {
    if (studentId) {
      setISUpdate(true);
      if (student) {
        setStudent(student[+studentId - 1]);
        setfirstName(student[+studentId - 1].FirstName);
        setlastName(student[+studentId - 1].LasttName);
        setage(student[+studentId - 1].Age);
        setclassroom(student[+studentId - 1].Classroom);
        setGpa(student[+studentId - 1].GPA);
        setteacherId(student[+studentId - 1].TeacherId);
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
    if (
      firstName == "" ||
      lastName == "" ||
      age == "" ||
      classroom == "" ||
      Gpa == "" ||
      teacherId == ""
    ) {
      setErrMsg("please complete the data");
    } else {
      //add
      if (!ISUpdate) {
        const newstudent = {
          FirstName: firstName,
          LastNAme: lastName,
          Age: age,
          Classroom: classroom,
          GPA: Gpa,
          TeacherId: teacherId,
        };

        await axios
          .post("http://localhost:9000/students", newstudent)
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
          id: studentId,
          FirstName: firstName,
          LastNAme: lastName,
          Age: age,
          Classroom: classroom,
          GPA: Gpa,
          TeacherId: teacherId,
        };
        await axios
          .patch(`http://localhost:9000/students/${studentId}`, newstudent)
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
              <label>add first name</label>
              <input
                onChange={(e) => {
                  firtsNameFun(e);
                }}
                type="text"
                value={firstName}
              ></input>
            </div>
            <div className="input-feild">
              <label>add last name</label>
              <input
                value={lastName}
                onChange={(e) => {
                  lastNameFun(e);
                }}
                type="text"
              ></input>
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
              <label>add classroom</label>
              <input
                onChange={(e) => {
                  classRoomFun(e);
                }}
                type="number"
                value={classroom}
              ></input>
            </div>
            <div className="input-feild">
              <label>add Gpa </label>
              <input
                onChange={(e) => {
                  GPaFun(e);
                }}
                type="number"
                value={Gpa}
              ></input>
            </div>
            <div className="input-feild">
              <label>choose your teacher</label>
              <select
                value={teacherId}
                onChange={(e) => {
                  teacherIdFun(e);
                }}
              >
                {teachersdata.map((teacher) => {
                  <option>select</option>;

                  return (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher?.Name}
                    </option>
                  );
                })}
              </select>
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
        </div>
      </>
    </>
  );
};
export default AddUpdataStudent;
