import type React from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface LegalLayoutProps {
	title: string
	lastUpdated: string
	children: React.ReactNode
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
	return (
		<div className="min-h-screen bg-gray-950">
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<div className="mb-8">
					<Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6">
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Home
					</Link>
					<h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
					<p className="text-gray-400">Last updated: {lastUpdated}</p>
				</div>

				<div className="prose prose-invert prose-blue max-w-none">
					<div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8">{children}</div>
				</div>
			</div>
		</div>
	)
}
