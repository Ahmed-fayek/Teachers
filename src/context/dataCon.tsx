import { createContext, useState } from "react";
const TeachersContext = createContext({});
export const TeachersProvider = ({ children }: any) => {
  const [teachers, setTeachers] = useState();
  const [student, setStudent] = useState();
  const [updata, setupdata] = useState<boolean>();
  return (
    <TeachersContext.Provider
      value={{
        teachers,
        setTeachers,
        student,
        setStudent,
        updata,
        setupdata,
      }}
    >
      {children}
    </TeachersContext.Provider>
  );
};
export default TeachersContext;
