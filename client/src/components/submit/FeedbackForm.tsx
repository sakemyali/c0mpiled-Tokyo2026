import { useState } from "react"
import { Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { submitEntry } from "@/lib/api"

type FormStatus = "idle" | "submitting" | "success" | "error"

const SOURCE_OPTIONS = [
  { value: "app-store", label: "App Store" },
  { value: "support-ticket", label: "Support Ticket" },
  { value: "survey", label: "Survey" },
  { value: "slack", label: "Slack" },
  { value: "intercom", label: "Intercom" },
]

export function FeedbackForm() {
  const [text, setText] = useState("")
  const [source, setSource] = useState("app-store")
  const [userName, setUserName] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!text.trim() || !userName.trim()) {
      setErrorMsg("Please fill in all required fields.")
      setStatus("error")
      return
    }

    setStatus("submitting")
    setErrorMsg("")

    try {
      await submitEntry({ text: text.trim(), source, userName: userName.trim() })
      setStatus("success")
      setTimeout(() => {
        setText("")
        setUserName("")
        setSource("app-store")
        setStatus("idle")
      }, 2000)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to submit feedback")
      setStatus("error")
    }
  }

  return (
    <div className="bg-card/50 backdrop-blur-md border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">New Feedback Entry</h3>

      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-8 gap-3 text-green-400">
          <CheckCircle2 className="h-10 w-10" />
          <p className="font-medium">Feedback submitted!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="feedback-text" className="block text-sm font-medium text-muted-foreground mb-1.5">
              Feedback
            </label>
            <textarea
              id="feedback-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Describe the issue or feedback..."
              required
              rows={4}
              className="w-full rounded-lg border border-white/10 bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          <div>
            <label htmlFor="feedback-source" className="block text-sm font-medium text-muted-foreground mb-1.5">
              Source
            </label>
            <select
              id="feedback-source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-background/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {SOURCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="feedback-name" className="block text-sm font-medium text-muted-foreground mb-1.5">
              Your Name
            </label>
            <input
              id="feedback-name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full rounded-lg border border-white/10 bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {status === "error" && errorMsg && (
            <p className="text-sm text-red-400">{errorMsg}</p>
          )}

          <Button type="submit" disabled={status === "submitting"} className="w-full">
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Feedback"
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
