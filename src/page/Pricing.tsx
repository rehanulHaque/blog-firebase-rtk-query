import { Button } from "@/components/ui/button"

const pricingDetails = [
    {
        id: 1,
        title: "Basic",
        price: 9.99,
        features: [
            {
                id: 1,
                name: "Read Premium Blog Post",
                isAvailable: true
            },
            {
                id: 2,
                name: "Earn money by writing blog",
                isAvailable: true
            },
            {
                id: 3,
                name: "Connect to your custome domain",
                isAvailable: true
            },
        ]
    },
    {
        id: 2,
        title: "Premium",
        price: 19.99,
        features: [
            {
                id: 1,
                name: "Read Premium Blog Post",
                isAvailable: true
            },
            {
                id: 2,
                name: "Earn money by writing blog",
                isAvailable: true
            },
            {
                id: 3,
                name: "Connect to your custome domain",
                isAvailable: true
            },
            {
                id: 4,
                name: "Get 4X more traffic",
                isAvailable: true
            }
        ]
    }
]

export default function Pricing() {
  return (
    <main className="w-full px-4 md:px-0 md:max-w-7xl md:mx-auto">
        <h1 className="text-2xl font-bold text-center">Pricing</h1>
        <p className="mt-4 text-center">To Read Premium Features Please Subscribe</p>
        <div className="flex justify-evenly items-center">
            {pricingDetails.map((detail) => (
                <div key={detail.id} className="mt-8 p-4 shadow-md card bg-white rounded-md">
                    <h1 className="text-xl font-bold">{detail.title}</h1>
                    <h1 className="text-2xl font-bold">${detail.price}</h1>
                    <ul className="mt-4">
                        {detail.features.map((feature) => (
                            <li key={feature.id} className="mt-2">{feature.name}</li>
                        ))}
                    </ul>
                    <Button className="w-full mt-4">Subscribe</Button>
                </div>
            ))}
        </div>
    </main>
  )
}
