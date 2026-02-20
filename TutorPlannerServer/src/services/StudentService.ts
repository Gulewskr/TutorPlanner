import z from 'zod';
import { StudentsListDTO } from '../models/students/students-list-response.dto';
import { studentRepository } from '../repositories/studentsRepository';
import { StudentDTO, studentToStudentDTO } from '../models/students/student-response.dto';

interface StudentInput {
    firstname: string;
    surename: string;
    class?: string;
    extendedMath?: boolean;
    description?: string;
    defaultPrice?: number;
}

interface StudnentFilter {
    text?: string;
    filter?: 'alphabetical' | 'creationDate' | 'nearestLesson';
    order?: 'asc' | 'desc';
}

const StudentInputSchema = z.object({
    firstname: z.string(),
    surename: z.string(),
    class: z.string().nullish(),
    extendedMath: z.boolean().nullish(),
    description: z.string().nullish(),
    defaultPrice: z.number().nullish(),
});

class StudentService {
    public async getStudents(filters?: StudnentFilter): Promise<StudentsListDTO> {
        if (filters == undefined) {
            const students = await studentRepository.findAll();
            const size = await studentRepository.count();

            return {
                data: students,
                size: size,
            };
        }
        throw new Error('Filters are not implemented yet.');
    }
    public async getStudent(studentId: number): Promise<StudentDTO> {
        const student = await studentRepository.findStudentById(studentId);
        if (student == null) {
            throw new Error(`Student not found`);
        }
        return student;
    }
    public async createStudent(input: StudentInput): Promise<StudentDTO> {
        const data = StudentInputSchema.parse(input);
        console.log(`Adding student: ${data}`);
        const student = await studentRepository.create(data);
        return studentToStudentDTO(student);
    }
    public async updateStudent(
        studentId: number,
        student: StudentInput,
    ): Promise<StudentDTO> {
        return await studentRepository.update(studentId, student);
    }
    public async disableStudent(studentId: number): Promise<StudentDTO> {
        const student = await studentRepository.disable(studentId);
        return studentToStudentDTO(student);
    }
}

export default new StudentService();
export { StudentInput };
