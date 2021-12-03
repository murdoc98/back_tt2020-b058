import { IsString, IsUUID, validateOrReject } from "class-validator";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, getRepository, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
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

  public constructor(params?: InewQuiz) {
    super();
    if (params) {
      this.status = 'In progress';
      params.enrollment instanceof Enrollment ? this.enrollment = params.enrollment : this.enrollmentId = params.enrollment;
    }
  };
  public async getQuizzesByStudent(studentId: string, groupId:string) {
    const response = await getRepository(Quiz)
      .createQueryBuilder('quiz')
      .leftJoin('quiz.enrollment', 'enrollment')
      .leftJoinAndSelect('quiz.answers', 'answers')
      .where('enrollment.studentId = :studentId', { studentId })
      .andWhere('enrollment.groupId = :groupId', { groupId })
      .getMany();
    response.forEach(quiz => {
      let status: string;
      if(!lessThanOneHourAgo(quiz.created_at!.getTime()) || quiz.answers!.length >= 10) {
        status = 'Completo'
      } else if(lessThanOneHourAgo(quiz.created_at!.getTime()) || quiz.answers!.length < 10) {
        status = 'En proceso'
      } else {
        status = 'Incompleto'
      }
      quiz.status = status;
      quiz.totalAnswers = quiz.answers!.length;
      delete quiz.answers;
      delete quiz.updated_at;
      delete quiz.enrollmentId;
    });
    return response;
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