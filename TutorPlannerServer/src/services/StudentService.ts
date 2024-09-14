import { Student, studentRepository } from '../models/student';

interface StudentCreateInput {
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
    public async getStudents(filters?: StudnentFilter): Promise<Student[]> {
        if (filters == undefined) {
            return await studentRepository.getAllStudents();
        }
        throw new Error('Filters are not implemented yet.');
    }
    public async getStudent(studentId: number): Promise<Student> {
        const student = await studentRepository.getStudentById(studentId);
        if (student == null) {
            throw new Error(`Student not found`);
        }
        return student;
    }
    public async createStudent(student: StudentCreateInput): Promise<Student> {
        console.log(`creating...`);
        console.log(student);
        return await studentRepository.createStudent(student);
    }
}

export default new StudentService();
export { StudentCreateInput };
