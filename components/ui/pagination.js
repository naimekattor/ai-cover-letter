import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils"; // Assuming you have this utility
import { buttonVariants } from "@/components/ui/button"; // Assuming you have this

const Pagination = (props) => {
  const { className, ...rest } = props;
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...rest}
    />
  );
};
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <ul
      ref={ref}
      className={cn("flex flex-row items-center gap-1", className)}
      {...rest}
    />
  );
});
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return <li ref={ref} className={cn("", className)} {...rest} />;
});
PaginationItem.displayName = "PaginationItem";

const PaginationLink = (props) => {
  const { className, isActive, size = "icon", ...rest } = props;
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...rest}
    />
  );
};
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = (props) => {
  const { className, ...rest } = props;
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 pl-2.5", className)}
      {...rest}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  );
};
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = (props) => {
  const { className, ...rest } = props;
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 pr-2.5", className)}
      {...rest}
    >
      <span>Next</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
};
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = (props) => {
  const { className, ...rest } = props;
  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...rest}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
};
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
