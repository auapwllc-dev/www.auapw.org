import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

import { BrandLogosSection } from "@/components/brand-logos"

export const metadata = {
  title: "Shipping Policy | AUAPW.ORG",
  description: "AUAPW.ORG shipping policy, rates, and delivery information for used auto parts.",
}

export default function ShippingPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[58px]">
        <div className="mx-auto max-w-[900px] px-6 py-16">
          <div className="prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-8">Shipping Policy</h1>

            <h2 className="text-2xl font-bold mt-8 mb-4">Shipping Rates</h2>
            <p className="mb-4">All parts are shipped via FEDEX, UPS, or USPS depending on size and weight. Shipping costs are calculated based on:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Part weight and dimensions</li>
              <li>Destination zip code</li>
              <li>Carrier selection for fastest delivery</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Delivery Timeframes</h2>
            <table className="w-full border border-border text-sm mb-6">
              <thead>
                <tr className="bg-secondary">
                  <th className="border border-border p-3 text-left">Service Level</th>
                  <th className="border border-border p-3 text-left">Timeframe</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Standard Shipping</td>
                  <td className="border border-border p-3">5-7 Business Days</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Express Shipping</td>
                  <td className="border border-border p-3">2-3 Business Days</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Overnight Shipping</td>
                  <td className="border border-border p-3">Next Business Day</td>
                </tr>
              </tbody>
            </table>

            <h2 className="text-2xl font-bold mt-8 mb-4">Tracking</h2>
            <p className="mb-4">All shipments include tracking numbers sent via email. You can track your order status in real-time through our website or directly with the carrier.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Packaging</h2>
            <p className="mb-4">All parts are professionally packaged with protective materials to ensure safe delivery. We take great care to prevent damage during transit.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">International Shipping</h2>
            <p className="mb-4">At this time, we only ship to addresses within the United States. For international inquiries, please contact our team at aupworld@gmail.com.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Signature Requirements</h2>
            <p className="mb-4">High-value items (over $1,000) require signature upon delivery for proof of delivery and insurance purposes.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Liability</h2>
            <p className="mb-4">While we take every precaution to ensure safe delivery, AUAPW is not liable for damage caused by carrier negligence. We recommend purchasing additional shipping insurance for high-value items.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
            <p className="mb-4">For shipping inquiries, contact us at aupworld@gmail.com or (888) 818-5001.</p>
          </div>
        </div>
        <BrandLogosSection />
      </main>
      <Footer />
    </>
  )
}
