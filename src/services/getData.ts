import { useContext, useEffect, useState } from "react";
import axios from "axios";
import TeachersContext from "../context/dataCon";
const TeachersData = () => {
  const { setTeachers } = useContext<any>(TeachersContext);
  const { setStudent } = useContext<any>(TeachersContext);
  const { update } = useContext<any>(TeachersContext);
  useEffect(() => {
     axios
      .get("http://localhost:9000/teachers").then((res) => {
        setTeachers(res.data)
        console.log(res);
      })
  }, [update]);
  useEffect(() => {
     axios
      .get("http://localhost:9000/students").then((res) => {
        setStudent(res.data)
      })
  }, [update]);
}
export default TeachersData;