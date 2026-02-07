import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  DollarSign,
  Search,
  ShoppingCart,
  Truck,
  Upload,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How Book Kart Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you want to sell your old textbooks or find your next
            favorite read, we make it simple, secure, and fast.
          </p>
        </div>
      </section>

      {/* Selling Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              For Sellers
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Sell Your Books in 3 Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">1. List Your Book</h3>
              <p className="text-muted-foreground">
                Fill in the details about your book, upload clear photos, and
                set your price. It takes less than 2 minutes!
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">2. Ship It</h3>
              <p className="text-gray-600">
                Once you get an order, pack the book securely and ship it to the
                buyer using our shipping partners.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">3. Get Paid</h3>
              <p className="text-gray-600">
                Receive secure payment directly to your bank account or UPI once
                the buyer receives existing book.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Buying Process */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
              For Buyers
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Buy Books Easily
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">1. Browse & Search</h3>
              <p className="text-gray-600">
                Search through thousands of used books by category, author, or
                subject to find what you need.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <ShoppingCart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">2. Secure Checkout</h3>
              <p className="text-gray-600">
                Add to cart and pay securely using our trusted payment gateway.
                Your money is safe with us.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">3. Doorstep Delivery</h3>
              <p className="text-gray-600">
                Sit back and relax while we deliver your books right to your
                doorstep, hassle-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Snippet or Call to Action could go here */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to get started?</h2>
          <div className="flex justify-center gap-4">
            <a
              href="/books"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Browse Books
            </a>
            <a
              href="/book-sell"
              className="px-6 py-3 bg-card border border-border text-foreground rounded-lg font-medium hover:bg-muted"
            >
              Sell a Book
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
