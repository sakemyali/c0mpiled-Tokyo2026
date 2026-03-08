import Link from "next/link";
import page1Image from "@/page1.png";
import {
  AlertTriangle,
  ListChecks,
  MessageSquareQuote,
  Sparkles,
} from "lucide-react";

const reportMap = {
  "saving-was-confusing": {
    title: "Saving was confusing",
    summary:
      "Unclear success state on save. User clicked the button multiple times before navigating away.",
    image: page1Image.src,
    severity: "High Friction",
    timeAgo: "2m ago",
    userId: "User #8821",
    userFeedbacks: [
      {
        title: "No clear confirmation",
        body: "I clicked Save twice because I could not tell if the first click worked.",
        author: "Nina C.",
        postedAt: "2 days ago",
      },
      {
        title: "Works, but feels uncertain",
        body: "The data seems saved eventually, but the UI gives almost no confidence.",
        author: "Mark D.",
        postedAt: "4 days ago",
      },
      {
        title: "Button stays active",
        body: "Save remains clickable during processing, so I accidentally sent duplicates.",
        author: "Olivia J.",
        postedAt: "1 week ago",
      },
      {
        title: "Needs better status text",
        body: "A tiny status line near the header would solve most of this confusion.",
        author: "James F.",
        postedAt: "1 week ago",
      },
      {
        title: "Unclear on mobile",
        body: "On phone size, there is no obvious visual feedback after tapping Save.",
        author: "Priya S.",
        postedAt: "8 days ago",
      },
      {
        title: "Feature is useful",
        body: "Functionality is good, but UX around save completion needs to be clearer.",
        author: "Kevin R.",
        postedAt: "10 days ago",
      },
      {
        title: "Minor but frequent issue",
        body: "Not a crash, but I notice this every time I update settings.",
        author: "Emily T.",
        postedAt: "12 days ago",
      },
      {
        title: "I thought save failed",
        body: "I navigated away and came back because I assumed the action was not complete.",
        author: "Victor L.",
        postedAt: "2 weeks ago",
      },
    ],
    reproductionSteps: [
      "Open Settings and update any field.",
      "Click Save once and observe the screen state.",
      "Wait 2-3 seconds without navigation feedback.",
      "Click Save again and leave the page.",
    ],
    detectedIssues: [
      {
        title: "Missing Success Confirmation",
        description: "No clear confirmation appears after the Save action completes.",
      },
      {
        title: "Duplicate Click Risk",
        description: "The Save button remains active during processing, allowing repeated clicks.",
      },
      {
        title: "Weak Progress Visibility",
        description: "Users cannot clearly tell whether the request is still in progress.",
      },
    ],
    aiSuggestion: [
      {
        title: "Improve Save Feedback",
        description: "Add immediate loading and success states after the Save action.",
      },
      {
        title: "Prevent Duplicate Submission",
        description: "Disable the Save button while the request is in progress.",
      },
      {
        title: "Expose Save Status",
        description: "Show persistent saved-state feedback near the page title.",
      },
    ],
  },
  "login-loop-on-mobile": {
    title: "Login loop on mobile",
    summary:
      "Auth token expiration issue. The application fails to refresh tokens correctly on iOS Safari browser.",
    image: page1Image.src,
    severity: "Critical",
    timeAgo: "15m ago",
    userId: "User #9402",
    userFeedbacks: [
      {
        title: "Cannot stay logged in",
        body: "I log in, land on home, then get redirected back to login within seconds.",
        author: "Ethan M.",
        postedAt: "1 day ago",
      },
      {
        title: "Safari on iPhone is broken",
        body: "This loop happens only on mobile Safari. Desktop Chrome works for me.",
        author: "Hana K.",
        postedAt: "2 days ago",
      },
      {
        title: "Session keeps resetting",
        body: "Looks like token refresh is failing; app acts like my session expires instantly.",
        author: "Robert P.",
        postedAt: "3 days ago",
      },
      {
        title: "High impact issue",
        body: "I cannot complete any task because login restarts again and again.",
        author: "Alicia W.",
        postedAt: "4 days ago",
      },
      {
        title: "Works after many retries",
        body: "Sometimes it works after 5-6 attempts, but this is not acceptable.",
        author: "Daniel Y.",
        postedAt: "5 days ago",
      },
      {
        title: "Happens every morning",
        body: "First session of the day always loops on login before I can use anything.",
        author: "Sophia V.",
        postedAt: "1 week ago",
      },
      {
        title: "Likely cookie issue",
        body: "Private mode and normal mode both fail in Safari with identical behavior.",
        author: "Liam G.",
        postedAt: "1 week ago",
      },
      {
        title: "Blocking bug",
        body: "This should be prioritized because it fully blocks core product access.",
        author: "Mia N.",
        postedAt: "9 days ago",
      },
    ],
    reproductionSteps: [
      "Open the app on iOS Safari.",
      "Sign in with a valid account.",
      "Wait on the home screen for less than a minute.",
      "Observe forced sign-out and repeated login prompt.",
    ],
    detectedIssues: [
      {
        title: "Token Refresh Failure",
        description: "Refresh token logic fails specifically in iOS Safari sessions.",
      },
      {
        title: "Incorrect Expiration Decision",
        description: "Session check marks active sessions as expired too early.",
      },
      {
        title: "Blocking Login Loop",
        description: "Users are repeatedly redirected to login and cannot proceed.",
      },
    ],
    aiSuggestion: [
      {
        title: "Stabilize Token Refresh",
        description: "Fix refresh-token error handling and fallback sequencing.",
      },
      {
        title: "Validate Safari Session Settings",
        description: "Audit Safari-specific cookie and storage behavior in auth flow.",
      },
      {
        title: "Graceful Recovery Path",
        description: "Retry once, then provide a controlled and clear re-auth experience.",
      },
    ],
  },
  "filter-dropdown-hidden": {
    title: "Filter dropdown hidden",
    summary:
      "Z-index conflict with the navigation bar. Dropdown appears behind header on medium viewports.",
    image: page1Image.src,
    severity: "UI Polish",
    timeAgo: "1h ago",
    userId: "User #2119",
    userFeedbacks: [
      {
        title: "Dropdown hidden by header",
        body: "Filter options open behind the top bar at medium viewport sizes.",
        author: "Noah B.",
        postedAt: "2 days ago",
      },
      {
        title: "Hard to select options",
        body: "After slight scrolling, part of the menu is not clickable anymore.",
        author: "Grace H.",
        postedAt: "3 days ago",
      },
      {
        title: "Only on tablet width",
        body: "Looks okay on desktop and phone, but tablet breakpoint is inconsistent.",
        author: "Zoe A.",
        postedAt: "4 days ago",
      },
      {
        title: "Visual overlap issue",
        body: "The menu appears in the right place but gets layered under sticky elements.",
        author: "Lucas R.",
        postedAt: "5 days ago",
      },
      {
        title: "Minor but noticeable",
        body: "Not a blocker, but filter interaction feels broken when this occurs.",
        author: "Isabella Q.",
        postedAt: "6 days ago",
      },
      {
        title: "Inconsistent behavior",
        body: "Sometimes it renders correctly, sometimes it falls behind the header.",
        author: "Benjamin U.",
        postedAt: "1 week ago",
      },
      {
        title: "Need stronger layering rules",
        body: "Likely a z-index/stacking context issue with sticky container.",
        author: "Charlotte E.",
        postedAt: "9 days ago",
      },
      {
        title: "Affects confidence",
        body: "Users may think filter is unavailable because part of it is hidden.",
        author: "Henry I.",
        postedAt: "10 days ago",
      },
    ],
    reproductionSteps: [
      "Resize viewport to medium width.",
      "Open the filter dropdown in the header area.",
      "Scroll the page slightly.",
      "Observe dropdown rendering underneath header layer.",
    ],
    detectedIssues: [
      {
        title: "Layer Priority Conflict",
        description: "The header layer overlaps the dropdown due to z-index mismatch.",
      },
      {
        title: "Unstable Stacking Context",
        description: "Scroll and layout shifts change visual stacking unexpectedly.",
      },
      {
        title: "Occluded Interaction Area",
        description: "Part of the dropdown becomes hidden and hard to interact with.",
      },
    ],
    aiSuggestion: [
      {
        title: "Fix Layer Hierarchy",
        description: "Rework z-index scale across sticky header and interactive overlays.",
      },
      {
        title: "Isolate Dropdown Rendering",
        description: "Render the dropdown through a portal to avoid stacking conflicts.",
      },
      {
        title: "Protect with Tests",
        description: "Add viewport-specific regression tests for filter interactions.",
      },
    ],
  },
} as const;

