import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import { Header } from "@/components/layout/Header"
import { DashboardPage } from "@/pages/DashboardPage"
import { AnalyticsPage } from "@/pages/AnalyticsPage"
import { SubmitPage } from "@/pages/SubmitPage"

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/submit" element={<SubmitPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
