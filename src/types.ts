export type VisualKind =
  | "hero"
  | "promise"
  | "platform"
  | "fragmented"
  | "pillars"
  | "sources"
  | "pipeline"
  | "history"
  | "layers"
  | "rules"
  | "anomaly"
  | "endpoint"
  | "correlation"
  | "detection-demo"
  | "entities"
  | "alerts"
  | "discovery"
  | "hypothesis"
  | "timeline"
  | "process"
  | "session"
  | "interop"
  | "migration"
  | "agent"
  | "retrieval"
  | "ai-demo"
  | "trust"
  | "workflow"
  | "response"
  | "deploy"
  | "economics"
  | "proof"
  | "operating"
  | "closing";

export interface Source {
  label: string;
  url: string;
}
export interface Takeaway {
  label: string;
  value: string;
  detail: string;
}
export interface Step {
  label: string;
  detail: string;
}
export interface Notes {
  opening: string;
  body: string;
  transition: string;
  seconds: number;
  prompt?: string;
}
export interface Scene {
  id: string;
  chapter: string;
  eyebrow: string;
  headline: string;
  emphasis: string;
  lead: string;
  visual: VisualKind;
  layout: "split" | "wide" | "hero";
  takeaways: [Takeaway, Takeaway, Takeaway];
  densityExtra: string;
  qualification: string;
  sources: Source[];
  notes: Notes;
  steps?: Step[];
  illustrative?: boolean;
}

export interface VisualOptions {
  step: number;
  settled: boolean;
  density: number;
}
