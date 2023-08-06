import { useContext, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import "./styles.css";
import TeachersContext from "../../context/dataCon";
interface Student {
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

  useEffect(() => {
    setStudentData(student);
  }, [student]);
  if (studentData) {
    return (
      <Container>
        <Table striped bordered responsive>
          <thead>
            <tr>
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
            {studentData.map((row) => (
              <tr key={row.id}>
                <td>{row.FirstName}</td>
                <td>{row.LastNAme}</td>
                <td>{row.Age}</td>
                <td>{row.Classroom}</td>
                <td>{row.GPA}</td>
                <td>{row.TeacherId}</td>
                <td className="action-btns">
                  <i className="fa-regular fa-pen-to-square"></i>
                  <i
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
