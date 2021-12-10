import { IsNumber, IsString, IsUUID, validateOrReject } from "class-validator";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import Quiz from "models/Quiz.model";
import { v4 as uuidv4, version as uuidVersion, validate as uuidValidate } from 'uuid';

interface InewAnswer {
  quizId: string;
  genComplexity: number;
  espComplexity: number;
  accuracy: number;
  questionId: string;
  optionId: string;
}

@Entity({ name: 'answer' })
export default class Answer extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', unique: true, nullable: false })
  @IsUUID()
  id?: string;

  @Column({ type: 'integer', nullable: false })
  @IsNumber()
  genComplexity?: number;

  @Column({ type: 'integer', nullable: false })
  @IsNumber()
  espComplexity?: number;

  // TODO Temporal, quitar el default cuando se reinicie la base de datos
  @Column({ type: 'integer', nullable: false, default: 1 })
  @IsNumber()
  accuracy?: number;

  @Column({ type: 'varchar', nullable: false })
  @IsString()
  questionId?: string;

  @Column({ type: 'varchar', nullable: false })
  @IsString()
  optionId?: string;

  @Column({ nullable: false })
  quizId?: string;
  @ManyToOne(() => Quiz, (quiz) => quiz.answers)
  @JoinColumn({ name: 'quizId' })
  quiz?: Quiz;

  @CreateDateColumn()
  created_at?: Date;

  public constructor(params?: InewAnswer) {
    super();
    if(params) {
      this.quizId = params.quizId;
      this.genComplexity = params.genComplexity;
      this.espComplexity = params.espComplexity;
      this.accuracy = params.accuracy;
      this.questionId = params.questionId;
      this.optionId = params.optionId;
    }
  };
  @BeforeInsert()
  async validateModel(): Promise<void> {
    this.id = uuidv4();
    this.created_at = new Date();
    await validateOrReject(this, {
      validationError: { value: true, target: false }
    });
  }
}