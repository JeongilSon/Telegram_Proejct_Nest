/**
 * 기존 .NET Core 프로젝트 대응 파일: Telegram_Project2_Web/Models/MissionModel.cs
 * 
 * 변경사항:
 * - public enum MissionTypeEnum → export enum MissionType
 * - [Key] public string Mission_Name → @PrimaryColumn() mission_Name: string
 * - MissionTypeEnum Mission_Type → @Column() mission_Type: MissionType
 * - int Mission_Rewords → @Column() mission_Rewords: number
 */

import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum MissionType {
  DAILY = 0,
  MISSION = 1,
  EVENT = 2,
}

@Entity('mission_table')
export class Mission {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  mission_Name: string;

  @Column({ type: 'int' })
  mission_Type: MissionType;

  @Column({ type: 'int', default: 0 })
  mission_Rewords: number;

  @Column({ type: 'text' })
  mission_Chat_Content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 