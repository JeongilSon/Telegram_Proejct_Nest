/**
 * 기존 .NET Core 프로젝트 대응 파일: Telegram_Project2_Web/Models/LinkModel.cs
 * 
 * 변경사항:
 * - [Key] public string Link_Url → @PrimaryColumn() link_Url: string  
 * - [Required] → nullable: false
 */

import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('link_list_table')
export class Link {
  @PrimaryColumn({ type: 'varchar', length: 500 })
  link_Url: string;

  @Column({ type: 'varchar', length: 255 })
  link_Name: string;

  @Column({ type: 'text' })
  link_Chat_Content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 