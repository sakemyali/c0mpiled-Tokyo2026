import { useState, useEffect, useRef } from "react"
import { Link } from "react-router"
import { Loader2, CheckCircle2, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FeedbackForm } from "@/components/submit/FeedbackForm"
import { triggerAIProcessing, fetchAIStatus } from "@/lib/api"

type ProcessStatus = "idle" | "processing" | "success" | "error"

const PROGRESS_MESSAGES = [
  "Clustering feedback entries...",
  "Generating group summaries...",
  "Finalizing results...",
]

export function SubmitPage() {
  const [processStatus, setProcessStatus] = useState<ProcessStatus>("idle")
  const [groupCount, setGroupCount] = useState(0)
  const [errorMsg, setErrorMsg] = useState("")
  const [progressIdx, setProgressIdx] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Poll AI status on mount to disable button if already processing
  useEffect(() => {
    fetchAIStatus()
      .then((s) => {
        if (s.isProcessing) setProcessStatus("processing")
      })
      .catch(() => {})
  }, [])

  // Cycle progress messages during processing
  useEffect(() => {
    if (processStatus === "processing") {
      setProgressIdx(0)
      intervalRef.current = setInterval(() => {
        setProgressIdx((prev) => (prev + 1) % PROGRESS_MESSAGES.length)
      }, 3500)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [processStatus])

  async function handleProcess() {
    setProcessStatus("processing")
    setErrorMsg("")

    try {
      const result = await triggerAIProcessing()
      setGroupCount(result.groupCount)
      setProcessStatus("success")
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Processing failed")
      setProcessStatus("error")
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Submit Feedback</h1>
        <p className="text-muted-foreground mt-1">
          Add new feedback entries and trigger AI analysis
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Feedback Form */}
        <FeedbackForm />

        {/* AI Processing Card */}
        <div className="bg-card/50 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">AI Processing</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Cluster all feedback and generate AI summaries
          </p>

          {processStatus === "idle" && (
            <Button onClick={handleProcess} size="lg" className="w-full">
              Process All Feedback
            </Button>
          )}

          {processStatus === "processing" && (
            <div className="flex flex-col items-center gap-4 py-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium text-muted-foreground animate-pulse">
                {PROGRESS_MESSAGES[progressIdx]}
              </p>
            </div>
          )}

          {processStatus === "success" && (
            <div className="flex flex-col items-center gap-4 py-4">
              <CheckCircle2 className="h-8 w-8 text-green-400" />
              <p className="text-sm font-medium text-green-400">
                Processing complete! {groupCount} groups created.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                View Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {processStatus === "error" && (
            <div className="space-y-3">
              <p className="text-sm text-red-400">{errorMsg}</p>
              <Button onClick={handleProcess} size="lg" className="w-full">
                Retry Processing
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
