import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { AppLayout } from './layouts/AppLayout';
import { LoginPage } from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { CasesPage } from './pages/CasesPage';
import { CaseDetailPage } from './pages/CaseDetailPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { DocumentViewerPage } from './pages/DocumentViewerPage';
import { EvidencePage } from './pages/EvidencePage';
import { SecureSharingPage } from './pages/SecureSharingPage';
import AuditTrailPage from './pages/AuditTrailPage';
import SecurityCenterPage from './pages/SecurityCenterPage';
import ReportsPage from './pages/ReportsPage';
import UsersRolesPage from './pages/UsersRolesPage';
import SettingsPage from './pages/SettingsPage';
import { HelpPage } from './pages/HelpPage';
import type { ReactNode } from 'react';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="cases" element={<CasesPage />} />
        <Route path="cases/:caseId" element={<CaseDetailPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="documents/:docId" element={<DocumentViewerPage />} />
        <Route path="evidence" element={<EvidencePage />} />
        <Route path="secure-sharing" element={<SecureSharingPage />} />
        <Route path="audit-trail" element={<AuditTrailPage />} />
        <Route path="security" element={<SecurityCenterPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="users" element={<UsersRolesPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
