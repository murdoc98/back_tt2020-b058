import { IsString, IsUUID } from "class-validator";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import Quiz from "models/Quiz.model";

@Entity({ name: 'answer' })
export default class Answer extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', unique: true, nullable: false })
  @IsUUID()
  id?: string;

  @Column({ nullable: false })
  quizId?: string;
  @ManyToOne(() => Quiz, (quiz) => quiz.answers)
  @JoinColumn({ name: 'quizId' })
  quiz?: Quiz;
}