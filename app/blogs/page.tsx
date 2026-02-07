import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogsPage = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 10 Books Every Student Must Read",
      excerpt:
        "Discover the essential reads that will broaden your perspective and enhance your academic journey.",
      author: "Priya Sharma",
      date: "Oct 15, 2023",
      category: "Education",
      image: "/images/blog1.jpg", // Placeholder path
    },
    {
      id: 2,
      title: "How to Take Care of Your Old Books",
      excerpt:
        "Learn the best tips and tricks to preserve the condition of your beloved book collection.",
      author: "Rahul Verma",
      date: "Oct 10, 2023",
      category: "Tips",
      image: "/images/blog2.jpg", // Placeholder path
    },
    {
      id: 3,
      title: "The Benefits of Buying Used Books",
      excerpt:
        "Why buying second-hand books is not only good for your wallet but also for the planet.",
      author: "Amit Patel",
      date: "Oct 05, 2023",
      category: "Sustainability",
      image: "/images/blog3.jpg", // Placeholder path
    },
    {
      id: 4,
      title: "Preparing for Competitive Exams: Book Guide",
      excerpt:
        "A comprehensive guide on selecting the right study material for JEE, NEET, and UPSC.",
      author: "Sneha Gupta",
      date: "Sep 28, 2023",
      category: "Education",
      image: "/images/blog4.jpg", // Placeholder path
    },
    {
      // added to make grid look better
      id: 5,
      title: "Starting a Book Club in College",
      excerpt:
        "Connect with fellow readers and start your own literary community on campus.",
      author: "Vikram Singh",
      date: "Sep 20, 2023",
      category: "Community",
      image: "/images/blog5.jpg",
    },
    {
      id: 6,
      title: "Hidden Gems: Underrated Indian Authors",
      excerpt:
        "Explore some fantastic works by Indian authors that deserve more attention.",
      author: "Anjali Desai",
      date: "Sep 15, 2023",
      category: "Literature",
      image: "/images/blog6.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Our Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Insights, tips, and stories for book lovers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="relative h-48 bg-muted">
                {/* Placeholder for image - using grayscale div for now if image fails */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 bg-muted">
                  <span className="text-lg font-medium">Blog Image</span>
                </div>
                {/* <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                /> */}
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    className="bg-card/90 hover:bg-card text-card-foreground"
                  >
                    {blog.category}
                  </Badge>
                </div>
              </div>
              <CardHeader className="flex-1">
                <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                  {blog.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {blog.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {blog.date}
                  </div>
                </div>
                <p className="text-muted-foreground line-clamp-3">
                  {blog.excerpt}
                </p>
              </CardHeader>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full">
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
