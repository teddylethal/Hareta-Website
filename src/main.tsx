import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './index.css'
import { AppProvider } from './contexts/app.context'
import { StoreProvider } from './contexts/store.context'
import { CartProvider } from './contexts/cart.context'
import ScrollToTop from './ScrollToTop'
import { OrderProvider } from './contexts/order.context'
import ErrorBoundary from './components/ErrorBoundary'
import 'src/i18n/i18n'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ScrollToTop>
          <QueryClientProvider client={queryClient}>
            <StoreProvider>
              <AppProvider>
                <CartProvider>
                  <OrderProvider>
                    <ErrorBoundary>
                      <App />
                    </ErrorBoundary>
                  </OrderProvider>
                </CartProvider>
              </AppProvider>
            </StoreProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ScrollToTop>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
)
