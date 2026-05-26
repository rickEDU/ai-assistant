export function detectRisk(input: string) {
  const text = input.toLowerCase().trim();

  const injectionPatterns = [
    "ignore",
    "evite regras",
    "system prompt",
    "bypass",
    "gere sem regras",
    "override",
  ];

  if (injectionPatterns.some(p => text.includes(p))) {
    return "HIGH_RISK";
  }

  if (input.length > 3000) {
    return "MEDIUM_RISK";
  }

  return "SAFE";
}