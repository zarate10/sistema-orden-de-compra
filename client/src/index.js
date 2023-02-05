import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Main } from './components/Main'

const queryClient = new QueryClient()
const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

root.render(
    <QueryClientProvider client={queryClient}>
        <Main />
    </QueryClientProvider>
)