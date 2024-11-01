import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PlayerRegistration } from './pages/PlayerRegistration';
import { OrganizerRegistration } from './pages/OrganizerRegistration';
import { CommunityRegistration } from './pages/CommunityRegistration';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { CommunitiesPage } from './pages/dashboard/CommunitiesPage';
import { CompetitionsPage } from './pages/dashboard/CompetitionsPage';
import { ManageCompetition } from './pages/competition/ManageCompetition';
import { SchedulePage } from './pages/dashboard/SchedulePage';
import { NewPlayerPage } from './pages/dashboard/NewPlayerPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';
import { HelpPage } from './pages/dashboard/HelpPage';
import { SelectTeams } from './pages/match/SelectTeams';
import { MatchInProgress } from './pages/match/MatchInProgress';
import { MatchResult } from './pages/match/MatchResult';
import { FinalResult } from './pages/match/FinalResult';
import { MatchResultsList } from './pages/match/MatchResultsList';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/player" element={<PlayerRegistration />} />
        <Route path="/register/organizer" element={<OrganizerRegistration />} />
        <Route path="/register/community" element={<CommunityRegistration />} />

        {/* Rotas do Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout><UserDashboard /></DashboardLayout>} />
        <Route path="/dashboard/communities" element={<DashboardLayout><CommunitiesPage /></DashboardLayout>} />
        <Route path="/dashboard/competitions" element={<DashboardLayout><CompetitionsPage /></DashboardLayout>} />
        <Route path="/dashboard/competitions/:id" element={<DashboardLayout><ManageCompetition /></DashboardLayout>} />
        <Route path="/dashboard/schedule" element={<DashboardLayout><SchedulePage /></DashboardLayout>} />
        <Route path="/dashboard/players/new" element={<DashboardLayout><NewPlayerPage /></DashboardLayout>} />
        <Route path="/dashboard/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
        <Route path="/dashboard/help" element={<DashboardLayout><HelpPage /></DashboardLayout>} />

        {/* Rotas de Partida */}
        <Route path="/match/teams" element={<DashboardLayout><SelectTeams /></DashboardLayout>} />
        <Route path="/match/progress" element={<DashboardLayout><MatchInProgress /></DashboardLayout>} />
        <Route path="/match/result" element={<DashboardLayout><MatchResult /></DashboardLayout>} />
        <Route path="/match/final-result" element={<DashboardLayout><FinalResult /></DashboardLayout>} />
        <Route path="/match/results" element={<DashboardLayout><MatchResultsList /></DashboardLayout>} />

        {/* Rota de fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}