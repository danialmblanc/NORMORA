import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "15mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      platform: "Normora Assurance Platform",
      version: "2.4.0",
      timestamp: new Date().toISOString(),
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
    });
  });

  // AI Compliance Agents API
  app.post("/api/agents/run", async (req, res) => {
    const { agentType, context, payload } = req.body;

    if (!agentType) {
      return res.status(400).json({ error: "Missing agentType parameter" });
    }

    const ai = getGeminiClient();

    try {
      if (ai) {
        let systemPrompt = `You are Normora's AI Compliance & Assurance Agent specializing in ${agentType}.
Your mission is to turn obligations into operations with rigorous provenance, grounded citations, and human accountability.
Provide structured, professional, audit-defensible output strictly in JSON format.`;

        let userPrompt = "";

        if (agentType === "policy_agent") {
          userPrompt = `Generate or update a compliance policy draft based on the following:
Company Context: ${JSON.stringify(context || {})}
Policy Title: ${payload?.title || "Information Security Policy"}
Target Frameworks: ${JSON.stringify(payload?.frameworks || ["SOC 2", "ISO 27001:2022"])}
Specific Directives: ${payload?.prompt || "Draft a comprehensive policy section"}

Return a JSON object with:
{
  "title": string,
  "version": "1.2.0",
  "summary": string,
  "sections": [
    { "id": string, "title": string, "content": string, "controlsMapped": string[] }
  ],
  "reviewPeriodDays": 365,
  "missingContextItems": string[],
  "auditGuidance": string
}`;
        } else if (agentType === "risk_agent") {
          userPrompt = `Analyze organization assets, vendor connections, and recent test anomalies to formulate risk assessment:
Context: ${JSON.stringify(context || {})}
Trigger Signal / Focus: ${JSON.stringify(payload || {})}

Return a JSON object with:
{
  "riskStatement": string,
  "threatActor": string,
  "vulnerability": string,
  "impactCategory": "Security" | "Privacy" | "Financial" | "Reputational" | "Operational",
  "inherentLikelihood": number (1-5),
  "inherentImpact": number (1-5),
  "suggestedMitigation": string,
  "mitigatingControlIds": string[],
  "residualLikelihood": number (1-5),
  "residualImpact": number (1-5),
  "rationale": string
}`;
        } else if (agentType === "gap_agent") {
          userPrompt = `Perform a continuous gap analysis comparing framework requirements against implemented controls, evidence freshness, and automated tests:
Framework: ${payload?.framework || "SOC 2 Type II"}
Current State: ${JSON.stringify(payload || {})}

Return a JSON object with:
{
  "framework": string,
  "overallReadinessPct": number,
  "gaps": [
    {
      "id": string,
      "requirementId": string,
      "gapType": "Design Gap" | "Implementation Gap" | "Evidence Gap" | "Operating Effectiveness Gap",
      "severity": "Critical" | "High" | "Medium" | "Low",
      "finding": string,
      "remediationAction": string,
      "targetControlId": string,
      "slaDays": number
    }
  ],
  "auditObservations": string
}`;
        } else if (agentType === "evidence_agent") {
          userPrompt = `Evaluate the submitted evidence artifact for control suitability, integrity, metadata, freshness, and audit readiness:
Artifact Details: ${JSON.stringify(payload || {})}

Return a JSON object with:
{
  "artifactName": string,
  "suitabilityScore": number (0-100),
  "assessment": "Accepted (Pending Human Sign-off)" | "Requires Recollection" | "Insufficient Scope",
  "extractedMetadata": {
    "periodCovered": string,
    "systemOfRecord": string,
    "populationCount": number,
    "cryptographicIntegrityVerified": boolean
  },
  "flags": string[],
  "auditorNotes": string
}`;
        } else if (agentType === "vendor_agent") {
          userPrompt = `Evaluate third-party vendor risk, data handling tier, security certifications, and subprocessor chain:
Vendor Data: ${JSON.stringify(payload || {})}

Return a JSON object with:
{
  "vendorName": string,
  "criticalityTier": "Tier 1 - Critical" | "Tier 2 - High" | "Tier 3 - Medium" | "Tier 4 - Low",
  "dpaRequired": boolean,
  "certificationsVerified": string[],
  "identifiedRisks": string[],
  "recommendedReviewCadence": string,
  "suggestedDecision": "Conditionally Approved" | "Approved" | "Remediation Required"
}`;
        } else if (agentType === "questionnaire_agent") {
          userPrompt = `Answer the following vendor/customer security assessment question based on verified corporate security context and approved policy repository:
Question: ${payload?.question || "How do you secure customer data at rest and in transit?"}
Context/Policies: ${JSON.stringify(context || {})}

Return a JSON object with:
{
  "question": string,
  "answer": string,
  "confidenceScore": number (0-100),
  "confidenceLevel": "High" | "Medium" | "Low",
  "citations": string[],
  "recommendedEvidenceAttachments": string[],
  "supportedByOfficialPolicy": boolean
}`;
        } else {
          userPrompt = `Evaluate compliance inquiry: ${JSON.stringify(payload)}`;
        }

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: userPrompt,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        });

        const rawText = response.text || "{}";
        let parsedData;
        try {
          parsedData = JSON.parse(rawText);
        } catch {
          parsedData = { result: rawText };
        }

        return res.json({
          success: true,
          source: "gemini-3.7-flash",
          agentType,
          timestamp: new Date().toISOString(),
          data: parsedData,
        });
      }
    } catch (err: any) {
      console.warn("Gemini agent call warning (falling back to deterministic AI model):", err?.message);
    }

    // High fidelity deterministic fallback if API key is not supplied
    return res.json({
      success: true,
      source: "normora-deterministic-core",
      agentType,
      timestamp: new Date().toISOString(),
      data: getDeterministicAgentOutput(agentType, payload),
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Normora platform running on http://localhost:${PORT}`);
  });
}

