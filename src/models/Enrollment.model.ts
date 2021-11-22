import { IsString, IsUUID, Length, validateOrReject } from "class-validator";
import { BaseEntity, BeforeInsert, Column, Entity, getRepository, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

import Student from "models/Student.model";

interface InewGroup {
  name: string;
}

@Entity({ name: 'enrollments' })
export default class Enrollment extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', unique: true, nullable: false })
  @IsUUID()
  id?: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  status?: boolean;

  @Column({ nullable: false })
  studentId?: string;
  @ManyToOne(() => Student, (student) => student.enrollments)
  @JoinColumn({ name: 'studentId' })
  student?: Student;

  public constructor(params?: InewGroup) {
    super();
  };
  @BeforeInsert()
  async validateModel(): Promise<void> {
    this.id = uuidv4();
    await validateOrReject(this, {
      validationError: { value: true, target: false }
    });
  }
}