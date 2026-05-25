export interface TicketAnalysis {
  customerName: string;
  sentiment: 'URGENT' | 'NORMAL' | 'LOW';
  category: string;
  summary: string;
  suggestedDraftReply: string;
}
