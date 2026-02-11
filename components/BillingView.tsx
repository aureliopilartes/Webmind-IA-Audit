import React from 'react';
import { Icons } from './Icons';

// Mock data specific to this view
const MOCK_BILLING = [
  { id: 'INV-2024-001', date: '12 Maio 2024', item: 'Análise Premium - legacy-crm-system', amount: 8000, status: 'Pago' },
  { id: 'INV-2024-002', date: '10 Maio 2024', item: 'Análise Padrão - angola-travel-app', amount: 5000, status: 'Pago' },
  { id: 'INV-2024-003', date: '02 Abril 2024', item: 'Análise Padrão - website-v1', amount: 5000, status: 'Pago' },
  { id: 'INV-2024-004', date: '15 Março 2024', item: 'Análise Premium - finance-dashboard', amount: 8000, status: 'Pago' },
];

export const BillingView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pagamentos e Faturas</h1>
        <p className="text-gray-500">Gerencie seus métodos de pagamento e visualize o histórico de transações.</p>
      </header>
      
      <section className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Icons.CreditCard className="mr-2" size={20}/>
          Métodos de Pagamento
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Credit Card Design */}
          <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-6 text-white shadow-xl group transition-transform hover:-translate-y-1">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-blue-500 opacity-10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col justify-between h-40">
              <div className="flex justify-between items-start">
                <Icons.Zap size={24} className="text-yellow-400" />
                <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/10">Multicaixa Express</span>
              </div>
              
              <div>
                <div className="mb-1 text-gray-400 text-xs uppercase tracking-wider">Número do Cartão</div>
                <div className="text-2xl font-mono tracking-widest text-white/90">•••• •••• •••• 9821</div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                   <div className="text-[10px] text-gray-400 uppercase">Titular</div>
                   <div className="text-sm font-medium">HELDER DAVID</div>
                </div>
                <div>
                   <div className="text-[10px] text-gray-400 uppercase text-right">Expira</div>
                   <div className="text-sm font-medium">12/28</div>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Card */}
          <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-gray-200 flex flex-col justify-center items-center text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group h-full min-h-[220px]">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:scale-110 transition-all">
              <Icons.LayoutGrid size={24} className="text-blue-600"/>
            </div>
            <h3 className="font-semibold text-gray-900">Adicionar novo método</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-[200px]">Suporta cartões VISA, Mastercard e Multicaixa Express</p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Histórico de Transações</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Baixar Todas</button>
        </div>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Descrição</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Valor</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Recibo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_BILLING.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-50 rounded-full text-green-600 border border-green-100">
                        <Icons.CheckCircle2 size={16} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{bill.item}</div>
                        <div className="text-xs text-gray-500 font-mono">{bill.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{bill.date}</td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">{bill.amount.toLocaleString()} KZ</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Icons.Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};