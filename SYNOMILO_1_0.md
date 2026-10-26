# Synomilo 1.0

Positioning: Here's the content. Teach it your way.

This branch starts from the unchanged local `new-style` branch at
`7e21f7b7f790e640fc8ccd3e9c0db17341cefc38`.

The active experience is Home, Conversations, Recents, Dictionary, and account settings.
The library retains CEFR/category browsing and adds title/description search with a
clear-filter empty state. It uses a white default theme and quieter conversation cards.
All signed-in roles use the existing interactive reader, including vocabulary saving,
highlighting, audio entitlements, and conversation completion.

Assignments redirect to Conversations. Daily task/challenge launchers, challenge
notifications, daily streak updates, and background friend fetching are disabled.
Legacy components, data fields, billing plan identifiers, and backend implementations
remain in source. Existing assignment entitlements remain valid for current users;
this change does not revoke paid access or migrate data.

Pricing no longer promotes the dormant workflows. Existing student/tutor billing
plans and role selection remain to preserve current subscriptions and access rules.
Authentication and subscription requirements are unchanged.

Validation: TypeScript, ESLint, production build, and mobile guest browser preview.
Authenticated save/completion/payment flows require an existing signed-in session
and were not exercised against live accounts.
