export const fieldSteps = [
  { name: "Priority", title: "Begin with leadership judgement.", summary: "Capture an opportunity your leadership wants the field team to act on." },
  { name: "Context", title: "Read the outlet’s context.", summary: "Bring the priority together with the outlet’s recent and historical activity." },
  { name: "Pitch", title: "Surface an additional pitch.", summary: "Give the sales officer a focused opportunity, with the reason for raising it." },
  { name: "Delivery", title: "Deliver it in the flow of work.", summary: "Send daily outlet guidance in a format the team can use during visits." },
] as const;

// Condensed English renderings of the supplied WhatsApp example, in its original order.
// Commercial rates, thresholds, customer names and identifiers are excluded from this public view.
// SKU labels are anonymised and shared consistently across the walkthrough.
export const samplePitches = [
  { product: "SKU1", action: "Recover order volume or frequency." },
  { product: "SKU2", action: "Resume regular ordering." },
  { product: "SKU3", action: "Bring it back into the order basket." },
  { product: "SKU4", action: "Resume regular ordering." },
  { product: "SKU5", action: "Investigate the decline in ordering." },
] as const;
