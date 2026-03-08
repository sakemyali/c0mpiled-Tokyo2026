"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitEntry } from "@/lib/api";
import { CheckCircle2, Loader2, Send } from "lucide-react";

const sources = [
  { value: "survey", label: "Survey" },
  { value: "app-store", label: "App Store" },
  { value: "support-ticket", label: "Support Ticket" },
  { value: "slack", label: "Slack" },
  { value: "intercom", label: "Intercom" },
];

const inputStyles =
  "w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all";

export default function SubmitPage() {
  const [text, setText] = useState("");
  const [source, setSource] = useState("survey");
  const [userName, setUserName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    <div className="p-6 md:p-8 max-w-xl flex flex-col gap-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Submit Feedback
        </h1>
        <p className="text-sm text-neutral-500 mt-1.5">
          Add new user feedback to the pipeline
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="glass-card p-6 flex flex-col gap-5"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div>
          <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
            Your Name
          </label>
          <input
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={inputStyles}
            placeholder="e.g. Takuma K."
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
            Source
          </label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className={inputStyles}
          >
            {sources.map((s) => (
              <option key={s.value} value={s.value} className="bg-[var(--surface-1)]">
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
            Feedback
          </label>
          <textarea
            required
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`${inputStyles} resize-none`}
            placeholder="Describe the issue or feedback..."
          />
        </div>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5 text-sm text-emerald-400 bg-emerald-500/10 rounded-xl px-4 py-3"
          >
            <CheckCircle2 className="h-4 w-4" />
            Feedback submitted successfully.
          </motion.div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-5 py-3 text-sm font-semibold disabled:opacity-40 transition-all hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98]"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Submit Feedback
        </button>
      </motion.form>
    </div>
  );
}
