import { TData } from "./types";

const STATUS_ON_DECK = { id: 1, name: "On Deck", color: "bg-blue-300" };
const STATUS_IN_PROGRESS = {
  id: 2,
  name: "In Progress",
  color: "bg-yellow-400",
};
const STATUS_TESTING = { id: 3, name: "Testing", color: "bg-red-300" };
const STATUS_DEPLOYED = { id: 4, name: "Deployed", color: "bg-green-300" };
export const STATUSES = [
  STATUS_ON_DECK,
  STATUS_IN_PROGRESS,
  STATUS_TESTING,
  STATUS_DEPLOYED,
];

const DATA: TData[] = [
  {
    task: "Add a New Feature",
    status: STATUS_ON_DECK,
    due: new Date("2023/10/15"),
    notes: "This is a note",
  },
  {
    task: "Write Integration Tests",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Use Jest",
  },
  {
    task: "Add Instagram Integration",
    status: STATUS_DEPLOYED,
    due: null,
    notes: "",
  },
  {
    task: "Cleanup Database",
    status: null,
    due: new Date("2023/02/15"),
    notes: "Remove old data",
  },
  {
    task: "Refactor API Endpoints",
    status: STATUS_TESTING,
    due: null,
    notes: "",
  },
  {
    task: "Add Documentation to API",
    status: null,
    due: new Date("2023/09/12"),
    notes: "Add JS Docs to all endpoints",
  },
  {
    task: "Update NPM Packages",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Add Unit Tests to API",
    status: null,
    due: new Date("2023/10/15"),
    notes: "Add Jest Unit Tests to all API endpoints",
  },
  {
    task: "Add UI Storybook",
    status: STATUS_TESTING,
    due: null,
    notes: "Use Storybook",
  },
  {
    task: "Add Cypress E2E tests",
    status: null,
    due: new Date("2023/11/15"),
    notes: "Test all pages",
  },
  {
    task: "Add Documentation to Frontend",
    status: null,
    due: new Date("2023/12/15"),
    notes: "Add JS Docs to all frontend files",
  },
  {
    task: "Refactor Frontend Code",
    status: null,
    due: null,
    notes: "Use new React features",
  },
  {
    task: "Add GitHub Actions CI/CD",
    status: null,
    due: new Date("2023/12/20"),
    notes: "Use GitHub Actions",
  },
];

export default DATA;
