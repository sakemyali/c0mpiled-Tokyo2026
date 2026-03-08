"use client";

import { useState } from "react";
import { submitEntry } from "@/lib/api";
import { CheckCircle2, Loader2 } from "lucide-react";

const sources = [
  { value: "survey", label: "Survey" },
  { value: "app-store", label: "App Store" },
  { value: "support-ticket", label: "Support Ticket" },
  { value: "slack", label: "Slack" },
  { value: "intercom", label: "Intercom" },
];

export default function SubmitPage() {
  const [text, setText] = useState("");
  const [source, setSource] = useState("survey");
  const [userName, setUserName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await submitEntry({ text, source, userName });
      setSuccess(true);
      setText("");
      setUserName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-xl flex flex-col gap-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Submit Feedback
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
          Add new user feedback to the pipeline
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Your Name
          </label>
          <input
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            placeholder="e.g. Takuma K."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Source
          </label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          >
            {sources.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            Feedback
          </label>
          <textarea
            required
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 resize-none"
            placeholder="Describe the issue or feedback..."
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        {success && (
          <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            Feedback submitted successfully.
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-4 py-2.5 text-sm font-medium disabled:opacity-50 transition-colors hover:bg-neutral-800 dark:hover:bg-neutral-200"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
