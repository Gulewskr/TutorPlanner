import { StudentDTO } from "./student-response.dto";

export type StudentsListDTO = {
    data: StudentDTO[];
    size: number;
};