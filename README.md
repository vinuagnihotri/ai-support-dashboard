# 📥 OpsTriage AI: Support Automation Dashboard

A high-performance triage dashboard designed to transform unformatted inbound customer communications into structured, actionable data payloads.

## 🚀 Technical Stack
- **Framework:** Next.js 16 (App Router)
- **AI Orchestration:** Vercel AI SDK
- **Model:** Claude 3.5 Sonnet (Anthropic)
- **Styling:** Tailwind CSS
- **Type Safety:** TypeScript

## 🛠️ Features
- **Structured Data Extraction:** Uses `generateObject` with strict JSON schemas to ensure CRM-compatible output.
- **Sentiment Matrix:** Automatically classifies inbound requests by priority (URGENT to LOW).
- **Intent Classification:** Categorizes communications into Technical, Billing, or Account Access flows.
- **Automated Drafts:** Generates professional agent responses based on the analyzed intent.

## ⚙️ Setup Instructions

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/ai-support-dashboard.git](https://github.com/YOUR_USERNAME/ai-support-dashboard.git)
   cd ai-support-dashboard