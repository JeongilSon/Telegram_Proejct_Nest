/**
 * 기존 .NET Core 프로젝트 대응 파일: Telegram_Project2_Web/Models/UserModel.cs
 * 
 * 변경사항:
 * - [Table("user_list_table")] → @Entity('user_list_table')
 * - [Key] public string Chat_ID → @PrimaryColumn() chat_ID: string
 * - [Column] 속성들 → @Column() 데코레이터로 변환
 * - Navigation Properties → @OneToMany 관계 설정
 */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('user_list_table')
export class User {
  @PrimaryColumn({ type: 'varchar', length: 255, name: 'chat_ID' })
  chat_ID: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  telegram_ID: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nickName: string;

  @Column({ type: 'text', nullable: true })
  user_Question: string;

  @Column({ type: 'tinyint', default: 0 })
  link_Move: number;

  @Column({ type: 'tinyint', default: 0 })
  channel_Move: number;

  @Column({ type: 'tinyint', default: 0 })
  mission_Complete: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations - 순환 참조 방지를 위해 문자열로 정의
  @OneToMany('Livechat', 'user')
  livechats: any[];
} 