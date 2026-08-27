import React, { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { OverviewView } from "./components/views/OverviewView";
import { ContextView } from "./components/views/ContextView";
import { ControlsView } from "./components/views/ControlsView";
import { ConnectorsView } from "./components/views/ConnectorsView";
import { EvidenceView } from "./components/views/EvidenceView";
import { AgentsView } from "./components/views/AgentsView";
import { RiskView } from "./components/views/RiskView";
import { AuditView } from "./components/views/AuditView";
import { TrustCenterView } from "./components/views/TrustCenterView";
import { PoliciesView } from "./components/views/PoliciesView";
import { OperationsView } from "./components/views/OperationsView";
import { TrainingView } from "./components/views/TrainingView";
import { PartnerView } from "./components/views/PartnerView";
import { NotificationCenterModal } from "./components/modals/NotificationCenterModal";
import { ContextDiscoveryModal } from "./components/modals/ContextDiscoveryModal";
import { BetaAccessModal } from "./components/marketing/interactive/BetaAccessModal";

// Public Marketing Website Components
import { MarketingHeader } from "./components/marketing/MarketingHeader";
import { MarketingFooter } from "./components/marketing/MarketingFooter";
import { HomeMarketingView } from "./components/marketing/HomeMarketingView";
import { AuthView } from "./components/marketing/AuthView";
import { PlatformMarketingView } from "./components/marketing/PlatformMarketingView";
import { SubPageView } from "./components/marketing/SubPageView";

import {
  initialContextProfile,
  initialFrameworks,
  initialControls,
  initialConnectors,
  initialEvidence,
  initialAgentRuns,
  initialRisks,
  initialVendors,
  initialAudits,
  initialPolicies,
  initialTests,
  initialPartnerClients,
  initialTrainingCourses,
  initialNotifications,
  initialAssets,
} from "./data/mockData";
import {
  ProductModule,
  ContextProfile,
  UniversalControl,
  Connector,
  EvidenceArtifact,
  AgentRunRecord,
  RiskItem,
  VendorItem,
  AutomatedTest,
} from "./types/grc";

import { ArrowLeft, Sparkles, RefreshCw, Calendar } from "lucide-react";
import { CONFIG } from "./lib/config";

export default function App() {
  // Navigation Routing State
  const [currentRoute, setCurrentRoute] = useState<string>("/");
  
  // App Portal States
  const [activeModule, setActiveModule] = useState<ProductModule>("overview");
  const [currentRole, setCurrentRole] = useState<string>("Compliance Admin");
  const [isAuditorMode, setIsAuditorMode] = useState<boolean>(false);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [activeTenantId, setActiveTenantId] = useState<string>("TENANT-NORTHSTAR");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState<boolean>(false);
  const [isBetaModalOpen, setIsBetaModalOpen] = useState<boolean>(false);

  // Core Data States
  const [context, setContext] = useState<ContextProfile>(initialContextProfile);
  const [frameworks, setFrameworks] = useState(initialFrameworks);
  const [controls, setControls] = useState<UniversalControl[]>(initialControls);
  const [connectors, setConnectors] = useState<Connector[]>(initialConnectors);
  const [evidence, setEvidence] = useState<EvidenceArtifact[]>(initialEvidence);
  const [agentRuns, setAgentRuns] = useState<AgentRunRecord[]>(initialAgentRuns);
  const [risks, setRisks] = useState<RiskItem[]>(initialRisks);
  const [vendors, setVendors] = useState<VendorItem[]>(initialVendors);
  const [audits, setAudits] = useState(initialAudits);
  const [policies, setPolicies] = useState(initialPolicies);
  const [tests, setTests] = useState<AutomatedTest[]>(initialTests);
  const [partnerClients, setPartnerClients] = useState(initialPartnerClients);
  const [trainingCourses, setTrainingCourses] = useState(initialTrainingCourses);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [assets, setAssets] = useState(initialAssets);

  // Reset Demo State
  const handleResetDemo = () => {
    setContext(initialContextProfile);
    setFrameworks(initialFrameworks);
    setControls(initialControls);
    setConnectors(initialConnectors);
    setEvidence(initialEvidence);
    setAgentRuns(initialAgentRuns);
    setRisks(initialRisks);
    setVendors(initialVendors);
    setAudits(initialAudits);
    setPolicies(initialPolicies);
    setTests(initialTests);
    setPartnerClients(initialPartnerClients);
    setTrainingCourses(initialTrainingCourses);
    setNotifications(initialNotifications);
    setAssets(initialAssets);
    setActiveTenantId("TENANT-NORTHSTAR");
    setActiveModule("overview");
  };

  const handleSelectTenant = (tenantId: string) => {
    setActiveTenantId(tenantId);
    const client = partnerClients.find((c) => c.id === tenantId);
    if (client) {
      setContext((prev) => ({
        ...prev,
        companyName: client.name,
        tradingName: client.name.split(" ")[0],
        businessModel: client.industry,
      }));
    }
  };

  const activeTenantName = partnerClients.find((c) => c.id === activeTenantId)?.name || "Northstar Health AI";
  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  // Route Dispatcher
  const navigateTo = (path: string) => {
    // If navigating to /demo or portal
    if (path === "/demo") {
      setIsDemoMode(true);
      setCurrentRoute("/demo");
    } else if (path.startsWith("/app")) {
      setIsDemoMode(false);
      setCurrentRoute("/app");
    } else {
      setCurrentRoute(path);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handlers for Data Mutations
  const handleSaveContext = (updated: ContextProfile) => setContext(updated);
  const handleAddControl = (newCtrl: UniversalControl) => setControls((prev) => [newCtrl, ...prev]);
  const handleSyncConnector = (connId: string) => {
    setConnectors((prev) =>
      prev.map((c) => {
        if (connId === "all" || c.id === connId) {
          return {
            ...c,
            lastSync: "Just now",
            status: "Connected",
            assetsDiscovered: c.assetsDiscovered + Math.floor(Math.random() * 5 + 1),
          };
        }
        return c;
      })
    );
  };
  const handleAddEvidence = (newArt: EvidenceArtifact) => setEvidence((prev) => [newArt, ...prev]);
  const handleAddAgentRun = (run: AgentRunRecord) => setAgentRuns((prev) => [run, ...prev]);
  const handleApproveRun = (runId: string) => {
    setAgentRuns((prev) => prev.map((r) => (r.id === runId ? { ...r, status: "Approved" } : r)));
  };
  const handleRejectRun = (runId: string) => {
    setAgentRuns((prev) => prev.map((r) => (r.id === runId ? { ...r, status: "Rejected" } : r)));
  };
  const handleAddRisk = (newRisk: RiskItem) => setRisks((prev) => [newRisk, ...prev]);
  const handleAddVendor = (newVendor: VendorItem) => setVendors((prev) => [newVendor, ...prev]);
  const handleTriggerTest = (testId: string) => {
    setTests((prev) =>
      prev.map((t) => (t.id === testId ? { ...t, lastRun: "Just now", result: "PASS" } : t))
    );
  };

  const pendingReviewsCount = agentRuns.filter((r) => r.status === "Needs Review").length;

  /* -------------------------------------------------------------
     RENDER: INTERACTIVE DEMO OR AUTHENTICATED PORTAL WORKSPACE
  ------------------------------------------------------------- */
  if (currentRoute === "/demo" || currentRoute === "/app") {
    return (
      <div className="bg-white text-slate-900 h-screen w-full flex flex-col overflow-hidden font-sans border-t-4 border-slate-900 selection:bg-slate-900 selection:text-white">
        {/* Persistent Demo Warning / Navigation Bar */}
        {currentRoute === "/demo" && (
          <div className="bg-slate-950 text-white px-6 py-2 flex items-center justify-between text-xs font-mono border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-wider text-[10px] border border-emerald-500/30">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Demo Workspace • Synthetic Data (Northstar Health AI)
              </span>
              <span className="text-slate-400 hidden md:inline">
                Read-only evaluation tour with safe simulated workflows.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleResetDemo}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Reset synthetic data state"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Demo</span>
              </button>

              <a
                href={CONFIG.BOOK_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 rounded bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                <Calendar className="w-3 h-3" />
                <span>Book Guided Demo</span>
              </a>

              <button
                onClick={() => navigateTo("/")}
                className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-300 hover:text-white cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Exit Demo</span>
              </button>
            </div>
          </div>
        )}

        {/* Top Application Header */}
        <Header
          activeModule={activeModule}
          currentRole={currentRole}
          onRoleChange={(role) => {
            setCurrentRole(role);
            if (role === "Auditor (Read-Only)") {
              setIsAuditorMode(true);
              setActiveModule("audit");
            } else if (role === "Employee") {
              setIsAuditorMode(false);
              setActiveModule("training");
            } else {
              setIsAuditorMode(false);
            }
          }}
          onOpenTrustCenter={() => setActiveModule("trust")}
          onOpenAIQuickRun={() => setActiveModule("agents")}
          isAuditorMode={isAuditorMode}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadNotificationsCount={unreadNotifCount}
          activeTenantName={activeTenantName}
          onOpenDiscovery={() => setIsDiscoveryOpen(true)}
        />

        <div className="flex flex-1 w-full overflow-hidden">
          {/* Left Module Navigation */}
          <Sidebar
            activeModule={activeModule}
            onSelectModule={(mod) => setActiveModule(mod)}
            pendingReviewsCount={pendingReviewsCount}
            onQuickAudit={() => setActiveModule("audit")}
          />

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col h-full overflow-y-auto bg-white">
            <div className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
              {activeModule === "overview" && (
                <OverviewView
                  context={context}
                  frameworks={frameworks}
                  controls={controls}
                  connectors={connectors}
                  evidence={evidence}
                  tests={tests}
                  agentRuns={agentRuns}
                  onNavigate={(mod) => setActiveModule(mod)}
                />
              )}

              {activeModule === "context" && (
                <ContextView
                  context={context}
                  frameworks={frameworks}
                  onSaveContext={handleSaveContext}
                />
              )}

              {activeModule === "controls" && (
                <ControlsView
                  controls={controls}
                  frameworks={frameworks}
                  onAddControl={handleAddControl}
                />
              )}

              {activeModule === "connect" && (
                <ConnectorsView
                  connectors={connectors}
                  onSyncConnector={handleSyncConnector}
                />
              )}

              {activeModule === "evidence" && (
                <EvidenceView
                  evidence={evidence}
                  controls={controls}
                  onAddEvidence={handleAddEvidence}
                />
              )}

              {activeModule === "agents" && (
                <AgentsView
                  agentRuns={agentRuns}
                  context={context}
                  onApproveRun={handleApproveRun}
                  onRejectRun={handleRejectRun}
                  onAddAgentRun={handleAddAgentRun}
                />
              )}

              {activeModule === "risk" && (
                <RiskView
                  risks={risks}
                  vendors={vendors}
                  onAddRisk={handleAddRisk}
                  onAddVendor={handleAddVendor}
                />
              )}

              {activeModule === "audit" && (
                <AuditView
                  audits={audits}
                  evidence={evidence}
                  isAuditorMode={isAuditorMode}
                  onToggleAuditorMode={() => setIsAuditorMode((prev) => !prev)}
                />
              )}

              {activeModule === "trust" && (
                <TrustCenterView
                  frameworks={frameworks}
                  vendors={vendors}
                />
              )}

              {activeModule === "policies" && (
                <PoliciesView
                  policies={policies}
                  onOpenPolicyAgent={() => {
                    setActiveModule("agents");
                  }}
                />
              )}

              {activeModule === "operations" && (
                <OperationsView
                  tests={tests}
                  onTriggerTest={handleTriggerTest}
                  assets={assets}
                />
              )}

              {activeModule === "training" && (
                <TrainingView
                  courses={trainingCourses}
                  policies={policies}
                  userRole={currentRole}
                />
              )}

              {activeModule === "partner" && (
                <PartnerView
                  clients={partnerClients}
                  activeTenantId={activeTenantId}
                  onSelectTenant={handleSelectTenant}
                />
              )}
            </div>

            {/* Minimalist Operational Status Footer */}
            <footer className="h-8 bg-slate-50 border-t border-slate-100 px-8 flex items-center justify-between text-[9px] font-mono text-slate-400 uppercase tracking-widest shrink-0">
              <span>Normora Orchestrator v1.0.4 • {currentRoute === "/demo" ? "DEMO MODE (SYNTHETIC)" : "TENANT ACTIVE"} • {activeTenantName}</span>
              <button onClick={() => navigateTo("/")} className="hover:text-slate-900 underline cursor-pointer">
                Visit Normora Website
              </button>
            </footer>
          </main>
        </div>

        {/* Modals */}
        <NotificationCenterModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onNavigateToModule={(mod) => setActiveModule(mod)}
        />

        <ContextDiscoveryModal
          isOpen={isDiscoveryOpen}
          onClose={() => setIsDiscoveryOpen(false)}
          currentProfile={context}
          onSaveProfile={handleSaveContext}
        />
      </div>
    );
  }

  /* -------------------------------------------------------------
     RENDER: PUBLIC MARKETING WEBSITE ROUTING
  ------------------------------------------------------------- */
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Global Marketing Navigation Header */}
      <MarketingHeader
        currentPath={currentRoute}
        onNavigate={navigateTo}
        onRequestBetaAccess={() => setIsBetaModalOpen(true)}
      />

      <main className="flex-1">
        {/* Homepage Route */}
        {currentRoute === "/" && (
          <HomeMarketingView
            onNavigate={navigateTo}
            onRequestBetaAccess={() => setIsBetaModalOpen(true)}
          />
        )}

        {/* Authentication Routes */}
        {currentRoute === "/auth/login" && (
          <AuthView
            mode="login"
            onNavigate={navigateTo}
            onSuccessAuth={() => navigateTo("/app")}
          />
        )}
        {currentRoute === "/auth/signup" && (
          <AuthView
            mode="signup"
            onNavigate={navigateTo}
            onSuccessAuth={() => navigateTo("/app")}
          />
        )}

        {/* Platform Overview & Module Pages */}
        {currentRoute === "/platform" && (
          <PlatformMarketingView onNavigate={navigateTo} />
        )}
        {currentRoute.startsWith("/platform/") && (
          <PlatformMarketingView
            currentModuleId={currentRoute.replace("/platform/", "")}
            onNavigate={navigateTo}
          />
        )}

        {/* Solutions Routes */}
        {currentRoute === "/solutions/ai-companies" && (
          <SubPageView type="solutions" subSlug="ai-companies" onNavigate={navigateTo} />
        )}
        {currentRoute === "/solutions/healthcare-saas" && (
          <SubPageView type="solutions" subSlug="healthcare-saas" onNavigate={navigateTo} />
        )}
        {currentRoute === "/solutions/b2b-saas" && (
          <SubPageView type="solutions" subSlug="b2b-saas" onNavigate={navigateTo} />
        )}
        {currentRoute === "/solutions/consultants" && (
          <SubPageView type="solutions" subSlug="consultants" onNavigate={navigateTo} />
        )}

        {/* Frameworks Routes */}
        {currentRoute === "/frameworks" && (
          <SubPageView type="frameworks" onNavigate={navigateTo} />
        )}
        {currentRoute.startsWith("/frameworks/") && (
          <SubPageView
            type="frameworks"
            subSlug={currentRoute.replace("/frameworks/", "")}
            onNavigate={navigateTo}
          />
        )}

        {/* Integrations Library */}
        {currentRoute === "/integrations" && (
          <SubPageView type="integrations" onNavigate={navigateTo} />
        )}

        {/* Resources Knowledge Center */}
        {currentRoute === "/resources" && (
          <SubPageView type="resources" onNavigate={navigateTo} />
        )}
        {currentRoute.startsWith("/resources/") && (
          <SubPageView
            type="resources"
            subSlug={currentRoute.replace("/resources/", "")}
            onNavigate={navigateTo}
          />
        )}

        {/* Pricing, Security, Trust, Contact */}
        {currentRoute === "/pricing" && (
          <SubPageView type="pricing" onNavigate={navigateTo} />
        )}
        {currentRoute === "/security" && (
          <SubPageView type="security" onNavigate={navigateTo} />
        )}
        {currentRoute === "/trust" && (
          <SubPageView type="trust" onNavigate={navigateTo} />
        )}
        {currentRoute === "/contact" && (
          <SubPageView type="contact" onNavigate={navigateTo} />
        )}
      </main>

      {/* Global Marketing Footer */}
      <MarketingFooter onNavigate={navigateTo} />

      {/* Interactive Beta Access Modal */}
      <BetaAccessModal
        isOpen={isBetaModalOpen}
        onClose={() => setIsBetaModalOpen(false)}
        onNavigate={navigateTo}
      />
    </div>
  );
}
