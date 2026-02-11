import React, { useState } from 'react';
import { User, Repository, AnalysisResult, AnalysisType, PaymentState, AppView } from './types';
import { analyzeRepository } from './services/geminiService';
import { Sidebar } from './components/Sidebar';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { PaymentModal } from './components/PaymentModal';
import { RepoListView } from './components/RepoListView';
import { HistoryView } from './components/HistoryView';
import { BillingView } from './components/BillingView';
import { LoginView } from './components/LoginView';
import { PlanSelectionView } from './components/PlanSelectionView';
import { LoadingOverlay } from './components/LoadingOverlay';
import { Icons } from './components/Icons';

// --- MOCK DATA ---
const MOCK_REPOS: Repository[] = [
  { id: '1', name: 'finance-dashboard-pro', description: 'Dashboard financeiro corporativo com complexidade alta em states.', language: 'TypeScript', stars: 124, lastUpdated: '2 dias atrás', isPrivate: true },
  { id: '2', name: 'angola-travel-app', description: 'App móvel para turismo em Angola usando React Native.', language: 'JavaScript', stars: 45, lastUpdated: '1 semana atrás', isPrivate: false },
  { id: '3', name: 'express-payment-gateway', description: 'Microserviço de pagamentos integrando Multicaixa Express.', language: 'Node.js', stars: 89, lastUpdated: '4 horas atrás', isPrivate: true },
  { id: '4', name: 'legacy-crm-system', description: 'Sistema antigo de gestão de clientes precisando de refatoração.', language: 'PHP', stars: 12, lastUpdated: '3 anos atrás', isPrivate: true },
  { id: '5', name: 'ai-chat-bot', description: 'Bot de atendimento ao cliente usando Python e LangChain.', language: 'Python', stars: 230, lastUpdated: 'Ontem', isPrivate: false },
];

const MOCK_USER: User = {
  id: 'u1',
  name: 'Helder David',
  email: 'helder@tech.ao',
  avatar: 'https://picsum.photos/200',
  provider: 'github'
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('repos');
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [analysisType, setAnalysisType] = useState<AnalysisType | null>(null);
  const [paymentState, setPaymentState] = useState<PaymentState>({ status: 'idle', amount: 0, reference: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auth Handlers
  const handleLogin = (provider: 'google' | 'github') => {
    // Simulate auth delay
    setTimeout(() => setUser({ ...MOCK_USER, provider }), 800);
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRepo(null);
    setResult(null);
    setCurrentView('repos');
    setIsMobileMenuOpen(false);
  };

  // Payment Handler
  const initiatePayment = (type: AnalysisType) => {
    const amount = type === AnalysisType.BASIC ? 5000 : 8000;
    setAnalysisType(type);
    setPaymentState({ 
      status: 'processing', 
      amount, 
      reference: Math.floor(Math.random() * 100000000).toString() 
    });
    
    // Simulate Payment Success after 2.5s
    setTimeout(() => {
      setPaymentState(prev => ({ ...prev, status: 'success' }));
    }, 2500);
  };

  const finalizePaymentAndStartAnalysis = async () => {
    if (!selectedRepo || !analysisType) return;
    
    setPaymentState({ status: 'idle', amount: 0, reference: '' });
    setIsAnalyzing(true);
    
    try {
      const data = await analyzeRepository(selectedRepo, analysisType);
      setResult(data);
    } catch (e) {
      console.error(e);
      // Ensure we don't get stuck in loading state on error
      setIsAnalyzing(false); 
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 1. Unauthenticated View
  if (!user) {
    return <LoginView onLogin={handleLogin} />;
  }

  // 2. Authenticated Layout
  return (
    <div className="flex min-h-screen bg-gray-50/50 font-sans">
      <Sidebar 
        user={user} 
        onLogout={handleLogout} 
        currentView={currentView} 
        onChangeView={(view) => {
          setCurrentView(view);
          setSelectedRepo(null);
          setResult(null);
        }}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto h-screen relative">
        {/* Mobile Header (Visible only on small screens) */}
        <div className="md:hidden flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
             <button 
               onClick={() => setIsMobileMenuOpen(true)}
               className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
             >
               <Icons.Menu size={24} />
             </button>
             <span className="font-bold text-lg text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
               WebMind IA
             </span>
          </div>
          <img src={user.avatar} className="w-8 h-8 rounded-full border border-gray-200" alt="profile" />
        </div>

        {/* --- DYNAMIC VIEW SWITCHING --- */}
        
        {currentView === 'history' ? (
          <HistoryView />
        ) : currentView === 'billing' ? (
           <BillingView />
        ) : !selectedRepo ? (
          <RepoListView repos={MOCK_REPOS} onSelectRepo={setSelectedRepo} />
        ) : !result ? (
          <PlanSelectionView 
            repo={selectedRepo} 
            selectedPlan={analysisType}
            onSelectPlan={initiatePayment}
            onBack={() => setSelectedRepo(null)}
          />
        ) : (
          <AnalysisDashboard 
            repo={selectedRepo} 
            result={result} 
            onBack={() => { setSelectedRepo(null); setResult(null); }}
            onNewAnalysis={() => { setSelectedRepo(null); setResult(null); }}
          />
        )}
      </main>

      {/* --- OVERLAYS --- */}
      
      <PaymentModal 
        paymentState={paymentState} 
        onConfirm={finalizePaymentAndStartAnalysis} 
      />

      {isAnalyzing && <LoadingOverlay />}
    </div>
  );
};

export default App;