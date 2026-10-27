"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, CheckCircle2, Bot, Database, MessageSquare, Webhook, RefreshCw } from "lucide-react";

interface NodeState {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  status: "idle" | "running" | "complete";
  color: string;
  detail: string;
}

export default function AiWorkflowDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [logs, setLogs] = useState<string[]>([
    "Workflow engine standby. Click 'Trigger Pipeline' to test execution.",
  ]);

  const nodes: NodeState[] = [
    {
      id: "webhook",
      title: "1. Webhook Ingest",
      subtitle: "Typeform / Stripe",
      icon: Webhook,
      status: activeStep > 0 ? "complete" : activeStep === 0 ? "running" : "idle",
      color: "#00E5FF",
      detail: "Payload received: { email: 'founder@acme.ai', mrr: '$120k' }",
    },
    {
      id: "llm",
      title: "2. Claude 3.7 Scoring",
      subtitle: "ICP & Intent Analysis",
      icon: Bot,
      status: activeStep > 1 ? "complete" : activeStep === 1 ? "running" : "idle",
      color: "#CCFF00",
      detail: "Score: Tier-1 High Value (0.94 probability)",
    },
    {
      id: "crm",
      title: "3. HubSpot Sync",
      subtitle: "Enrich & Assign",
      icon: Database,
      status: activeStep > 2 ? "complete" : activeStep === 2 ? "running" : "idle",
      color: "#A78BFA",
      detail: "Contact created • Routed to Enterprise AE",
    },
    {
      id: "slack",
      title: "4. Slack & Email",
      subtitle: "Instant Alert",
      icon: MessageSquare,
      status: activeStep > 3 ? "complete" : activeStep === 3 ? "running" : "idle",
      color: "#34D399",
      detail: "VIP Deal Room posted in #leads-live (120ms)",
    },
  ];

  const runPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
    setLogs(["[00:00.012] Trigger received: Inbound Form Webhook POST"]);

    setTimeout(() => {
      setActiveStep(1);
      setLogs((prev) => [
        ...prev,
        "[00:00.145] LLM Evaluation: Analyzing firmographic fit & budget intent...",
      ]);
    }, 900);

    setTimeout(() => {
      setActiveStep(2);
      setLogs((prev) => [
        ...prev,
        "[00:00.320] CRM Synchronization: HubSpot contact updated with verified tech stack",
      ]);
    }, 1800);

    setTimeout(() => {
      setActiveStep(3);
      setLogs((prev) => [
        ...prev,
        "[00:00.480] Notification Dispatch: Slack webhook confirmed 200 OK. Lead routed.",
      ]);
    }, 2700);

    setTimeout(() => {
      setActiveStep(4);
      setIsRunning(false);
      setLogs((prev) => [
        ...prev,
        "[00:00.510] Pipeline completed successfully. 0 human touches required.",
      ]);
    }, 3500);
  };

  const resetPipeline = () => {
    setActiveStep(-1);
    setIsRunning(false);
    setLogs(["Workflow engine reset. Ready for next event."]);
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#0B0B0F] shadow-2xl font-sans text-xs">
      {/* Top Controller Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/5 bg-[#14141A] px-4 py-3 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
          <span className="font-mono text-xs font-bold text-white tracking-wider">
            SYNAPSE FLOW RUNNER // v3.2
          </span>
          <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-mono text-white/50">
            AUTONOMOUS AGENT
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetPipeline}
            disabled={isRunning || activeStep === -1}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 font-mono text-[11px] text-white/60 hover:text-white disabled:opacity-30 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset</span>
          </button>

          <button
            onClick={runPipeline}
            disabled={isRunning}
            className="flex items-center gap-1.5 rounded-lg bg-[#CCFF00] px-3.5 py-1.5 font-mono text-[11px] font-bold text-black hover:bg-[#B3E600] disabled:opacity-50 transition-all shadow-md shadow-[#CCFF00]/10"
          >
            {isRunning ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-3 h-3 border-2 border-black border-t-transparent rounded-full"
                />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-black" />
                <span>Trigger Pipeline</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Visual Canvas */}
      <div className="p-5 sm:p-7 relative overflow-hidden bg-grid-pattern">
        {/* Node Pipeline Grid with Animated Connectors */}
        <div className="relative">
          {/* Desktop Animated Connector Lines */}
          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] -translate-y-6 pointer-events-none z-0">
            <svg className="w-full h-8 overflow-visible" fill="none">
              <line
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Highlight line 0 to 1 */}
              <motion.line
                x1="0%"
                y1="50%"
                x2="33.3%"
                y2="50%"
                stroke="#CCFF00"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: activeStep >= 1 ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />
              {/* Highlight line 1 to 2 */}
              <motion.line
                x1="33.3%"
                y1="50%"
                x2="66.6%"
                y2="50%"
                stroke="#CCFF00"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: activeStep >= 2 ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />
              {/* Highlight line 2 to 3 */}
              <motion.line
                x1="66.6%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="#CCFF00"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: activeStep >= 3 ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {nodes.map((node, index) => {
              const Icon = node.icon;
              const isCurrent = activeStep === index;
              const isDone = activeStep > index;

              return (
                <motion.div
                  key={node.id}
                  animate={{
                    scale: isCurrent ? 1.03 : 1,
                    borderColor: isCurrent
                      ? "#CCFF00"
                      : isDone
                      ? "rgba(204,255,0,0.4)"
                      : "rgba(255,255,255,0.08)",
                  }}
                  transition={{ duration: 0.25 }}
                  className={`relative rounded-xl bg-[#131318] border p-4 transition-all duration-300 shadow-lg ${
                    isCurrent ? "shadow-[#CCFF00]/20 ring-1 ring-[#CCFF00]/30" : ""
                  }`}
                >
                  {/* Node Top Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform"
                      style={{
                        backgroundColor: `${node.color}15`,
                        color: node.color,
                        transform: isCurrent ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {isDone ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-[#CCFF00]">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>200 OK</span>
                      </span>
                    ) : isCurrent ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-[#CCFF00] animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
                        <span>PROCESSING</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-white/30">STANDBY</span>
                    )}
                  </div>

                  <div className="font-bold text-white text-xs">{node.title}</div>
                  <div className="text-[10px] text-white/50 font-mono mt-0.5">{node.subtitle}</div>

                  <div className="mt-3 pt-2 border-t border-white/5 text-[10px] text-white/70 font-mono bg-black/40 rounded p-2">
                    {node.detail}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Live Execution Logs Window */}
        <div className="mt-6 rounded-lg bg-black/60 border border-white/10 p-3 font-mono text-[11px] space-y-1">
          <div className="text-white/40 text-[10px] pb-1 border-b border-white/5 flex items-center justify-between">
            <span>REAL-TIME EXECUTION LOGS</span>
            <span className="text-[#CCFF00]">LATENCY: ~248MS</span>
          </div>
          <div className="pt-1.5 max-h-24 overflow-y-auto space-y-1 text-white/80">
            {logs.map((log, i) => (
              <div key={i} className="leading-snug">
                <span className="text-[#CCFF00] mr-2">›</span>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
