# Trade Importer Tool

A subscription web app that converts Tradovate CSV exports into 
Notion-ready import files — built specifically for 
[The Trader's Diary](https://softcreated.gumroad.com), 
a Notion trading journal.

## What it does

Upload your Tradovate CSV and download two perfectly formatted 
files ready to import directly into Notion:

- `1_trades.csv` — all individual trades mapped to Notion properties
- `2_daily_summary.csv` — one entry per trading day

## Tech stack

- **Framework** — Next.js
- **Auth** — Clerk
- **Payments** — Stripe
- **Hosting** — Vercel

## Features

- Tradovate CSV parsing and cleaning
- Account name tagging for multiple account support
- Zip file download with both CSVs
- Subscription gating (monthly + yearly plans)
- Google OAuth sign in

## Live

[tools.softcreated.com](https://tools.softcreated.com)

## Related

[The Trader's Diary](https://softcreated.gumroad.com) — 
the Notion template this tool was built for.

---

Built by [SoftCreated](https://tools.softcreated.com) (Jazmine Chargualaf) 🤎