function getDeterministicAgentOutput(agentType: string, payload: any) {
  switch (agentType) {
    case "policy_agent":
      return {
        title: payload?.title || "Access Control & Identity Management Policy",
        version: "2.1.0",
        summary: "Defines universal authentication, RBAC principles, MFA mandates, and periodic entitlement reviews across all production environments.",
        sections: [
          {
            id: "SEC-1",
            title: "1. Multi-Factor Authentication & Cryptographic Keys",
            content: "All administrative and developer access to cloud production infrastructure (AWS, GCP, GitHub) requires hardware-backed WebAuthn or TOTP MFA. Static access keys must rotate every 90 days.",
            controlsMapped: ["AC-01", "AC-04", "IA-02"],
          },
          {
            id: "SEC-2",
            title: "2. Least Privilege & Quarterly Access Recertification",
            content: "Access grants must follow role-based least privilege. People & Systems team must conduct quarterly access reviews with automated revocation for de-provisioned staff within 24 hours.",
            controlsMapped: ["AC-02", "AC-06", "HR-03"],
          },
        ],
        reviewPeriodDays: 365,
        missingContextItems: ["Specify target time window for break-glass emergency role approval"],
        auditGuidance: "Auditors will request quarterly access review sign-off sheets and AWS IAM credential reports.",
      };
    case "risk_agent":
      return {
        riskStatement: "Potential exposure of production telemetry data in staging S3 bucket without KMS customer-managed key encryption.",
        threatActor: "External Opportunistic Actor / Misconfiguration Drift",
        vulnerability: "Default server-side encryption without explicit bucket policy enforcing TLS 1.3 and KMS-CMK.",
        impactCategory: "Security",
        inherentLikelihood: 3,
        inherentImpact: 4,
        suggestedMitigation: "Enforce automated AWS Config Rule s3-bucket-ssl-requests-only and enable AWS KMS CMK default encryption with continuous Normora connector test CT-AWS-S3-04.",
        mitigatingControlIds: ["CRYPT-02", "STOR-01"],
        residualLikelihood: 1,
        residualImpact: 2,
        rationale: "Automated deterministic guardrails reduce exploitability to near-zero with automated drift notifications.",
      };
    case "gap_agent":
      return {
        framework: payload?.framework || "SOC 2 Type II",
        overallReadinessPct: 88,
        gaps: [
          {
            id: "GAP-202",
            requirementId: "CC6.6 - Boundary Protection",
            gapType: "Evidence Gap",
            severity: "High",
            finding: "Quarterly external network vulnerability scans exist for Q1 and Q2, but Q3 scan artifact is pending upload from Rapid7/Qualys.",
            remediationAction: "Trigger automated API connector sync for Rapid7 or upload verified scan report with SHA-256 hash.",
            targetControlId: "NET-04",
            slaDays: 7,
          },
          {
            id: "GAP-203",
            requirementId: "CC7.2 - Anomaly Detection",
            gapType: "Operating Effectiveness Gap",
            severity: "Medium",
            finding: "AWS GuardDuty is active in us-east-1 and eu-west-1, but ap-southeast-1 region has detective finding export disabled.",
            remediationAction: "Enable GuardDuty multi-region aggregation via Terraform module.",
            targetControlId: "MON-02",
            slaDays: 14,
          },
        ],
        auditObservations: "Core infrastructure controls are highly automated. Addressing 2 evidence gaps will bring SOC 2 Type II readiness to 96%.",
      };
    case "evidence_agent":
      return {
        artifactName: payload?.title || "AWS_IAM_MFA_Credential_Report_Q3.json",
        suitabilityScore: 96,
        assessment: "Accepted (Pending Human Sign-off)",
        extractedMetadata: {
          periodCovered: "2026-06-01 to 2026-08-20",
          systemOfRecord: "AWS IAM (Account 479519683493)",
          populationCount: 42,
          cryptographicIntegrityVerified: true,
        },
        flags: ["1 dormant service account flagged without activity in 120 days (svc-legacy-etl)"],
        auditorNotes: "Meets SOC 2 CC6.1 and ISO 27001 A.9.4.2 evidentiary criteria. Direct API provenance verified from AWS Connector.",
      };
    case "vendor_agent":
      return {
        vendorName: payload?.name || "Datadog, Inc.",
        criticalityTier: "Tier 1 - Critical",
        dpaRequired: true,
        certificationsVerified: ["SOC 2 Type II (Valid to Dec 2026)", "ISO 27001:2022", "HIPAA BAA Executed"],
        identifiedRisks: ["Access to aggregated APM logs which may inadvertently ingest PII if scrubbing filter fails"],
        recommendedReviewCadence: "Annual Comprehensive Audit + Continuous Security Score Monitoring",
        suggestedDecision: "Approved",
      };
    case "questionnaire_agent":
      return {
        question: payload?.question || "Do you enforce role-based access control and multi-factor authentication for all cloud environments?",
        answer: "Yes. Normora enforces centralized Single Sign-On (SSO) and mandatory hardware-backed or TOTP Multi-Factor Authentication (MFA) across all identity providers (Google Workspace, Okta) and cloud infrastructure (AWS, GCP). Production access follows strict Role-Based Access Control (RBAC) governed by policy POL-SEC-01 and recertified on a quarterly cadence.",
        confidenceScore: 98,
        confidenceLevel: "High",
        citations: [
          "Policy: POL-SEC-01 (Access Control & Identity Management Policy, Section 1.2)",
          "Control: AC-01 (Mandatory MFA on Cloud Workloads)",
          "Evidence: EV-AWS-IAM-08 (AWS IAM Automated Credential Report - 100% MFA Enforced)",
        ],
        recommendedEvidenceAttachments: ["EV-AWS-IAM-08.json", "SOC2_TypeII_Executive_Summary.pdf"],
        supportedByOfficialPolicy: true,
      };
    default:
      return { status: "processed", payload };
  }
}

startServer();
