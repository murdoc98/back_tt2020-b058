import { IsEmail, IsOptional, IsString, IsUUID, Length, validateOrReject } from "class-validator";
import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryColumn, Unique } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import Group from "models/Group.model";

interface InewTeacher {
  name: string;
  surname: string;
  secondSurname: string;
  email: string;
}

@Entity({ name: 'teacher' })
@Unique(['name', 'surname', 'secondSurname'])
export default class Teacher extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', unique: true, nullable: false })
  @IsUUID()
  id?: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  @IsString()
  @Length(3, 30)
  name?: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  @IsString()
  @Length(3, 30)
  surname?: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  @IsString()
  @Length(3, 30)
  secondSurname?: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  @IsEmail()
  @Length(3, 50)
  email?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  password?: string;

  @Column({ type: 'bigint', nullable: true })
  iat?: number;

  @OneToMany(() => Group, (group) => group.teacher)
  groups?: Group[];

  public constructor(params?: InewTeacher) {
    super();
    if (params) {
      this.name = params.name;
      this.surname = params.surname;
      this.secondSurname = params.secondSurname;
      this.email = params.email;
    }
  };
  public setPassword(password: string): void {
    if (
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*?&])[\wñ@$!%*?&]{8,30}$/.test(
        password
      )
    ) {
      const salt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(password, salt);
    } else throw Error('Regex');
  };
  @BeforeInsert()
  async validateModel(): Promise<void> {
    this.id = uuidv4();
    await validateOrReject(this, {
      validationError: { value: true, target: false }
    });
  }
}
