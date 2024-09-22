import { Student } from '../models/student';

type StudentDTO = Student;
type StudentsDTO = {
    data: StudentDTO[];
    size: number;
};

export { StudentDTO, StudentsDTO };
