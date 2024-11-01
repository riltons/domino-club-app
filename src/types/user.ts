export type UserRole = 'admin' | 'organizer' | 'player';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  communities: {
    communityId: string;
    role: UserRole;
  }[];
}

export interface UserProfile extends User {
  totalGamesPlayed: number;
  totalWins: number;
  winRate: number;
  currentStreak: number;
  bestStreak: number;
}