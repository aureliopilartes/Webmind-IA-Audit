import React from 'react';
import { PaymentState, AnalysisType } from '../types';
import { Icons } from './Icons';

interface PaymentModalProps {
  paymentState: PaymentState;
  onConfirm: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ paymentState, onConfirm }) => {
  if (paymentState.status === 'idle') return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-8 text-center shadow-2xl animate-in fade-in zoom-in-95 relative overflow-hidden">
        {paymentState.status === 'processing' ? (
          <>
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
              <Icons.Loader2 className="animate-spin text-blue-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 relative z-10">Aguardando Pagamento</h3>
            <p className="text-gray-500 text-sm mb-6 relative z-10">
              Por favor, confirme a transação no seu aplicativo Multicaixa Express.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 relative z-10">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Referência</div>
              <div className="text-xl font-mono font-bold text-gray-900 tracking-widest">{paymentState.reference}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide mt-3 mb-1">Valor</div>
              <div className="text-lg font-bold text-blue-600">{paymentState.amount.toLocaleString()} KZ</div>
            </div>
            {/* Visual Flair */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          </>
        ) : paymentState.status === 'success' ? (
          <>
             <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icons.CheckCircle2 className="text-green-500 w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Pagamento Confirmado!</h3>
            <p className="text-gray-500 text-sm mb-6">
              Transação processada com sucesso. Iniciando auditoria.
            </p>
            <button 
              onClick={onConfirm}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/20"
            >
              Iniciar Análise
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};