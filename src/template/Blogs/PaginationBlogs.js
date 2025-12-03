import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationBlogs() {
  return (
    <Pagination dir="ltr" className={"mt-8 "}>
      <PaginationContent className="bg-white dark:bg-dark-box border rounded-xl gap-0 dark:border-dark-stroke">
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {[...Array(3)].map((item, index) => (
          <PaginationItem className="border-l dark:border-dark-stroke">
            <PaginationLink href="#">{index + 1}</PaginationLink>
          </PaginationItem>
        ))}
        {/* 
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem className="border-l dark:border-dark-stroke">
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
