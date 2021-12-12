import { IsString, IsUUID, validateOrReject } from "class-validator";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, getRepository, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4, version as uuidVersion, validate as uuidValidate } from 'uuid';
import Answer from "models/Answer.model";
import Enrollment from "./Enrollment.model";

interface InewQuiz {
  enrollment: string | Enrollment;
}

@Entity({ name: 'quiz' })
export default class Quiz extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', unique: true, nullable: false })
  @IsUUID()
  id?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => Answer, (answer) => answer.quiz)
  answers?: Answer[];

  @Column({ nullable: false })
  enrollmentId?: string;
  @ManyToOne(() => Enrollment, (enrollment) => enrollment.quizzes)
  @JoinColumn({ name: 'enrollmentId' })
  enrollment?: Enrollment;

  // Calculated attributes
  status?: string;
  totalAnswers?: number;
  plainGrade?: number;
  processGrade?: number;

  public constructor(params?: InewQuiz) {
    super();
    if (params) {
      this.status = 'In progress';
      params.enrollment instanceof Enrollment ? this.enrollment = params.enrollment : this.enrollmentId = params.enrollment;
    }
  };
  public async getQuiz(quizId: string) {
    if (!(uuidValidate(quizId) && uuidVersion(quizId) === 4))
      throw Error('No quiz');
    const response = await getRepository(Quiz)
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.answers', 'answers')
      .where('quiz.id = :quizId', { quizId })
      .getOne();
    if (!response) throw Error('No quiz');
    this.id = response.id;
    this.created_at = response.created_at;
    this.updated_at = response.updated_at;
    this.enrollmentId = response.enrollmentId;
    this.answers = response.answers;
    this.status = this.getStatus(response);
    this.totalAnswers = this.answers ? this.answers.length : 0;
  }
  public async getQuizzesByStudent(studentId: string, groupId: string) {
    const response = await getRepository(Quiz)
      .createQueryBuilder('quiz')
      .leftJoin('quiz.enrollment', 'enrollment')
      .leftJoinAndSelect('quiz.answers', 'answers')
      .where('enrollment.studentId = :studentId', { studentId })
      .andWhere('enrollment.groupId = :groupId', { groupId })
      .getMany();
    response.forEach(quiz => {
      let generalCal = 0;
      let specCal = 0;
      quiz.answers?.forEach(specAnswer => {
        generalCal += specAnswer.accuracy!;
        specCal += specAnswer.accuracy! * specAnswer.espComplexity! * specAnswer.genComplexity!;
      });
      quiz.status = this.getStatus(quiz);
      quiz.totalAnswers = quiz.answers!.length;
      quiz.plainGrade = generalCal;
      quiz.processGrade = specCal;
      delete quiz.answers;
      delete quiz.updated_at;
      delete quiz.enrollmentId;
    });
    return response;
  }
  public getStatus(quiz: Quiz) {
    console.log(lessThanOneHourAgo(quiz.created_at!.getTime()));
    console.log(quiz.answers!.length);
    if (!lessThanOneHourAgo(quiz.created_at!.getTime()) || quiz.answers!.length >= 10) {
      return 'Completo'
    } else if (lessThanOneHourAgo(quiz.created_at!.getTime()) && quiz.answers!.length < 10) {
      return 'En proceso'
    } else {
      return 'Incompleto'
    }
  }

  @BeforeInsert()
  async validateModel(): Promise<void> {
    this.id = uuidv4();
    this.created_at = new Date();
    await validateOrReject(this, {
      validationError: { value: true, target: false }
    });
  }
  @BeforeUpdate()
  async setUpdateDate(): Promise<void> {
    this.updated_at = new Date();
  }
}
const lessThanOneHourAgo = (date: number) => {
  const HOUR = 1000 * 60 * 60;
  const anHourAgo = Date.now() - HOUR;
  return date > anHourAgo;
}