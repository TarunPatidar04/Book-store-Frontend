"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { books, filters } from "@/lib/Constant";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import BookLoader from "@/lib/BookLoader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heading3, Heart } from "lucide-react";
import Pagination from "../components/Pagination";
import NoData from "../components/NoData";
import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/store/api";
import { BookDetails } from "@/lib/types/type";

const page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("newest");
  const { data: apiResponse = {}, isLoading } = useGetProductsQuery({});
  const [books, setBooks] = useState<BookDetails[]>([]);

  const searchTerms =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const searchQuery = searchTerms?.get("search");

  useEffect(() => {
    if (apiResponse.success) {
      setBooks(apiResponse.data);
    }
  }, [apiResponse]);

  const bookPerPage = 6;
  const router = useRouter();

  const togelFilter = (section: string, item: string) => {
    const updateFilter = (prev: string[]) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    };
    switch (section) {
      case "condition":
        setSelectedCondition(updateFilter);
        break;
      case "classType":
        setSelectedType(updateFilter);
        break;
      case "category":
        setSelectedCategory(updateFilter);
        break;
    }
    setCurrentPage(1);
  };

  const filteredBooks = books.filter((book) => {
    const conditionMatch =
      selectedCondition.length === 0 ||
      selectedCondition
        .map((con) => con.toLowerCase())
        .includes(book.condition.toLowerCase());

    const typeMatch =
      selectedType.length === 0 ||
      selectedType
        .map((type) => type.toLowerCase())
        .includes(book.classType.toLowerCase());

    const categoryMatch =
      selectedCategory.length === 0 ||
      selectedCategory
        .map((category) => category.toLowerCase())
        .includes(book.category.toLowerCase());

    const searchMatch = searchQuery
      ? book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.author &&
          book.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.subject.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return conditionMatch && typeMatch && categoryMatch && searchMatch;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortOption === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortOption === "price-low") {
      return a.finalPrice - b.finalPrice;
    } else if (sortOption === "price-high") {
      return b.finalPrice - a.finalPrice;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedBooks.length / bookPerPage);

  const paginatedBooks = sortedBooks.slice(
    (currentPage - 1) * bookPerPage,
    currentPage * bookPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const calculateDiscount = (price: number, finalPrice: number): number => {
    if (price > finalPrice && price > 0) {
      return Math.round(((price - finalPrice) / price) * 100);
    }
    return 0;
  };

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center mb-8 gap-2 text-muted-foreground text-sm">
          <Link href="/" className="text-primary hover:underline">
            {""} Home {""}
          </Link>
          <span className="text-primary">/</span>
          <span className="text-primary">Books</span>
        </nav>
        <h1 className="mb-8 text-3xl font-bold">
          {""} Find from over 1000+ books online {""}
        </h1>
        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          <div className="space-y-6">
            <Accordion
              type="multiple"
              className="bg-card p-6 border rounded-lg"
            >
              {Object.entries(filters).map(([key, values]) => (
                <AccordionItem value={key} key={key}>
                  <AccordionTrigger className="text-lg font-semibold text-blue-500">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-2 space-y-2">
                      {values.map((value) => (
                        <div
                          key={value}
                          className="flex items-center gap-2 space-x-2"
                        >
                          <Checkbox
                            id={value}
                            checked={
                              key === "condition"
                                ? selectedCondition.includes(value)
                                : key === "classType"
                                  ? selectedType.includes(value)
                                  : selectedCategory.includes(value)
                            }
                            onCheckedChange={() => togelFilter(key, value)}
                          />
                          <label
                            htmlFor={value}
                            className="text-sm font-medium leading-none"
                          >
                            {value}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="space-y-6">
            {isLoading ? (
              <BookLoader />
            ) : paginatedBooks.length ? (
              <>
                <div className="flex justify-between">
                  <div className="mb-8 text-xl font-semibold">
                    Buy Second hand books,Used Books online In India
                  </div>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedBooks.map((book) => (
                    <motion.div
                      key={book._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      // className="bg-white p-6 border rounded-lg shadow-md"
                    >
                      <Card className="group relative overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-2xl bg-card border-0">
                        <CardContent className="p-0">
                          <Link href={`/books/${book._id}`}>
                            <div className="relative">
                              <Image
                                src={book.images[0] || "/images/no-book.jpg"}
                                alt={book.title}
                                width={400}
                                height={300}
                                className="w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute top-0 left-0 flex flex-col gap-2 z-10 p-2">
                                {calculateDiscount(
                                  book.price as number,
                                  book.finalPrice,
                                ) > 0 && (
                                  <Badge className=" bg-orange-600/90 text-white hover:bg-orange-700">
                                    {calculateDiscount(
                                      book.price as number,
                                      book.finalPrice,
                                    )}
                                    % Off
                                  </Badge>
                                )}
                              </div>
                              <Button
                                size={"icon"}
                                variant={"ghost"}
                                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 hover:bg-background"
                              >
                                <Heart className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                            <div className="p-4 space-y-2 ">
                              <div className="flex justify-between items-start">
                                <h3 className="text-lg font-semibold text-orange-500 line-clamp-2">
                                  {book.title}
                                </h3>
                              </div>
                              <p className="text-sm text-zinc-400">
                                {book.author}
                              </p>

                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl text-foreground font-bold">
                                  ₹{book.finalPrice}
                                </span>
                                {book.price && (
                                  <span className="text-sm text-zinc-500 line-through">
                                    ₹{book.price}
                                  </span>
                                )}
                              </div>
                              <div className="flex justify-between tetx-center text-xs text-zinc-400">
                                <span>{formatDate(book.createdAt)}</span>
                                <span>{book.condition}</span>
                              </div>
                            </div>
                          </Link>
                        </CardContent>
                        <div className="absolute -right-8 -top-8 h24 w-24 bg-orange-500/10 blur-2xl" />
                        <div className="absolute -bottom-8 -left-8 h24 w-24 bg-orange-500/10 blur-2xl" />
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <>
                <NoData
                  imageUrl="/images/no-book.jpg"
                  message="No books available please try later."
                  description="Try adjusting your filters or search criteria to find what you're looking for."
                  onClick={() => router.push("/book-sell")}
                  buttonText="Shell Your First Book"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
