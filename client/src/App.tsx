import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import { Header } from "@/components/layout/Header"
import { DashboardPage } from "@/pages/DashboardPage"

function AnalyticsPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
      <p className="mt-2 text-muted-foreground">
        Detailed charts and breakdowns will appear here.
      </p>
    </div>
  )
}

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
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
