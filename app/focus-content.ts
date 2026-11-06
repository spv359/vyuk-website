export type FocusCapability = {
  title: string;
  category: string;
  description: string | readonly string[];
  href: string | null;
  linkLabel: string;
};

export type FocusArea = {
  id: "sales" | "marketing" | "finance";
  name: string;
  image: string;
  imageAlt: string;
  capabilities: readonly FocusCapability[];
};

export const focusAreas: readonly FocusArea[] = [
  {
    id: "sales",
    name: "Sales",
    image: "/focus-sales-overview-v1.webp",
    imageAlt: "A sales officer discusses a product opportunity with an outlet owner, supported by data insights, phone guidance and trade offers.",
    capabilities: [
      {
        title: "Conversational analytics",
        category: "OPERATIONS DATA",
        description: [
          "No more clumsy dashboards and waiting for MIS for analytics.",
          "Talk directly to your data in natural language and get insights. Enable quick decision making at scale.",
        ],
        href: "/work/conversational-analytics",
        linkLabel: "Explore the product",
      },
      {
        title: "Field sales intelligence",
        category: "FIELD SALES",
        description: [
          "Improve revenue throughput by spotting exactly the right products to pitch at the right time.",
          "Bring leadership priorities right into daily sales execution. Contextualised, and at scale.",
        ],
        href: "/work/field-sales-throughput",
        linkLabel: "Explore the product",
      },
      {
        title: "Trade scheme optimisation",
        category: "TRADE PARTNER INCENTIVES",
        description: [
          "Design and optimise trade schemes around business priorities, sales opportunities and commercial constraints.",
          "Save on scheme spend with targeted, customised schemes for your partners at scale.",
        ],
        href: null,
        linkLabel: "Project page coming soon",
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    image: "/focus-marketing-overview-v1.webp",
    imageAlt: "A marketing professional coordinates digital campaign channels and reviews performance to guide digital spending.",
    capabilities: [
      {
        title: "Digital marketing orchestration",
        category: "DIGITAL GROWTH",
        description: [
          "Connect campaigns, content and follow-up into a coordinated workflow, with your team in control.",
          "Keep campaigns moving with fewer manual handoffs and more consistent execution.",
        ],
        href: null,
        linkLabel: "Project page coming soon",
      },
      {
        title: "Digital spend optimisation",
        category: "MARKETING PERFORMANCE",
        description: [
          "Bring campaign performance and business outcomes together to guide where you spend, what you change and what you scale.",
          "Reduce wasted spend and direct your budget towards campaigns that deliver business value.",
        ],
        href: null,
        linkLabel: "Project page coming soon",
      },
    ],
  },
  {
    id: "finance",
    name: "Finance",
    image: "/focus-finance-overview-v1.webp",
    imageAlt: "A finance professional works with checked accounting documents and a clear financial reporting summary.",
    capabilities: [
      {
        title: "Accounting workflow automation",
        category: "ACCOUNTING",
        description: [
          "Reduce repetitive processing across invoices, checks and reconciliations, while keeping your team in control.",
          "Free your finance team to resolve exceptions and focus on analysis.",
        ],
        href: null,
        linkLabel: "Project page coming soon",
      },
      {
        title: "Financial reporting automation",
        category: "FINANCIAL REPORTING",
        description: [
          "Turn operational and financial data into consistent reports, with less manual preparation and clearer visibility for leaders.",
          "Spot performance changes sooner and give leaders a clearer basis for action.",
        ],
        href: null,
        linkLabel: "Project page coming soon",
      },
    ],
  },
];
