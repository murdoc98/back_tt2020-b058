import { IsString, IsUUID, Length, validateOrReject } from "class-validator";
import { BaseEntity, BeforeInsert, Column, Entity, getRepository, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, Unique } from "typeorm";
import { v4 as uuidv4, version as uuidVersion, validate as uuidValidate } from 'uuid';

import Teacher from "models/Teacher.model";
import Enrollment from "models/Enrollment.model";

interface InewGroup {
  name: string;
  teacherId: string | Teacher;
}
interface formattedStudent {
  id: string | undefined;
  name: string | undefined;
  surname: string | undefined;
  secondSurname: string | undefined;
}


@Entity({ name: 'groups' })
export default class Group extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', unique: true, nullable: false })
  @IsUUID()
  id?: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @IsString()
  @Length(3, 50)
  name?: string;

  @Column({ nullable: false, select: false })
  teacherId?: string;
  @ManyToOne(() => Teacher, (teacher) => teacher.groups)
  @JoinColumn({ name: 'teacherId' })
  teacher?: Teacher;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.group)
  enrollments?: Enrollment[];

  public constructor(params?: InewGroup) {
    super();
    if (params) {
      this.name = params.name;
      params.teacherId instanceof Teacher ? this.teacher = params.teacherId : this.teacherId = params.teacherId;
    }
  };
  public async getGroupsByTeacher(teacherId: string) {
    const response = await getRepository(Group)
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.enrollments', 'enrollments')
      .where('group.teacher = :teacherId', { teacherId })
      .getMany() as any;
    response.forEach((group: { enrollments: any[]; }) => {
      const enrolls = group.enrollments?.reduce((i, current) => {
        return current ? i + 1 : i;
      }, 0);
      group.enrollments = enrolls;
    });
    return response;
  }
  public async getGroupsByStudent(studentId: string) {
    const response = await getRepository(Group)
      .createQueryBuilder('group')
      .leftJoin('group.enrollments', 'enrollments')
      .leftJoin('enrollments.student', 'student')
      .where('student.id = :studentId', { studentId })
      .andWhere('enrollments.status = TRUE')
      .getMany();
    return response;
  }
  public async getGroupByTeacher(teacherId: string, groupId: string) {
    if (!(uuidValidate(groupId) && uuidVersion(groupId) === 4))
      throw Error('No group');
    const response = await getRepository(Group)
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.enrollments', 'enrollments')
      .leftJoinAndSelect('enrollments.student', 'student')
      .where('group.teacher = :teacherId', { teacherId })
      .andWhere('group.id = :groupId', { groupId })
      .getOne();
    if (!response) throw Error('No group');
    const enrolled: formattedStudent[] = [];
    const unenrolled: formattedStudent[] = [];
    response.enrollments?.forEach(student => {
      const formatted = {
        id: student.id,
        name: student.student?.name,
        surname: student.student?.surname,
        secondSurname: student.student?.secondSurname
      }
      if (student.status) enrolled.push(formatted);
      else unenrolled.push(formatted);
    });
    return {
      id: response.id,
      name: response.name,
      enrolled,
      unenrolled
    };
  }
  public async getGroup(groupId: string) {
    if (!(uuidValidate(groupId) && uuidVersion(groupId) === 4))
      throw Error('No group');
    const response = await getRepository(Group)
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.enrollments', 'enrollments')
      .leftJoinAndSelect('enrollments.student', 'student')
      .andWhere('group.id = :groupId', { groupId })
      .getOne();
    if (!response) throw Error('No group');
    return response;
  }
  public async getGroupByStudent(studentId: string, groupId: string) {
    if (!(uuidValidate(studentId) && uuidVersion(studentId) === 4))
      throw Error('No group');
    if (!(uuidValidate(groupId) && uuidVersion(groupId) === 4))
      throw Error('No group');
    const response = await getRepository(Group)
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.enrollments', 'enrollments')
      .leftJoinAndSelect('enrollments.student', 'student')
      .leftJoinAndSelect('enrollments.quizzes', 'quizzes')
      .where('group.id = :groupId', { groupId })
      .andWhere('student.id = :studentId', { studentId })
      .getOne();
    if (!response) throw Error('No group');
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