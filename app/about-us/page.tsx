import { Badge } from "@/components/ui/badge";
import { Shield, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 z-0"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-6 bg-blue-500/20 text-blue-200 hover:bg-blue-500/30 border-none">
            Our Story
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Book Kart
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Book Kart is India's premier platform for buying and selling new and
            used books. We believe that every book deserves a reader.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-lg text-gray-600">
                Our mission is to make knowledge accessible and affordable for
                everyone. We want to create a sustainable cycle of reading by
                facilitating the easy exchange of pre-loved books.
              </p>
              <p className="text-gray-600">
                Data shows that millions of books go to waste every year. By
                building a community of book lovers, we give these books a
                second life and help students and readers save money.
              </p>
            </div>
            <div className="bg-gray-100 rounded-2xl h-[400px] flex items-center justify-center">
              {/* Placeholder for About Us Image */}
              <span className="text-gray-400 font-medium text-lg">
                About Us Image
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are committed to providing the best experience for our
              community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trust & Security</h3>
              <p className="text-gray-600">
                Every seller is verified, and payments are secure. We ensure a
                safe environment for all transactions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community First</h3>
              <p className="text-gray-600">
                We're building a community of readers. Join thousands of
                students and book enthusiasts across India.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainability</h3>
              <p className="text-gray-600">
                By choosing used books, you're reducing waste and contributing
                to a greener planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Team or CTA could go here */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Join the Revolution</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start selling your old books today or find your next read at an
            unbeatable price.
          </p>
          {/* <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Get Started</Button> */}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
