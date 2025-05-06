import PublicLayout from "@/components/public-layout"

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">About Coin</h1>

        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Coin is a platform that allows you to invest in direct mutual funds with zero commission. We believe in
            making investing simple, transparent, and accessible to everyone.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
          <p>
            Our mission is to democratize investing by providing a platform that is easy to use, transparent, and helps
            you make informed investment decisions.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Why Choose Coin?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Zero commission direct mutual funds</li>
            <li>Simple and intuitive interface</li>
            <li>Transparent fee structure</li>
            <li>Curated list of mutual funds</li>
            <li>Detailed analytics and insights</li>
            <li>Secure and reliable platform</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>
          <p>
            We are a team of passionate individuals who believe in the power of investing. Our team consists of
            experienced professionals from the finance and technology industries.
          </p>
        </div>
      </div>
    </PublicLayout>
  )
}
