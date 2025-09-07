import { LegalLayout } from "@/components/legal-layout"

export default function PrivacyPolicy() {
	return (
		<LegalLayout title="Privacy Policy" lastUpdated="January 2025">
			<div className="space-y-8 text-gray-300">
				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
					<p>
						We collect information you provide directly to us, such as when you create an account, connect your Discord
						server, or contact us for support.
					</p>

					<h3 className="text-xl font-medium text-white mt-6 mb-3">Account Information</h3>
					<ul className="list-disc pl-6 space-y-1">
						<li>Discord user ID and username</li>
						<li>Email address (if provided by Discord)</li>
						<li>Profile picture and display name</li>
					</ul>

					<h3 className="text-xl font-medium text-white mt-6 mb-3">Server Data</h3>
					<ul className="list-disc pl-6 space-y-1">
						<li>Server member counts and growth metrics</li>
						<li>Message volume and activity patterns</li>
						<li>Channel usage statistics</li>
						<li>Public server information (name, icon, member count)</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
					<p>We use the information we collect to:</p>
					<ul className="list-disc pl-6 mt-2 space-y-1">
						<li>Provide, maintain, and improve our analytics services</li>
						<li>Generate insights and reports about your Discord server</li>
						<li>Process transactions and send related information</li>
						<li>Send technical notices, updates, security alerts, and support messages</li>
						<li>Respond to your comments, questions, and customer service requests</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
					<p>
						We do not sell, trade, or otherwise transfer your personal information to third parties. We may share your
						information in the following circumstances:
					</p>
					<ul className="list-disc pl-6 mt-2 space-y-1">
						<li>With your consent or at your direction</li>
						<li>To comply with legal obligations</li>
						<li>To protect our rights, privacy, safety, or property</li>
						<li>With service providers who assist in our operations</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
					<p>
						We implement appropriate technical and organizational measures to protect your personal information against
						unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
						internet is 100% secure.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">5. Data Retention</h2>
					<p>
						We retain your information for as long as your account is active or as needed to provide you services. We
						may retain certain information for legitimate business purposes or as required by law.
					</p>

					<h3 className="text-xl font-medium text-white mt-6 mb-3">Retention Periods by Plan</h3>
					<ul className="list-disc pl-6 space-y-1">
						<li>
							<strong>Personal:</strong> 30 days of historical data
						</li>
						<li>
							<strong>Starter:</strong> 90 days of historical data
						</li>
						<li>
							<strong>Growth:</strong> 1 year of historical data
						</li>
						<li>
							<strong>Professional:</strong> 2 years of historical data
						</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
					<p>You have the right to:</p>
					<ul className="list-disc pl-6 mt-2 space-y-1">
						<li>Access and update your personal information</li>
						<li>Delete your account and associated data</li>
						<li>Export your data in a portable format</li>
						<li>Opt out of certain communications</li>
						<li>Request correction of inaccurate information</li>
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">7. Cookies and Tracking</h2>
					<p>
						We use cookies and similar tracking technologies to collect and use personal information about you.
						Essential cookies are necessary for the website to function, while analytics cookies help us understand how
						you use our service.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">8. Third-Party Services</h2>
					<p>
						Our service integrates with Discord's API and may use other third-party services. These services have their
						own privacy policies, and we encourage you to review them.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">9. Children's Privacy</h2>
					<p>
						Our service is not intended for children under 13 years of age. We do not knowingly collect personal
						information from children under 13.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">10. Changes to This Policy</h2>
					<p>
						We may update this privacy policy from time to time. We will notify you of any changes by posting the new
						policy on this page and updating the "Last updated" date.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold text-white mb-4">11. Contact Us</h2>
					<p>If you have any questions about this Privacy Policy, please contact us at privacy@discordanalytics.com.</p>
				</section>
			</div>
		</LegalLayout>
	)
}
