export enum MODE {
    SINGLES = "SINGLES",
    MULTI = "MULTI",
    BOT_EASY = "BOT_EASY",
    BOT_MID = "BOT_MID",
    AI_BOT = "AI_BOT",
}

export enum ModeDescription {
    SINGLES = "One round at a time",
    MULTI = "Back to back to back!",
    BOT_EASY = "Deer in headlights!",
    BOT_MID = "Giving introvert!",
    AI_BOT = "Can you beat the AI? 🧠"
}

export const ModeToDescription: Record<MODE, ModeDescription> = {
    [MODE.SINGLES]: ModeDescription.SINGLES,
    [MODE.MULTI]: ModeDescription.MULTI,
    [MODE.BOT_EASY]: ModeDescription.BOT_EASY,
    [MODE.BOT_MID]: ModeDescription.BOT_MID,
    [MODE.AI_BOT]: ModeDescription.AI_BOT,
}

export interface ScoreInterface {
    cross: number;
    circle: number
}

export type BoardElement = 'cross' | 'circle' | 'empty';

export const MID_PROBABILITY = 0.6;
export const HARD_PROBABILITY = 0.9;

export const CIRCLE_LIGHT_IMG = require("./assets/images/circle.png")
export const CROSS_LIGHT_IMG = require("./assets/images/cross.png")
export const CIRCLE_WHITE_IMG = require("./assets/images/circle_white.png")
export const CROSS_WHITE_IMG = require("./assets/images/cross_white.png")

export const MODE_LOGOS = [
    {
        key: MODE.SINGLES,
        left: require('./assets/images/single_user_white.png'),
        right: require('./assets/images/single_user_white.png'),
    },
    {
        key: MODE.MULTI,
        left: require('./assets/images/multi_user_white.png'),
        right: require('./assets/images/multi_user_white.png'),
    },
    {
        key: MODE.AI_BOT,
        left: require('./assets/images/single_user_white.png'),
        right: require('./assets/images/ai_bot_white.png'),
    },
    {
        key: MODE.BOT_MID,
        left: require('./assets/images/single_user_white.png'),
        right: require('./assets/images/mid_bot_white.png'),
    },
    {
        key: MODE.BOT_EASY,
        left: require('./assets/images/single_user_white.png'),
        right: require('./assets/images/easy_bot_white.png'),
    },
];