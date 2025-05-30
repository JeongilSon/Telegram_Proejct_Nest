/**
 * 기존 .NET Core 프로젝트 대응 파일: Telegram_Project2_Web/Models/LivechatModel.cs
 * 
 * 변경사항:
 * - [Table("live_chat_table")] → @Entity('live_chat_table')
 * - [Key] public int Id → @PrimaryGeneratedColumn() id: number
 * - string ChatId → @Column() chatId: string
 * - string Content → @Column() content: string
 * - bool IsFromAdmin → @Column() isFromAdmin: boolean
 * - DateTime Timestamp → @CreateDateColumn() timestamp: Date
 * - Foreign Key 관계 → @ManyToOne, @JoinColumn으로 설정
 */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('live_chat_table')
export class Livechat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  chatId: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  username: string;

  @Column({ type: 'boolean', default: false })
  isFromAdmin: boolean;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  @CreateDateColumn()
  timestamp: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.livechats)
  @JoinColumn({ name: 'chatId', referencedColumnName: 'chat_ID' })
  user: User;
} 