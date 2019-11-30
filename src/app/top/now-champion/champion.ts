import { Pitcher } from '../pitcher';

export class Champion {
  team: string;
  owner: string;
  icon: string;
  continuousWin: number;
  nextPitcher: Pitcher;
}
