import { api } from './api';
import type { User } from '../types/user';

export async function createPlayer(data: {
  name: string;
  phone: string;
  indicatedBy?: string;
}) {
  const response = await api.post('/players', data);
  return response.data;
}

export async function listPlayers(communityId?: string) {
  const response = await api.get('/players', {
    params: { communityId }
  });
  return response.data;
}

export async function getPlayerStats(playerId: string) {
  const response = await api.get(`/players/${playerId}/stats`);
  return response.data;
}