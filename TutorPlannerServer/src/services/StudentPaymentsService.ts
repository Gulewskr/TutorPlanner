import PaymentsService from './PaymentsService';
import LessonsService from './LessonsService';
import { paymentRepository } from '../repositories/paymentRepository';
import { lessonRepository } from '../repositories/lessonsRepository';
import { Student, studentRepository } from '../models/student';

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
    //TODO - use transaction
    public async recalculateStudentBalance(
        studentId: number,
    ): Promise<Student> {
        const studentPayments =
            await paymentRepository.getSumOfPaymentByStudentId(studentId);
        const studentLessonsCosts =
            await lessonRepository.getSumLessonsPriceByStudentId(studentId);
        let newBalance = studentPayments - studentLessonsCosts;
        const unpaidLessons =
            await lessonRepository.getUnpaidLessonsByStudentId(studentId);
        let paidLessonsIds = [];
        for (const lesson of unpaidLessons) {
            if (lesson.price < newBalance) {
                newBalance -= lesson.price;
                paidLessonsIds.push(lesson.id);
            }
        }
        if (paidLessonsIds.length) {
            await lessonRepository.bulkUpdate(paidLessonsIds, { isPaid: true });
        }
        return await studentRepository.update(studentId, {
            balance: newBalance,
        });
    }
}

export default new StudentPaymentsService();
