import { act1Scenes } from './act1';
import { act2Scenes } from './act2';
import { act2ScenesCont } from './act2_cont';
import { act2ScenesCont2 } from './act2_cont2';

export const allAct1Scenes = act1Scenes;
export const allAct2Scenes = [...act2Scenes, ...act2ScenesCont, ...act2ScenesCont2];
