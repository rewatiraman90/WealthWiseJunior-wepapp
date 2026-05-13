export type AgentName = "engineer" | "support" | "accounting" | "marketing";
export type ActionStatus = "pending" | "approved" | "rejected";

export interface ProposedAction {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  type: "code_fix" | "content" | "report" | "email" | "alert";
  payload?: Record<string, unknown>;
}

export interface AgentLog {
  id: string;
  agent: AgentName;
  summary: string;
  findings: string[];
  proposed_actions: ProposedAction[];
  status: ActionStatus;
  created_at: string;
  approved_at?: string;
}
