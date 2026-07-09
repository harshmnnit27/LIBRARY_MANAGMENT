import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { payFine } from "../store/slices/borrowSlice";
import { X, CreditCard, Banknote, Loader2, CheckCircle } from "lucide-react";

const PaymentModal = ({ book, onClose }) => {
  const dispatch = useDispatch();
  const [method, setMethod] = useState("Online");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Dispatch Redux action
      dispatch(payFine({ bookId: book.bookId, paymentMethod: method }));
      
      // Close modal after showing success
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-800">Settle Late Fee</h3>
          <button 
            onClick={onClose}
            disabled={isProcessing || isSuccess}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Payment Successful!</h4>
              <p className="text-slate-500 mt-1">Thank you for settling your fine.</p>
            </div>
          ) : (
            <>
              <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-amber-800">Book</span>
                  <span className="text-sm font-bold text-slate-800">{book.bookTitle}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-amber-800">Total Due</span>
                  <span className="text-2xl font-black text-amber-600">₹{book.fineAmount}</span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Select Payment Method</h4>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setMethod("Online")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    method === "Online" 
                      ? "border-blue-500 bg-blue-50 text-blue-700" 
                      : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <CreditCard className="w-8 h-8 mb-2" />
                  <span className="font-semibold text-sm">Pay Online</span>
                </button>

                <button
                  onClick={() => setMethod("Cash")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    method === "Cash" 
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700" 
                      : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <Banknote className="w-8 h-8 mb-2" />
                  <span className="font-semibold text-sm">Pay Cash</span>
                </button>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className={`w-full py-3 px-4 rounded-xl text-white font-bold text-lg flex items-center justify-center transition-all ${
                  method === "Online" ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20" : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
                } shadow-lg disabled:opacity-70`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ₹${book.fineAmount} Now`
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
