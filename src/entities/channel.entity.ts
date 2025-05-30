/**
 * 기존 .NET Core 프로젝트 대응 파일: Telegram_Project2_Web/Models/ChannelModel.cs
 * 
 * 변경사항:
 * - [Key] public string Channel_Code → @PrimaryColumn() channel_Code: string
 * - [Column("channel_name")] → @Column({ name: 'channel_name' })
 * - [Required] → nullable: false
 */

import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('channel_list_table')
export class Channel {
  @PrimaryColumn({ type: 'varchar', length: 255, name: 'channel_code' })
  channel_Code: string;

  @Column({ type: 'varchar', length: 255, name: 'channel_name' })
  channel_Name: string;

  @Column({ type: 'varchar', length: 500, name: 'channel_url', nullable: true })
  channel_Url: string;

  @Column({ type: 'text', nullable: true })
  channel_Chat_Content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 