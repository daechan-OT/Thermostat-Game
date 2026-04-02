// src/data/cards.js
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO EDIT THIS FILE:
// - Add a new card object to the CARD_DECK array below.
// - "type" must be either "environment" or "choice".
// - For environment cards, "energyImpact" is a number (positive raises energy,
//   negative lowers it). Keep values between -3 and +3.
// - For choice cards, each option has its own "energyImpact" and
//   "educationalMessage" shown after the player confirms their pick.
// - The game randomly selects 10 cards per session, so you can have more than
//   10 cards in this file for replayability.
// ─────────────────────────────────────────────────────────────────────────────

export const CARD_DECK = [
  // ── ENVIRONMENT CARDS ────────────────────────────────────────────────────
  {
    id: "env-001",
    type: "environment",
    label: "Environment",
    title: "The Unexpected Rush",
    description:
      "A tour bus arrives 15 minutes before close. Forty guests fill the lobby at once.",
    energyImpact: +2,
    impactLabel: "Store Energy +2",
  },
  {
    id: "env-002",
    type: "environment",
    label: "Environment",
    title: "System Outage",
    description:
      "The POS system goes down during peak hours. Customers are growing impatient.",
    energyImpact: +3,
    impactLabel: "Store Energy +3",
  },
  {
    id: "env-003",
    type: "environment",
    label: "Environment",
    title: "Short-Staffed Shift",
    description:
      "Two team members call out sick on your busiest day of the week.",
    energyImpact: +2,
    impactLabel: "Store Energy +2",
  },
  {
    id: "env-004",
    type: "environment",
    label: "Environment",
    title: "Surprise Audit",
    description:
      "A regional manager announces an unscheduled visit in 30 minutes.",
    energyImpact: +2,
    impactLabel: "Store Energy +2",
  },
  {
    id: "env-005",
    type: "environment",
    label: "Environment",
    title: "Great Review",
    description:
      "A customer leaves a glowing online review, specifically naming three of your team members by name.",
    energyImpact: -2,
    impactLabel: "Store Energy −2",
  },

  // ── CHOICE CARDS ─────────────────────────────────────────────────────────
  {
    id: "cho-001",
    type: "choice",
    label: "Your Move",
    title: "The Frustrated Employee",
    description:
      "Your top associate pulls you aside, upset about being passed over for a promotion twice.",
    options: [
      {
        id: "A",
        text: "Acknowledge her feelings and schedule dedicated time to map out a clear path forward.",
        energyImpact: -1,
        educationalMessage:
          "Acknowledging emotions before solutions builds trust and lowers tension — this is the thermostat setting the temperature.",
      },
      {
        id: "B",
        text: "Explain that decisions are based on performance metrics and were made fairly.",
        energyImpact: +1,
        educationalMessage:
          "Process-first responses feel dismissive even when fair. Leading with empathy first de-escalates the situation before addressing facts.",
      },
    ],
  },
  {
    id: "cho-002",
    type: "choice",
    label: "Your Move",
    title: "The Public Mistake",
    description:
      "A team member made a billing error in front of a customer. The customer is asking for a manager.",
    options: [
      {
        id: "A",
        text: "Step in calmly, apologize to the customer, correct the issue, and address the associate privately later.",
        energyImpact: -2,
        educationalMessage:
          "Protecting your team member publicly while resolving the issue demonstrates psychological safety and calm leadership.",
      },
      {
        id: "B",
        text: "Correct the associate directly in front of the customer to show accountability.",
        energyImpact: +2,
        educationalMessage:
          "Public correction, even with good intent, increases team anxiety and models the kind of stress-first culture you're trying to avoid.",
      },
    ],
  },
  {
    id: "cho-003",
    type: "choice",
    label: "Your Move",
    title: "The Anxious New Hire",
    description:
      "Your newest team member is visibly nervous and making small mistakes during a busy period.",
    options: [
      {
        id: "A",
        text: "Give them a specific small task where they can succeed, then check in with a word of encouragement.",
        energyImpact: -1,
        educationalMessage:
          "Creating quick wins builds confidence fast. Your calm attention acts as a thermostat — it sets the temperature for how they feel about their potential.",
      },
      {
        id: "B",
        text: "Reassign them to the back to avoid customer-facing errors until things slow down.",
        energyImpact: +1,
        educationalMessage:
          "Removing someone from visibility often amplifies anxiety rather than reducing it. Small doses of challenge with support builds resilience.",
      },
    ],
  },
  {
    id: "cho-004",
    type: "choice",
    label: "Your Move",
    title: "Team Conflict",
    description:
      "Two of your most experienced associates are visibly not speaking after a disagreement yesterday.",
    options: [
      {
        id: "A",
        text: "Pull each person aside separately, listen without judgment, and facilitate a brief conversation to clear the air.",
        energyImpact: -2,
        educationalMessage:
          "Addressing conflict early and privately prevents it from spreading to the team's energy. Thermostat managers don't let tension simmer.",
      },
      {
        id: "B",
        text: "Let it resolve itself — they're professionals and will work it out.",
        energyImpact: +1,
        educationalMessage:
          "Unresolved conflict radiates to the whole team. Staying passive when tension is visible sets a temperature of avoidance.",
      },
    ],
  },
  {
    id: "cho-005",
    type: "choice",
    label: "Your Move",
    title: "End-of-Day Energy",
    description:
      "Your team has had a brutal shift. It's the last 30 minutes and morale is visibly low.",
    options: [
      {
        id: "A",
        text: "Acknowledge how hard the shift was, thank each person specifically for something they did well, and close out together.",
        energyImpact: -2,
        educationalMessage:
          "Specific acknowledgment at the end of a hard day is one of the most powerful thermostat moves available to you. It resets the room for tomorrow.",
      },
      {
        id: "B",
        text: "Push for strong close procedures — low morale is no excuse for sloppy closing work.",
        energyImpact: +1,
        educationalMessage:
          "Standards matter, but leading with expectations over empathy during a hard moment escalates rather than settles the energy in the room.",
      },
    ],
  },
];
