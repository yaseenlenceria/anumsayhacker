import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, Shield, Headphones, Play, DollarSign } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Trading?</h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of successful traders using our professional signal service with proven high accuracy rates.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-dark-secondary p-6 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Rocket className="text-white h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Instant Setup</h3>
            <p className="text-gray-400 text-sm">Get started in under 2 minutes with our easy setup process.</p>
          </div>
          
          <div className="bg-dark-secondary p-6 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Shield className="text-black h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">89%+ Success Rate</h3>
            <p className="text-gray-400 text-sm">Proven track record with consistently high winning rates.</p>
          </div>
          
          <div className="bg-dark-secondary p-6 rounded-xl border border-gray-700">
            <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Headphones className="text-white h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-400 text-sm">Professional support team available around the clock.</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 h-auto text-lg">
            <Play className="mr-2 h-4 w-4" />
            Start Free Trial
          </Button>
          <Link href="/pricing">
            <Button variant="outline" className="border-gray-600 hover:border-gray-500 text-white px-8 py-4 h-auto text-lg">
              <DollarSign className="mr-2 h-4 w-4" />
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
