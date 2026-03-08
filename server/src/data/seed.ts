/**
 * Seed Data Generator
 *
 * This script generates the static JSON files for entries.json and groups.json.
 * Run once with: npx tsx src/data/seed.ts
 *
 * The generated files are committed as static JSON so the server loads
 * deterministic data on every startup (no randomness between restarts).
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Configuration ──────────────────────────────────────────────────────────

const SOURCES = [
  "app-store",
  "support-ticket",
  "survey",
  "slack",
  "intercom",
] as const;

const SENTIMENTS = ["positive", "negative", "neutral"] as const;

const SESSION_IDS = ["stub-session-01", "stub-session-02"];

const GROUP_IDS = [
  "grp-001",
  "grp-002",
  "grp-003",
  "grp-004",
  "grp-005",
  "grp-006",
  "grp-007",
  "grp-008",
  "grp-009",
  "grp-010",
];

// Entry count per group, weighted by severity
// critical: ~35, high: ~28, medium: ~22, low: ~18
const ENTRIES_PER_GROUP: Record<string, number> = {
  "grp-001": 36, // critical - checkout crashes
  "grp-002": 28, // high - search
  "grp-003": 27, // high - onboarding
  "grp-004": 29, // high - dashboard slow
  "grp-005": 34, // critical - payment removal
  "grp-006": 22, // medium - dark mode
  "grp-007": 20, // medium - export
  "grp-008": 21, // medium - notifications
  "grp-009": 18, // low - profile image
  "grp-010": 16, // low - nav a11y
};

// ─── Feedback Text Templates ────────────────────────────────────────────────

const FEEDBACK_TEMPLATES: Record<string, string[]> = {
  "grp-001": [
    "Checkout crashed on my iPhone again",
    "it broke again",
    "checkout doesn't work",
    "same issue as before with the checkout",
    "The app freezes when I try to pay",
    "I can't complete my purchase on mobile",
    "White screen after clicking confirm payment",
    "App crashed during checkout on Safari",
    "PLEASE FIX THE CHECKOUT. Third time this week it crashed on my phone.",
    "the thing with the payment is weird",
    "I was trying to buy the premium plan and the whole page went blank on my Android",
    "Mobile checkout is completely broken for me",
    "Checkout flow works on desktop but crashes every time on my iPhone 15",
    "Lost my cart after checkout crash. Had to start over.",
    "Payment page freezes at the confirmation step. Using Chrome on Android.",
    "Crashes when tapping Confirm Payment. Happens 100% of the time on mobile Safari.",
    "just crashes",
    "Can't buy anything on my phone anymore",
    "The checkout has been broken on mobile for two weeks now. When will this be fixed?",
    "Tried to place an order on my iPad and the screen went white after payment details",
    "Had items in cart for a week waiting for this to be fixed so I can checkout on mobile",
    "Keeps crashing on the payment screen. Samsung Galaxy S24.",
    "I got charged but the order didn't go through because the page crashed",
    "My wife couldn't order from her phone either. Definitely a mobile issue.",
    "Blank screen after hitting pay. Works fine on laptop though.",
    "The checkout thing is broken on phones again",
    "Cannot complete any purchase on iOS. Tried both Safari and Chrome.",
    "crash on checkout",
    "Spoke to a friend who has the same issue. It's definitely a widespread mobile checkout problem.",
    "I submitted a ticket about this last month. Still not fixed.",
    "App goes white screen right when you tap the final payment button",
    "This is really frustrating. I need to buy something but can't on my phone.",
    "Mobile Safari - checkout crashes at payment step. Been happening since the last update.",
    "why does checkout keep crashing on mobile???",
    "Page becomes unresponsive during mobile checkout, had to force-close browser",
    "Tried three different mobile browsers. Checkout crashes on all of them.",
  ],
  "grp-002": [
    "Search is useless",
    "I searched for 'wireless headphones' and got cables",
    "search results are terrible",
    "Can't find what I'm looking for using search",
    "The search feature seems to return random results",
    "I typed exactly what I wanted and it showed me completely different products",
    "Search doesn't understand what I'm looking for at all",
    "Misspelled a word slightly and got zero results. Google handles this fine, why can't you?",
    "Searched for a product I know exists but it doesn't show up",
    "The search ranking is way off. Irrelevant items appear before exact matches.",
    "I have to scroll through pages of unrelated results to find what I need",
    "Search worked better 6 months ago. What changed?",
    "tried searching but nothing relevant comes up",
    "I gave up searching and just browsed categories instead",
    "Search doesn't find items even when I use the exact product name",
    "Results don't match my query at all",
    "search broken?",
    "Every time I search I get results from wrong categories",
    "The search autocomplete suggests things I never search for",
    "Can you add filters to search? The results alone are not helpful.",
    "Search for 'laptop stand' returns phone cases. Makes no sense.",
    "Zero results for common product names. Search needs serious work.",
    "I can never find anything using the search bar",
    "search is slow and inaccurate",
    "Wish the search was smarter. It's the main way I navigate the app.",
    "Asked customer support to find a product because search couldn't",
    "The search algorithm needs a complete overhaul",
    "Search results page loads but shows unrelated items every time",
  ],
  "grp-003": [
    "The onboarding skipped the setup part",
    "I missed some tutorial steps and now I'm lost",
    "onboarding went by too fast",
    "Tutorial jumped from step 2 to the dashboard",
    "I never got to set up my workspace during onboarding",
    "The getting started guide skipped over important features",
    "Clicked next too fast and it skipped everything",
    "New to the app and the tutorial didn't show me how to set up notifications",
    "Onboarding is buggy -- it skipped steps 3 and 4 for me",
    "I had to ask my colleague how to set up workspace because tutorial didn't cover it",
    "The onboarding speed is too fast and you can't go back",
    "Missed the notification setup during onboarding. Where do I find it now?",
    "Tutorial skips on slow internet",
    "My new team member couldn't complete onboarding either",
    "Onboarding didn't cover half the features",
    "Is there a way to redo the tutorial? It skipped important parts.",
    "same onboarding problem as others reported",
    "The animated transitions skip content if you click too quickly",
    "First day using the app and already confused because tutorial skipped setup steps",
    "Steps 3 and 4 of onboarding just... didn't happen for me",
    "Started onboarding on spotty wifi and it jumped ahead",
    "Would be nice if there was a checklist showing what onboarding covered",
    "onboarding broken",
    "New employee couldn't set up workspace properly because tutorial skipped that section",
    "The tutorial progress bar showed 100% but I definitely didn't see all steps",
    "Onboarding skipped the workspace setup for our entire team during rollout",
    "Had to watch a YouTube video to figure out features the onboarding was supposed to teach",
  ],
  "grp-004": [
    "Dashboard takes forever to load",
    "it's so slow",
    "I wait 10+ seconds every time I open the dashboard",
    "Dashboard loading is painfully slow",
    "The main page just shows a spinner for ages",
    "Why is the dashboard so slow? Other similar tools load instantly.",
    "I've started making coffee while waiting for the dashboard to load. That's how slow it is.",
    "Blank screen for 10-15 seconds before dashboard appears",
    "Dashboard load time has gotten worse over the past month",
    "The loading time is unacceptable for a daily-use tool",
    "Performance is terrible on the main dashboard",
    "I can see API calls stacking up in network tab. Way too many requests on load.",
    "dashboard slow",
    "Every morning I open the app and wait... and wait... and wait for the dashboard",
    "The dashboard loaded faster in the beta version. What happened?",
    "Other team members are also complaining about dashboard load times",
    "It takes longer to load the dashboard than to do the actual work",
    "Seriously considering switching tools because of how slow the dashboard is",
    "Dashboard shows blank page then suddenly everything appears at once",
    "Loading spinner shows for 12 seconds before I can interact with anything",
    "The charts on the dashboard take especially long to render",
    "Even on our office fiber internet, the dashboard is slow",
    "I time my dashboard loads out of frustration -- average 11 seconds this week",
    "Too many API calls. The waterfall in DevTools looks ridiculous.",
    "Why can't you load the important stuff first and defer the rest?",
    "My manager asked why I'm 'idle' so much -- it's because I'm waiting for the dashboard",
    "slow",
    "Please optimize the dashboard load time. It's the most used page.",
    "Dashboard performance on Chrome is worse than Firefox, but both are slow",
  ],
  "grp-005": [
    "I can't remove my old credit card",
    "the thing with the payment is weird",
    "Removing payment method doesn't work",
    "I deleted my card but it came back after refresh",
    "Something went wrong when trying to remove my credit card",
    "Please help me remove my expired credit card from the system",
    "The remove button does nothing for my payment methods",
    "I need to delete my payment info for security reasons but it won't let me",
    "Card removal fails with unhelpful error message",
    "Tried to remove my card 5 times. It either comes back or shows an error.",
    "This is a GDPR concern -- I should be able to delete my payment data",
    "Support had to manually remove my card. This should work in the UI.",
    "can't remove card",
    "Why is it so hard to remove a payment method?",
    "I cancelled my subscription but my card is still saved and I can't remove it",
    "The payment methods page is broken. Remove button doesn't do anything.",
    "Gets a 'Something went wrong' error every time I try to remove my Visa",
    "Card appears deleted then magically reappears on the next page load",
    "My old card is still showing even though I removed it weeks ago",
    "Worried about security since I can't remove my payment information",
    "Had to call support just to get my credit card removed from the system",
    "The remove payment method feature hasn't worked for me in months",
    "I want to update my card but first I need to remove the old one which doesn't work",
    "same payment removal issue",
    "Please just let me delete my card. Why is this so complicated?",
    "Error 409 in console when clicking remove on payment method",
    "My company's finance team needs old cards removed for audit compliance",
    "Clicking delete on my card shows success toast but card is still there on refresh",
    "I've submitted 3 support tickets about this. When will card removal be fixed?",
    "The remove button works for some cards but not others. Very inconsistent.",
    "Just let me remove my credit card PLEASE",
    "Payment method removal is completely broken as far as I can tell",
    "Deleted card shows up again. This is a serious data handling issue.",
    "Can't remove any of my 3 saved cards. Tried different browsers too.",
  ],
  "grp-006": [
    "Dark mode text is hard to read",
    "contrast is bad in dark mode",
    "I can't see some labels in dark mode",
    "The colors in dark mode need work",
    "Dark mode makes the badges unreadable",
    "Gray text on dark gray background is invisible",
    "I love dark mode but the contrast makes some things hard to see",
    "Table borders disappear in dark mode",
    "dark mode is broken for my eyes",
    "The placeholder text in forms is practically invisible in dark mode",
    "Medium severity badge is unreadable with the yellow on dark background",
    "Switched back to light mode because I couldn't read anything in dark mode",
    "Dark mode needs better contrast ratios",
    "Eye strain from using dark mode because I'm squinting to read labels",
    "The disabled buttons in dark mode look exactly like enabled ones",
    "Need to increase contrast for secondary text in dark mode",
    "dark mode hard to read",
    "Some input fields have dark text on dark background in dark mode",
    "Love the dark theme concept but the execution needs accessibility work",
    "My colleague with low vision can't use dark mode at all",
    "Status indicators are nearly invisible against the dark background",
    "Using dark mode gives me headaches because I strain to read the text",
  ],
  "grp-007": [
    "I need Excel export, not just CSV",
    "Can you add PDF export?",
    "CSV export breaks with special characters",
    "Need to export as .xlsx for our reports",
    "The CSV has commas inside fields that break the columns",
    "Export feature needs more format options",
    "Large exports time out. I need to export 15k rows.",
    "We need PDF exports for client presentations",
    "export only csv?",
    "The unicode characters in our data get garbled in CSV export",
    "Our compliance team requires PDF format for audit trails",
    "CSV export takes too long for datasets over 5000 rows",
    "Would really appreciate Excel export with proper formatting",
    "The export feature is half-baked. Only CSV and it doesn't even work properly.",
    "Need export to Excel with multiple sheets for our quarterly reports",
    "Can't share CSV files with management -- they only use PDF and Excel",
    "Export crashed when I tried to download more than 10,000 records",
    "The exported CSV has encoding issues with accented characters",
    "Please add PDF export. It's standard in every other tool we use.",
    "Manually converting CSV to Excel every week is getting old",
  ],
  "grp-008": [
    "My notification settings keep resetting",
    "I turned off marketing emails but they came back",
    "notifications reset after update",
    "Every time I log in my notification prefs are gone",
    "Had to reconfigure notifications again after the latest update",
    "Notification preferences don't save properly",
    "I disabled weekly digest but still get it",
    "Settings reset when switching between devices",
    "notification settings don't stick",
    "Turned off all optional notifications yesterday, today they're all back on",
    "Is it a known issue that notification preferences reset on logout?",
    "I set my preferences on desktop but they're different on mobile",
    "The notification settings page says changes saved but they clearly aren't",
    "Getting spammed with notifications I already disabled",
    "After clearing browser cache all my notification preferences disappeared",
    "Can you please persist notification settings on the server side?",
    "My team all had their notification prefs reset after Monday's update",
    "I've given up customizing notifications since they always reset",
    "Why do I need to re-disable marketing notifications every week?",
    "Notification settings should sync across devices but they don't",
    "browser update reset all my settings including notifications",
  ],
  "grp-009": [
    "Can't upload my profile picture",
    "Upload failed with no explanation",
    "My photo from iPhone won't upload",
    "Profile image upload stuck at 90%",
    "The image upload doesn't accept HEIC files from my phone",
    "Upload keeps failing for photos over 2MB",
    "I tried uploading a profile photo 4 times with different files",
    "avatar upload broken",
    "The upload progress bar freezes near the end then times out",
    "My uploaded profile picture looks corrupted/blurry",
    "Can you accept more image formats? My phone saves as HEIC.",
    "Upload says 'failed' but doesn't tell me why",
    "Had to resize my photo to under 2MB just to upload it as profile pic",
    "WebP images should be supported for profile upload",
    "Profile image becomes pixelated after upload even though the original was high quality",
    "The file size limit for profile images is too small",
    "Why can't I just drag and drop a profile picture?",
    "Upload works on desktop but fails on mobile browser",
  ],
  "grp-010": [
    "Can't navigate the menu with keyboard",
    "The navigation isn't accessible",
    "Screen reader doesn't work well with the nav menu",
    "I can't open dropdown menus with keyboard only",
    "Tab order is wrong in the navigation",
    "Active page isn't announced by screen reader",
    "nav menu needs keyboard support",
    "The hamburger menu on mobile has no accessible label",
    "Using VoiceOver and the menu doesn't announce menu items properly",
    "Focus jumps around unpredictably in the navigation",
    "Keyboard users can't access submenu items at all",
    "The navigation fails multiple WCAG criteria",
    "Arrow keys don't work for navigating the menu",
    "I rely on keyboard navigation and the menu is unusable for me",
    "Please add aria labels to the navigation elements",
    "Our accessibility audit flagged the navigation menu as non-compliant",
  ],
};

// ─── User Names ─────────────────────────────────────────────────────────────

const USER_NAMES = [
  "Alex M.", "Jordan P.", "Sam K.", "Riley T.", "Casey B.",
  "Morgan W.", "Taylor L.", "Avery S.", "Quinn R.", "Drew H.",
  "Jamie F.", "Reese C.", "Blake N.", "Sage V.", "Hayden G.",
  "Parker D.", "Emerson J.", "Finley A.", "Dakota W.", "Rowan E.",
  "Skyler M.", "Phoenix T.", "River K.", "Ash B.", "Jessie L.",
  "Charlie S.", "Frankie P.", "Robin H.", "Kendall R.", "Cameron N.",
  "Pat G.", "Lee W.", "Ari J.", "Max F.", "Jules D.",
  "Dana C.", "Terry V.", "Chris A.", "Noel M.", "Val T.",
];

// ─── Generate Entries ───────────────────────────────────────────────────────

interface SeedEntry {
  id: string;
  text: string;
  source: string;
  submittedAt: string;
  userName: string;
  screenshotUrl?: string;
  sessionId?: string;
  sentiment?: string;
  groupId: string;
}

function generateEntries(): SeedEntry[] {
  const entries: SeedEntry[] = [];
  let entryCounter = 1;

  // Deterministic "random" based on counter
  const pick = <T>(arr: T[], seed: number): T => arr[seed % arr.length];

  for (const groupId of GROUP_IDS) {
    const count = ENTRIES_PER_GROUP[groupId];
    const templates = FEEDBACK_TEMPLATES[groupId];

    for (let i = 0; i < count; i++) {
      const id = `entry-${String(entryCounter).padStart(3, "0")}`;

      // Distribute dates over past 30 days
      const daysAgo = Math.floor((entryCounter * 7 + i * 3) % 30);
      const hoursOffset = (entryCounter * 13 + i * 7) % 24;
      const date = new Date("2026-03-08T00:00:00Z");
      date.setDate(date.getDate() - daysAgo);
      date.setHours(hoursOffset, (entryCounter * 17) % 60, 0, 0);

      // ~30% get screenshots
      const hasScreenshot = (entryCounter * 3 + i) % 10 < 3;
      // ~15% get session IDs
      const hasSession = (entryCounter * 5 + i) % 20 < 3;

      // Sentiment weighted: negative majority for bug reports
      const sentimentSeed = (entryCounter * 11 + i) % 10;
      const sentiment =
        sentimentSeed < 6 ? "negative" : sentimentSeed < 8 ? "neutral" : "positive";

      const entry: SeedEntry = {
        id,
        text: pick(templates, entryCounter + i),
        source: pick([...SOURCES], entryCounter * 2 + i),
        submittedAt: date.toISOString(),
        userName: pick(USER_NAMES, entryCounter * 3 + i * 2),
        sentiment,
        groupId,
      };

      if (hasScreenshot) {
        entry.screenshotUrl = `/screenshots/placeholder-${String(((entryCounter + i) % 20) + 1).padStart(2, "0")}.svg`;
      }

      if (hasSession) {
        entry.sessionId = pick(SESSION_IDS, entryCounter + i);
      }

      entries.push(entry);
      entryCounter++;
    }
  }

  return entries;
}

// ─── Main ───────────────────────────────────────────────────────────────────

const entries = generateEntries();

const dataDir = __dirname;
writeFileSync(
  join(dataDir, "entries.json"),
  JSON.stringify(entries, null, 2),
  "utf-8"
);

console.log(`Generated ${entries.length} entries across ${GROUP_IDS.length} groups`);
console.log(
  `Screenshots: ${entries.filter((e) => e.screenshotUrl).length} (${((entries.filter((e) => e.screenshotUrl).length / entries.length) * 100).toFixed(1)}%)`
);
console.log(
  `Sessions: ${entries.filter((e) => e.sessionId).length} (${((entries.filter((e) => e.sessionId).length / entries.length) * 100).toFixed(1)}%)`
);
