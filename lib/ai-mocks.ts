import type { AIToolResponse } from "@/lib/types";

const recommendationBank = [
  "Start with a lightweight regimen and increase intensity weekly.",
  "Pair this selection with a hydration-focused product for balance.",
  "Set a recurring reminder and track outcomes for 14 days.",
  "Prioritize consistency over complexity for measurable improvement.",
  "Review ingredient compatibility before introducing additional actives.",
  "Bundle top-performing picks to optimize value and adherence."
];

function hashInput(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

export function runMockAI(tool: string, input: Record<string, unknown>): AIToolResponse {
  const serialized = JSON.stringify({ tool, input });
  const value = hashInput(serialized);
  const score = 62 + (value % 37);

  const picks = [
    recommendationBank[value % recommendationBank.length],
    recommendationBank[(value + 2) % recommendationBank.length],
    recommendationBank[(value + 4) % recommendationBank.length]
  ];

  return {
    title: `${tool} result`,
    summary:
      "This is a production-shaped mock response. Replace the backend handler with live model inference when API credentials are available.",
    recommendations: picks,
    score
  };
}
