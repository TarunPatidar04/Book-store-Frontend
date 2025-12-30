import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  onPageChange,
  totalPages,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={() => onPageChange(Math.max(currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon className="h-4 w-4" />
      </Button>
      <span>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? "bg-blue-500 text-black" : ""}
          >
            {page}
          </Button>
        ))}
      </span>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
