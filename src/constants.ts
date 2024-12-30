export enum MODE {
    SINGLES = "SINGLES",
    MULTI = "MULTI",
    BOT = "BOT"
}

export enum ModeDescription {
    SINGLES = "One Round decides a winner",
    MULTI = "Multiple rounds over time determines a winner",
    BOT = "Alone but Still wanna play. Giving introvert!"
}

export const ModeToDescription: Record<MODE, ModeDescription> = {
    [MODE.SINGLES]: ModeDescription.SINGLES,
    [MODE.MULTI]: ModeDescription.MULTI,
    [MODE.BOT]: ModeDescription.BOT
}

export interface ScoreInterface {
    cross: number;
    circle: number
}