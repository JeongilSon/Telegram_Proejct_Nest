/**
 * 기존 .NET Core 프로젝트 대응 파일: Telegram_Project2_Web/Models/BotTokenModel.cs
 * 
 * 변경사항:
 * - [Table("bot_token_table")] → @Entity('bot_token_table')
 * - [Key, DatabaseGenerated] public int Id → @PrimaryGeneratedColumn() id: number
 * - public string? Chat_bot_token → @Column() chat_bot_token: string
 * - public string? Main_bot_token → @Column() main_bot_token: string
 * - DateTime 자동 관리 → @CreateDateColumn(), @UpdateDateColumn() 추가
 */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('bot_token_table')
export class BotToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  chat_bot_token: string;

  @Column({ type: 'text', nullable: true })
  main_bot_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 