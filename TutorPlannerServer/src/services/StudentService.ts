import { StudentsDTO } from '../dto/students';
import { Student, studentRepository } from '../models/student';

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

class StudentService {
    public async getStudents(filters?: StudnentFilter): Promise<StudentsDTO> {
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
    public async getStudent(studentId: number): Promise<Student> {
        const student = await studentRepository.findStudentById(studentId);
        if (student == null) {
            throw new Error(`Student not found`);
        }
        return student;
    }
    public async createStudent(student: StudentInput): Promise<Student> {
        return await studentRepository.create(student);
    }
    public async updateStudent(
        studentId: number,
        student: StudentInput,
    ): Promise<Student> {
        return await studentRepository.update(studentId, student);
    }
}

export default new StudentService();
export { StudentInput };
