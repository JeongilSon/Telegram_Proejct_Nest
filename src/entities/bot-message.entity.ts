/**
 * 기존 .NET Core 프로젝트 대응 파일: Telegram_Project2_Web/Models/BotMessageModel.cs
 * 
 * 변경사항:
 * - [Table("bot_message_table")] → @Entity('bot_message_table')
 * - [Key, DatabaseGenerated] public int? Id → @PrimaryGeneratedColumn() id: number
 * - [JsonPropertyName, Column] → @Column() 데코레이터
 */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('bot_message_table')
export class BotMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', name: 'welcome_message', nullable: true })
  welcome_Message: string;

  @Column({ type: 'text', name: 'question_message', nullable: true })
  question_Message: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 