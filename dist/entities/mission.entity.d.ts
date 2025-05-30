export declare enum MissionType {
    DAILY = 0,
    MISSION = 1,
    EVENT = 2
}
export declare class Mission {
    mission_Name: string;
    mission_Type: MissionType;
    mission_Rewords: number;
    mission_Chat_Content: string;
    created_at: Date;
    updated_at: Date;
}
