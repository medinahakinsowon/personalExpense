import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen animated-gradient flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-brand-400 to-pink-500 flex items-center justify-center animate-pulse">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <p className="text-slate-400 text-sm">Loading your ledger…</p>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}
