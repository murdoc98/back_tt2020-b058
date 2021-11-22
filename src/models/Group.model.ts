import { IsString, IsUUID, Length, validateOrReject } from "class-validator";
import { BaseEntity, BeforeInsert, Column, Entity, PrimaryColumn, Unique } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

interface InewGroup {
  name: string;
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

  public constructor(params?: InewGroup) {
    super();
    if (params) {
      this.name = params.name;
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