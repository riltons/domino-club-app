import { useState, useCallback } from 'react';
import type { GameMatch, Team, VictoryType, SpecialVictory } from '../types/game';

export function useGameLogic() {
  const [match, setMatch] = useState<GameMatch | null>(null);

  // Calcula pontos baseado no tipo de vitória e empate anterior
  const calculatePoints = useCallback((victoryType: VictoryType, isAfterDraw: boolean): number => {
    const basePoints = {
      'NORMAL': 1,      // Batida simples (um lado)
      'CARROCA': 2,     // Batida com carroça (duplo)
      'LA_E_LO': 3,     // Batida com números diferentes
      'CRUZADA': 4,     // Batida com números iguais
      'BLOQUEIO': 1     // Vitória por bloqueio (+ bônus menor soma)
    }[victoryType];

    // Ponto extra se houve empate anterior
    return isAfterDraw ? Math.min(basePoints + 1, 10) : basePoints; // Máximo 10 pontos
  }, []);

  // Verifica vitórias especiais
  const checkSpecialVictory = useCallback((team1: Team, team2: Team): SpecialVictory | undefined => {
    // Buchuda (6x0)
    if (team1.victories === 6 && team2.victories === 0) return 'BUCHUDA';
    if (team2.victories === 6 && team1.victories === 0) return 'BUCHUDA';

    // Buchuda de Ré (perder após estar 5x0)
    if (team1.victories === 6 && team2.victories === 5 && team2.currentStreak >= 6) return 'BUCHUDA_DE_RE';
    if (team2.victories === 6 && team1.victories === 5 && team1.currentStreak >= 6) return 'BUCHUDA_DE_RE';

    // Virada (ganhar após estar perdendo por 3 ou mais)
    if (team1.victories === 6 && team1.currentStreak >= 3) return 'VIRADA';
    if (team2.victories === 6 && team2.currentStreak >= 3) return 'VIRADA';

    return undefined;
  }, []);

  // Atualiza sequências de vitórias
  const updateStreaks = useCallback((team: Team, isWinner: boolean): Team => {
    if (isWinner) {
      const newCurrentStreak = team.currentStreak + 1;
      return {
        ...team,
        currentStreak: newCurrentStreak,
        maxStreak: Math.max(team.maxStreak, newCurrentStreak)
      };
    } else {
      return {
        ...team,
        currentStreak: 0 // Reseta sequência ao perder
      };
    }
  }, []);

  // Finaliza uma partida
  const finishMatch = useCallback((
    winningTeam: 'team1' | 'team2',
    victoryType: VictoryType,
    remainingTiles?: { team1: number; team2: number }
  ) => {
    setMatch(current => {
      if (!current) return null;

      const points = calculatePoints(victoryType, current.isAfterDraw);
      const winner = current[winningTeam];
      const loser = current[winningTeam === 'team1' ? 'team2' : 'team1'];
      
      // Atualiza vitórias e pontos
      const updatedWinner = updateStreaks({
        ...winner,
        victories: winner.victories + 1,
        points: winner.points + points
      }, true);

      // Reseta sequência do perdedor
      const updatedLoser = updateStreaks(loser, false);

      // Verifica vitórias especiais
      const specialVictory = checkSpecialVictory(
        winningTeam === 'team1' ? updatedWinner : updatedLoser,
        winningTeam === 'team2' ? updatedWinner : updatedLoser
      );

      // Verifica se o jogo acabou (6 vitórias)
      const isGameOver = updatedWinner.victories === 6;

      return {
        ...current,
        team1: winningTeam === 'team1' ? updatedWinner : updatedLoser,
        team2: winningTeam === 'team2' ? updatedWinner : updatedLoser,
        victoryType,
        specialVictory,
        winningTeam,
        remainingTiles,
        status: isGameOver ? 'FINISHED' : 'IN_PROGRESS',
        endTime: isGameOver ? new Date() : undefined,
        isAfterDraw: false // Reseta após cada vitória
      };
    });
  }, [calculatePoints, checkSpecialVictory, updateStreaks]);

  // Registra empate
  const registerDraw = useCallback(() => {
    setMatch(current => {
      if (!current) return null;
      return {
        ...current,
        isAfterDraw: true
      };
    });
  }, []);

  // Aplica penalidade
  const applyPenalty = useCallback((team: 'team1' | 'team2', penalty: string) => {
    setMatch(current => {
      if (!current) return null;

      // Penalidades graves resultam em derrota
      const isGravePenalty = [
        'Jogar fora da vez',
        'Mostrar pedras propositalmente',
        'Abandonar o jogo'
      ].includes(penalty);

      if (isGravePenalty) {
        const winningTeam = team === 'team1' ? 'team2' : 'team1';
        finishMatch(winningTeam, 'NORMAL');
        return current;
      }

      return {
        ...current,
        penalties: {
          ...current.penalties,
          [team]: [...current.penalties[team], penalty]
        }
      };
    });
  }, [finishMatch]);

  // Inicia novo jogo
  const startNewMatch = useCallback((
    communityId: string,
    team1Players: string[],
    team2Players: string[],
    location: string,
    isCompetition: boolean = false
  ) => {
    const newMatch: GameMatch = {
      id: Math.random().toString(36).substr(2, 9),
      communityId,
      startTime: new Date(),
      team1: {
        players: team1Players,
        victories: 0,
        points: 0,
        currentTiles: 6, // 6 pedras por jogador
        maxStreak: 0,
        currentStreak: 0
      },
      team2: {
        players: team2Players,
        victories: 0,
        points: 0,
        currentTiles: 6, // 6 pedras por jogador
        maxStreak: 0,
        currentStreak: 0
      },
      currentPlayer: team1Players[0], // Primeiro jogador começa
      status: 'IN_PROGRESS',
      duration: 0,
      location,
      isAfterDraw: false,
      isCompetition, // Indica se é torneio ou amistoso
      penalties: {
        team1: [],
        team2: []
      }
    };

    setMatch(newMatch);
    return newMatch;
  }, []);

  return {
    match,
    startNewMatch,
    finishMatch,
    registerDraw,
    applyPenalty
  };
}