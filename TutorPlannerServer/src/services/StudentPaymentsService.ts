import PaymentsService from './PaymentsService';
import LessonsService from './LessonsService';

class StudentPaymentsService {
    public async autoMarkPayments(studentId: number): Promise<void> {
        const studentBuget = (
            await PaymentsService.getStudentPayments(studentId)
        ).reduce((a, b) => a + b.price, 0);
        const { sum } = await LessonsService.getPaidStudentLessons(studentId);
        //TODO
        if (studentBuget > sum) {
            //mark future lessons
        } else {
            //remove payment from lessons
        }
    }
}

export default new StudentPaymentsService();
