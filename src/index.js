import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import UserContextProvider, { UserContext } from './Context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
    <QueryClientProvider client={queryClient}>
        <UserContextProvider>
            <App />
                    <ReactQueryDevtools initialIsOpen={false} />

        </UserContextProvider>
    </QueryClientProvider>
    
    
);

