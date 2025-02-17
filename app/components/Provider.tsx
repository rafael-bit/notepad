'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type ProviderProps = {
	children: React.ReactNode
}

const queryClient = new QueryClient()

export default function Provider({ children }: ProviderProps) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
