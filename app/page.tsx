'use client';

import { useState } from 'react';
import { TicketAnalysis } from '@/types/ticket';

export default function TicketDashboard() {
  const [emailInput, setEmailInput] = useState('');
  const [analysis, setAnalysis] = useState<TicketAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTriageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawCustomerEmail: emailInput }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Request failed');
      } else {
        setAnalysis(data);
      }
    } catch (err) {
      setError('Network error — check the console for details.');
      console.error("Triage operations failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-8">
      {/* Top Navigation Header */}
      <header className="max-w-6xl mx-auto border-b border-zinc-800 pb-4 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">OpsTriage AI</h1>
          <p className="text-xs text-zinc-400">Enterprise Inbound Communication Automation Routing Dashboard</p>
        </div>
        <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-medium border border-emerald-500/20">
          System Status: Operational
        </span>
      </header>

      {/* Main Split Layout Panel View */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left Column Input Panel */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-zinc-400 mb-4">Inbound Customer Email</h2>
          <form onSubmit={handleTriageSubmit} className="space-y-4">
            <textarea
              className="w-full h-64 bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Paste raw, unformatted angry customer email payload here..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-medium py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
            >
              {loading ? 'Processing Pipeline Operations...' : 'Execute AI Triage Analysis'}
            </button>
          </form>
        </section>

        {/* Right Column Output Display Module */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold tracking-wider uppercase text-zinc-400 mb-4">Automated CRM Extraction Analytics</h2>

            {!analysis && !loading && !error && (
              <div className="h-64 flex items-center justify-center border border-dashed border-zinc-800 rounded-lg text-sm text-zinc-500">
                Awaiting payload ingestion pipeline execution...
              </div>
            )}

            {error && (
              <div className="h-64 flex items-center justify-center border border-dashed border-red-800 rounded-lg p-4">
                <p className="text-xs text-red-400 text-center">{error}</p>
              </div>
            )}

            {loading && (
              <div className="h-64 flex flex-col items-center justify-center space-y-3">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-zinc-400 animate-pulse">Running JSON extraction & schema validation...</p>
              </div>
            )}

            {analysis && !loading && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold">Identified Customer</span>
                    <span className="text-sm text-zinc-200 font-medium">{analysis.customerName}</span>
                  </div>
                  <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold">Priority Severity Matrix</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold inline-block mt-1 ${analysis.sentiment === 'URGENT' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>{analysis.sentiment}</span>
                  </div>
                </div>

                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">Automated Intent Classification</span>
                  <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded inline-block mt-1 font-mono">{analysis.category}</span>
                </div>

                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">Executive TL;DR Summary</span>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{analysis.summary}</p>
                </div>

                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">AI Autogenerated Agent Draft Reply</span>
                  <p className="text-xs text-zinc-400 mt-1 bg-zinc-900 p-3 rounded border border-zinc-800 whitespace-pre-wrap font-serif leading-relaxed italic">"{analysis.suggestedDraftReply}"</p>
                </div>
              </div>
            )}
          </div>

          {analysis && (
            <button
              onClick={() => alert('Payload safely routed to production CRM.')}
              className="w-full mt-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs py-2 rounded-lg transition-colors font-medium border border-zinc-700"
            >
              Approve & Commit Route to CRM Database
            </button>
          )}
        </section>

      </main>
    </div>
  );
}