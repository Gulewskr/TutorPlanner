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
            await lessonRepository.getSumOfPaidLessonsByStudentId(studentId);
        let newBalance = studentPayments - studentLessonsCosts;
        if (newBalance > 0) {
            const unpaidLessons =
                await lessonRepository.getUnpaidLessonsByStudentId(studentId);
            const paidLessonsIds = [];
            for (const lesson of unpaidLessons) {
                if (lesson.price <= newBalance) {
                    newBalance -= lesson.price;
                    paidLessonsIds.push(lesson.id);
                } else {
                    break;
                }
            }
            if (paidLessonsIds.length) {
                await lessonRepository.bulkUpdate(paidLessonsIds, {
                    isPaid: true,
                });
            }
        } else if (newBalance < 0) {
            const unpaidLessonsIds = [];
            const paidLessons =
                await lessonRepository.getPaidLessonsByStudentId(studentId);
            for (const lesson of paidLessons) {
                if (newBalance < 0) {
                    newBalance += lesson.price;
                    unpaidLessonsIds.push(lesson.id);
                } else {
                    break;
                }
            }
            if (unpaidLessonsIds.length) {
                await lessonRepository.bulkUpdate(unpaidLessonsIds, {
                    isPaid: false,
                });
            }
        }
        return await studentRepository.update(studentId, {
            balance: newBalance,
        });
    }

    public async recalculateAllStudentsBalance(): Promise<void> {
        const students = await studentRepository.findAll();
        for (const stud of students) {
            await this.recalculateStudentBalance(stud.id);
        }
        return;
    }
}

export default new StudentPaymentsService();