type ReportId = keyof typeof reportMap;

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = await params;
  const report = reportMap[reportId as ReportId];

  if (!report) {
    return (
      <main className="min-h-screen p-2 md:p-3 bg-neutral-50 dark:bg-neutral-950">
        <div className="rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6">
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Report not found
          </h1>
          <Link href="/" className="text-sm underline text-neutral-700 dark:text-neutral-200">
            Back to reports
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-2 md:p-3 bg-neutral-50 dark:bg-neutral-950">
      <div className="rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 min-h-[calc(100vh-1rem)] md:min-h-[calc(100vh-1.5rem)]">
        <header className="border-b border-neutral-200 dark:border-neutral-700 px-5 py-4 md:px-7 md:py-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Dashboard / Reports / Detail</p>
            <span className="inline-flex items-center rounded-full border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-neutral-700 dark:text-neutral-200">
              ISSUE #04
            </span>
            <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100">{report.title}</h1>
            <p className="text-sm md:text-[15px] text-neutral-500 dark:text-neutral-400">
              Session-based issue analysis with user feedback, reproduction steps, and AI-assisted recommendations.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 px-3 py-2 text-sm font-medium"
            >
              Back to reports
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 p-4 md:p-6">
          <section className="space-y-4">
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/70 p-4 space-y-3">
              <h2 className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100 inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                AI Summary
              </h2>
              <p className="text-sm md:text-[15px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {report.summary}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                <div className="rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 px-3 py-2">
                  <p className="text-neutral-500 dark:text-neutral-400">Updated</p>
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">{report.timeAgo}</p>
                </div>
                <div className="rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 px-3 py-2">
                  <p className="text-neutral-500 dark:text-neutral-400">Reporter</p>
                  <p className="font-medium text-neutral-800 dark:text-neutral-200">{report.userId}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/70 p-4">
              <h2 className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3 inline-flex items-center gap-2">
                <MessageSquareQuote className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                User Feedback
              </h2>
              <div className="max-h-[440px] overflow-y-auto pr-1">
                <ul className="space-y-2">
                  {report.userFeedbacks.map((feedback, index) => (
                    <li
                      key={`${feedback.title}-${index}`}
                      className="rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 px-3 py-3"
                    >
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {feedback.title}
                      </p>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1 leading-relaxed">
                        {feedback.body}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                        by {feedback.author} • {feedback.postedAt}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/70 p-4">
              <h2 className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3 inline-flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                Reproduction Steps
              </h2>
              <ul className="space-y-2">
                {report.reproductionSteps.map((step, index) => (
                  <li
                    key={step}
                    className="rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 px-3 py-2"
                  >
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Step {index + 1}</p>
                    <p className="text-sm text-neutral-800 dark:text-neutral-200">{step}</p>
                  </li>
                ))}
              </ul>
              <div
                className="mt-4 h-56 md:h-64 w-full rounded-md bg-cover bg-center"
                style={{ backgroundImage: `url('${report.image}')` }}
              />
            </div>
          </section>

          <section className="space-y-4">
            <div className="rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 p-4">
              <h2 className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3 pb-2 border-b border-red-200/80 dark:border-red-900/40 inline-flex items-center gap-2 w-full">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                Detected Issues
              </h2>
              <div className="space-y-3">
                {report.detectedIssues.map((issue) => (
                  <div key={issue.title} className="border-b border-red-200/80 dark:border-red-900/40 pb-3 last:border-b-0 last:pb-0">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {issue.title}
                    </p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">
                      {issue.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 p-4">
              <h2 className="text-base md:text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3 pb-2 border-b border-emerald-200/80 dark:border-emerald-900/40 inline-flex items-center gap-2 w-full">
                <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                AI Suggestion
              </h2>
              <div className="space-y-3">
                {report.aiSuggestion.map((suggestion) => (
                  <div key={suggestion.title} className="border-b border-emerald-200/80 dark:border-emerald-900/40 pb-3 last:border-b-0 last:pb-0">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {suggestion.title}
                    </p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">
                      {suggestion.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>    </main>
  );
}
