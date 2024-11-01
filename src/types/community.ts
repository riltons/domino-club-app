import { User, UserRole } from './user';

export interface GameResult {
  id: string;
  date: Date;
  winner: User;
  players: User[];
  score: number;
}

export interface Competition {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  participants: User[];
  matches: GameResult[];
  status: 'upcoming' | 'in_progress' | 'completed';
}

export interface CommunityMember {
  user: User;
  role: UserRole;
  joinedAt: Date;
  gamesPlayed: number;
  wins: number;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  members: CommunityMember[];
  admin: User;
  organizers: User[];
  competitions: Competition[];
  rules: string[];
  memberCount: number;
  lastGame?: GameResult;
  location?: string;
  meetingDays?: string[];
  private: boolean;
}