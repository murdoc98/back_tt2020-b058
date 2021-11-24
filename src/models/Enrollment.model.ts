import { IsString, IsUUID, Length, validateOrReject } from "class-validator";
import { BaseEntity, BeforeInsert, Column, Entity, getRepository, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

import Student from "models/Student.model";
import Group from 'models/Group.model';

interface InewEnroll {
  student: string | Student;
  group: string | Group;
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

  @Column({ nullable: false, select: false })
  groupId?: string;
  @ManyToOne(() => Group, (group) => group.enrollments)
  @JoinColumn({ name: 'groupId' })
  group?: Group;

  public constructor(params?: InewEnroll) {
    super();
    if(params) {
      this.status = false;
      params.student instanceof Student ? this.student = params.student : this.studentId = params.student;
      params.group instanceof Group ? this.group = params.group : this.groupId = params.group;
    }
  };
  @BeforeInsert()
  async validateModel(): Promise<void> {
    this.id = uuidv4();
    await validateOrReject(this, {
      validationError: { value: true, target: false }
    });
  }
}