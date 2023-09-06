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
      <ScrollToTop>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <AppProvider>
              <CartProvider>
                <OrderProvider>
                  <App />
                </OrderProvider>
              </CartProvider>
            </AppProvider>
          </StoreProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ScrollToTop>
    </BrowserRouter>
  </React.StrictMode>
)
