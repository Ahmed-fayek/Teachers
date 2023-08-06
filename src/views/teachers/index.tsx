import { useContext, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import "./styles.css";
import { Link } from "react-router-dom";
interface ITeachers {
  id: number;
  Name: string;
  Age: number;
  Teaches: string;
}
const Teacher = () => {
  const teachers = [
    {
      id: 1,
      Name: "string",
      Age: 2,
      Teaches: "string",
    },
  ];
  const [teachersData, setTeacherData] = useState<ITeachers[]>([]);
  useEffect(() => {
    setTeacherData(teachers);
  }, [teachers]);
  if (teachersData) {
    return (
      <Container>
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>teacher Name</th>
              <th>Age</th>
              <th>teaches</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {teachersData.map((row) => (
              <tr key={row.id}>
                <td>{row.Name}</td>
                <td>{row.Age}</td>
                <td>{row.Teaches}</td>
                <td className="action-btns">
                  <Link to={`/teacher/${row.id}`}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>
                  <i
                    className="fa-solid fa-trash"
                    style={{ color: "#eb0000" }}
                  ></i>{" "}
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

export default Teacher;
