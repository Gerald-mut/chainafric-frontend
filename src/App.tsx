
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Index from "./pages/Index";
import ExplorePage from "./pages/ExplorePage";
import DashboardPage from "./pages/DashboardPage";
import AddressPage from "./pages/AddressPage";
import TransactionPage from "./pages/TransactionPage";
import NotFound from "./pages/NotFound";
import ThemeProvider from "./providers/ThemeProvider";
import { WalletProvider } from "./providers/WalletProvider";

// Create the query client outside the component
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <WalletProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/address/:address" element={<AddressPage />} />
                    <Route path="/tx/:txHash" element={<TransactionPage />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </TooltipProvider>
              </WalletProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
