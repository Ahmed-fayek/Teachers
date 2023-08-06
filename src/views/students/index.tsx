import { useContext, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import "./styles.css";
import TeachersContext from "../../context/dataCon";
import { Link } from "react-router-dom";
import axios from "axios";
export interface Student {
  id: number;
  FirstName: string;
  LastNAme: string;
  Age: number;
  Classroom: number;
  GPA: number;
  TeacherId: number;
}
const Students = () => {
  const [studentData, setStudentData] = useState<Student[]>([]);
  const { student } = useContext<any>(TeachersContext);
  const { setupdate } = useContext<any>(TeachersContext);
  const { update } = useContext<any>(TeachersContext);
  const handleDelete = async (eleId: any) => {
    await axios
      .delete(`http://localhost:9000/students/${eleId}`)
      .then((res) => {
        setupdate(!update);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    setStudentData(student);
  }, [student]);
  if (studentData) {
    return (
      <Container>
        <Link className="add-btn" to={"/student"}>
          Add Student
        </Link>
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Classroom</th>
              <th>GPA</th>
              <th>Teacher id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student) => (
              <tr key={student.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{student.FirstName}</td>
                <td>{student.LastNAme}</td>
                <td>{student.Age}</td>
                <td>{student.Classroom}</td>
                <td>{student.GPA}</td>
                <td>{student.TeacherId}</td>
                <td className="action-btns">
                  <Link to={`/student/${student.id}`}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>{" "}
                  <i
                    onClick={() => {
                      handleDelete(student.id);
                    }}
                    className="fa-solid fa-trash"
                    style={{ color: "#eb0000" }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  } else {
    return <>Loading</>;
  }
};

export default Students;
