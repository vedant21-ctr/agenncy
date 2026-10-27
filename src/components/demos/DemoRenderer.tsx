"use client";

import SaasDashboardDemo from "./SaasDashboardDemo";
import EcommerceDemo from "./EcommerceDemo";
import AiWorkflowDemo from "./AiWorkflowDemo";
import FintechAppDemo from "./FintechAppDemo";
import StartupLandingDemo from "./StartupLandingDemo";

interface DemoRendererProps {
  type: "saas-dashboard" | "ecommerce" | "ai-workflow" | "fintech-app" | "startup-landing";
}

export default function DemoRenderer({ type }: DemoRendererProps) {
  switch (type) {
    case "saas-dashboard":
      return <SaasDashboardDemo />;
    case "ecommerce":
      return <EcommerceDemo />;
    case "ai-workflow":
      return <AiWorkflowDemo />;
    case "fintech-app":
      return <FintechAppDemo />;
    case "startup-landing":
      return <StartupLandingDemo />;
    default:
      return <SaasDashboardDemo />;
  }
}
