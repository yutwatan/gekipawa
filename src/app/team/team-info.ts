import { TeamData } from './team-data';
import { Player } from './player';
import { Pitcher } from './pitcher';
import { GameHistory } from '../top/recent-game/game-history';

export class TeamInfo extends TeamData {
  campTimes: number;
  error: number;
  gameHistory: GameHistory[];
  pitchers: Pitcher[];
  players: Player[];
  rank: number;
  scoreAve: string;
  strikeOut: number;
  typeAttack: number;
  typeBunt: number;
  typeMind: number;
  typeSteal: number;
  updated: Date;
  winContinue: number;
}
