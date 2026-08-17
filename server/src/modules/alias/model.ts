import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from "typeorm";

@Entity("aliases")
export class Alias {
  @PrimaryColumn("text")
  alias!: string;

  @Column("text")
  url!: string;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;
}
