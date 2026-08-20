// Configuration constants as specified
export const CONFIG = {
  PRODUCT_NAME: "Normora",
  COMPANY_NAME: "Normora",
  PRIMARY_DOMAIN: "https://normora.ai",
  PORTAL_LOGIN_URL: "/auth/login",
  PORTAL_SIGNUP_URL: "/auth/signup",
  PORTAL_DEMO_URL: "/demo",
  BOOK_DEMO_URL: "https://calendly.com/mifrahim17/30min",
  CONTACT_EMAIL: "hello@normora.ai",
  SECURITY_EMAIL: "security@normora.ai",
  STATUS_PAGE_URL: "",
  INITIAL_FRAMEWORKS: ["SOC 2", "ISO 27001:2022", "HIPAA", "GDPR", "ISO 42001", "EU AI Act"],
  INITIAL_CONNECTORS: ["AWS", "GCP", "Azure", "GitHub", "Google Workspace", "Microsoft 365", "Jira", "Slack"],
  BRAND_POSITIONING: "AI-native continuous assurance for AI, healthcare, and B2B SaaS companies",
};

/**
 * Resolves the URL for the interactive demo.
 */
export function resolveDemoUrl(): string {
  if (CONFIG.PORTAL_DEMO_URL && CONFIG.PORTAL_DEMO_URL.trim() !== "") {
    return CONFIG.PORTAL_DEMO_URL;
  }
  return "/demo";
}

/**
 * Safe navigation links resolver
 */
export function resolveLink(action: "login" | "signup" | "demo" | "book" | "contact" | "trust" | "security" | "pricing" | "platform" | "frameworks" | "integrations" | "resources"): string {
  switch (action) {
    case "login":
      return CONFIG.PORTAL_LOGIN_URL;
    case "signup":
      return CONFIG.PORTAL_SIGNUP_URL;
    case "demo":
      return resolveDemoUrl();
    case "book":
      return CONFIG.BOOK_DEMO_URL;
    case "contact":
      return "/contact";
    case "trust":
      return "/trust";
    case "security":
      return "/security";
    case "pricing":
      return "/pricing";
    case "platform":
      return "/platform";
    case "frameworks":
      return "/frameworks";
    case "integrations":
      return "/integrations";
    case "resources":
      return "/resources";
    default:
      return "/";
  }
}
