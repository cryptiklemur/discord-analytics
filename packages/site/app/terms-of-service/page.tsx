import { LegalLayout } from "@/components/legal-layout"

export default function TermsOfService() {
	return (
		<LegalLayout title="Terms of Service" lastUpdated="January 2025">
			<div className="space-y-8 text-gray-300">
				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
					<p>
						By accessing and using Discord Analytics ("the Service"), you accept and agree to be bound by the terms and
						provision of this agreement. If you do not agree to abide by the above, please do not use this service.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
					<p>
						Discord Analytics provides analytics and insights for Discord servers. The Service allows server owners to
						track member engagement, message activity, and other server metrics through our dashboard interface.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
					<p>
						To access certain features of the Service, you must create an account by connecting your Discord account.
						You are responsible for maintaining the confidentiality of your account credentials and for all activities
						that occur under your account.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">4. Data Collection and Usage</h2>
					<p>
						By using our Service, you authorize us to collect and analyze data from your Discord server(s) for the
						purpose of providing analytics insights. We collect only the data necessary to provide our services,
						including:
					</p>
					<ul className="list-disc pl-6 mt-2 space-y-1">
						<li>Server member counts and activity metrics</li>
						<li>Message volume and engagement statistics</li>
						<li>Channel usage patterns</li>
						<li>Public server information</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">5. Subscription and Billing</h2>
					<p>
						Certain features of the Service require a paid subscription. Subscription fees are billed in advance on a
						monthly or annual basis. You may cancel your subscription at any time, but no refunds will be provided for
						partial billing periods.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">6. Prohibited Uses</h2>
					<p>You may not use the Service:</p>
					<ul className="list-disc pl-6 mt-2 space-y-1">
						<li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
						<li>
							To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances
						</li>
						<li>
							To infringe upon or violate our intellectual property rights or the intellectual property rights of others
						</li>
						<li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
						<li>To submit false or misleading information</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
					<p>
						In no event shall Discord Analytics, nor its directors, employees, partners, agents, suppliers, or
						affiliates, be liable for any indirect, incidental, punitive, consequential, or special damages arising out
						of or related to your use of the Service.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">8. Termination</h2>
					<p>
						We may terminate or suspend your account and bar access to the Service immediately, without prior notice or
						liability, under our sole discretion, for any reason whatsoever including but not limited to a breach of the
						Terms.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">9. Changes to Terms</h2>
					<p>
						We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
						material, we will provide at least 30 days notice prior to any new terms taking effect.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">10. Contact Information</h2>
					<p>
						If you have any questions about these Terms of Service, please contact us at legal@discordanalytics.com.
					</p>
				</section>
			</div>
		</LegalLayout>
	)
}
