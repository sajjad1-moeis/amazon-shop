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
      <PaginationContent className="bg-white border rounded-xl gap-0">
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {[...Array(3)].map((item, index) => (
          <PaginationItem className="border-l">
            <PaginationLink href="#">{index + 1}</PaginationLink>
          </PaginationItem>
        ))}
        {/* 
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem className="border-l">
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
