/**
 * 기존 .NET Core 프로젝트 대응 파일: Telegram_Project2_Web/Models/AccountModel.cs
 * 
 * 변경사항:
 * - [Table("account_table")] → @Entity('account_table')
 * - [Key] public string Id → @PrimaryColumn() id: string
 * - public string Pw → @Column() pw: string
 * - DateTime 자동 관리 → @CreateDateColumn(), @UpdateDateColumn() 추가
 */

import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('account_table')
export class Account {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  pw: string;
} 