"use client"

import { useState, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const Provider = ({ children }: { children: ReactNode }) => {
    const [client] = useState(new QueryClient())

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
} 

export default Provider;