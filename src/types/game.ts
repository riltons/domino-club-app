export type DominoTile = {
  left: number;
  right: number;
  isDouble: boolean;
};

export type VictoryType = 
  | 'NORMAL'      // Batida simples (1 ponto)
  | 'CARROCA'     // Batida com carroça (2 pontos)
  | 'LA_E_LO'     // Batida lá-e-lô (3 pontos)
  | 'CRUZADA'     // Batida cruzada (4 pontos)
  | 'BLOQUEIO';   // Vitória por bloqueio (1 ponto + bônus)

export type GameStatus = 
  | 'WAITING'     // Aguardando início
  | 'IN_PROGRESS' // Em andamento
  | 'FINISHED'    // Finalizado
  | 'CANCELLED';  // Cancelado

export type SpecialVictory =
  | 'BUCHUDA'       // Vitória 6x0
  | 'BUCHUDA_DE_RE' // Perder após estar 5x0
  | 'VIRADA';       // Ganhar após estar perdendo

export type Team = {
  players: string[];    // IDs dos jogadores
  victories: number;    // Número de vitórias
  points: number;      // Pontos totais
  currentTiles: number; // Número de pedras atuais (6 por jogador)
  maxStreak: number;   // Maior sequência de vitórias
  currentStreak: number; // Sequência atual de vitórias
};

export type GameMatch = {
  id: string;
  communityId: string;
  startTime: Date;
  endTime?: Date;
  team1: Team;
  team2: Team;
  currentPlayer: string;  // ID do jogador atual
  status: GameStatus;
  victoryType?: VictoryType;
  specialVictory?: SpecialVictory;
  winningTeam?: 'team1' | 'team2';
  duration: number;      // Duração em segundos
  remainingTiles?: {     // Em caso de bloqueio
    team1: number;
    team2: number;
  };
  isAfterDraw: boolean;  // Se houve empate anterior
  isCompetition: boolean; // Se é torneio ou amistoso
  location: string;
  notes?: string;
  penalties: {
    team1: string[];  // Lista de penalidades
    team2: string[];
  };
};