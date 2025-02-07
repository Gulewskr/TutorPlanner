import PaymentsService from './PaymentsService';
import LessonsService from './LessonsService';
import { paymentRepository } from '../repositories/paymentRepository';
import { lessonRepository } from '../repositories/lessonsRepository';
import { Student, studentRepository } from '../models/student';
import { Lesson } from '../models/lesson';
import { isBefore } from 'date-fns';

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
        const unpaidLessons =
            await lessonRepository.getUnpaidLessonsByStudentId(studentId);
        const paidLessons =
            await lessonRepository.getPaidLessonsByStudentId(studentId);

        let newBalance = 0;
        const paidLessonsIds: number[] = [];
        const lessonsToSetAsNotPaid: Lesson[] = [];
        const unpaidLessonsIds: number[] = [];
        if (unpaidLessons.length && paidLessons.length && isBefore(unpaidLessons[0].date, paidLessons[0].date)) {
            const firstActualPaidLessonIndex = paidLessons.findIndex(paidLesson => paidLesson.date < unpaidLessons[0].date);
            const firstActualUnpaidLessonIndex = unpaidLessons.findIndex(unpaidLesson => unpaidLesson.date > paidLessons[0].date);

            lessonsToSetAsNotPaid.push(...paidLessons.splice(0, firstActualPaidLessonIndex));
            lessonsToSetAsNotPaid.forEach(lesson => {
                newBalance += lesson.price;
            });
            lessonsToSetAsNotPaid.push(...unpaidLessons.splice(0, firstActualUnpaidLessonIndex))
        }

        newBalance += studentPayments - studentLessonsCosts;
        if (newBalance > 0) {
            for (const lesson of lessonsToSetAsNotPaid.sort((a,b) => isBefore(a.date, b.date) ? -1 : 1)) {
                if (lesson.price <= newBalance) {
                    newBalance -= lesson.price;
                    paidLessonsIds.push(lesson.id);
                } else {
                    break;
                }
            }
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
                if (paidLessonsIds.length < lessonsToSetAsNotPaid.length) {
                    await lessonRepository.bulkUpdate(lessonsToSetAsNotPaid.filter(l => !paidLessonsIds.includes(l.id)).map(l => l.id), {
                        isPaid: false,
                    });
                }
            }
        } else if (newBalance < 0) {
            for (const lesson of paidLessons) {
                if (newBalance < 0) {
                    newBalance += lesson.price;
                    unpaidLessonsIds.push(lesson.id);
                } else {
                    break;
                }
            }
            unpaidLessonsIds.push(...lessonsToSetAsNotPaid.map(l => l.id));
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
