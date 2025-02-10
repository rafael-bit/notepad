import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex justify-center items-center min-h-screen w-full bg-gray-100">{children}</main>
	)
}