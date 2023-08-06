import { useContext, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import TeachersContext from "../../context/dataCon";
export interface ITeachers {
  id: number;
  Name: string;
  Age: number;
  Teaches: string;
}
const Teacher = () => {
  const { setupdate } = useContext<any>(TeachersContext);
  const { update } = useContext<any>(TeachersContext);
  const [teachersData, setTeacherData] = useState<ITeachers[]>([]);
  useEffect(() => {
    axios.get("http://localhost:9000/teachers").then((res) => {
      setTeacherData(res.data);
    });
  }, [update]);
  const handleDelete = async (eleId: any) => {
    await axios
      .delete(`http://localhost:9000/teachers/${eleId}`)
      .then((res) => {
        setupdate(!update);
      })
      .catch((err) => {});
  };
  if (teachersData) {
    return (
      <Container>
        <Link className="add-btn" to={"/teacher"}>
          Add Teacher
        </Link>
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
            {teachersData.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.Name}</td>
                <td>{teacher.Age}</td>
                <td>{teacher.Teaches}</td>
                <td className="action-btns">
                  <Link to={`/teacher/${teacher.id}`}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>
                  <i
                    onClick={() => {
                      handleDelete(teacher.id);
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

export default Teacher;
