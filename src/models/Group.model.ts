import { IsString, IsUUID, Length, validateOrReject } from "class-validator";
import { BaseEntity, BeforeInsert, Column, Entity, getRepository, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

import Teacher from "models/Teacher.model";

interface InewGroup {
  name: string;
  teacherId: string;
}

@Entity({ name: 'groups' })
export default class Group extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', unique: true, nullable: false })
  @IsUUID()
  id?: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  @IsString()
  @Length(3, 30)
  name?: string;

  @Column({ nullable: false, select: false })
  teacherId?: string;
  @ManyToOne(() => Teacher, (teacher) => teacher.groups)
  @JoinColumn({ name: 'teacherId' })
  teacher?: Teacher;

  public constructor(params?: InewGroup) {
    super();
    if (params) {
      this.name = params.name;
      this.teacherId = params.teacherId;
    }
  };
  public async getGroups(teacherId: string) {
    const response = await getRepository(Group)
      .createQueryBuilder('group')
      .where('group.teacher = :teacherId', {teacherId})
      .getMany();
    return response;
  }
  @BeforeInsert()
  async validateModel(): Promise<void> {
    this.id = uuidv4();
    await validateOrReject(this, {
      validationError: { value: true, target: false }
    });
  }
}