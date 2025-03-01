    import React from "react";
    import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

    function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Handle edge cases for invalid inputs
    if (totalPages <= 0 || itemsPerPage <= 0) {
        return null;
    }

    // Generate page numbers with ellipsis logic
    const renderPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5; // Number of pages to show around the current page
        const ellipsisThreshold = 2; // Threshold for showing ellipsis

        // Always show the first page
        pages.push(1);

        // Show ellipsis if currentPage is far from the start
        if (currentPage > ellipsisThreshold + 1) {
        pages.push("...");
        }

        // Show pages around the current page
        for (
        let i = Math.max(2, currentPage - ellipsisThreshold);
        i <= Math.min(totalPages - 1, currentPage + ellipsisThreshold);
        i++
        ) {
        pages.push(i);
        }

        // Show ellipsis if currentPage is far from the end
        if (currentPage < totalPages - ellipsisThreshold) {
        pages.push("...");
        }

        // Always show the last page
        if (totalPages > 1) {
        pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className='d-flex justify-content-center mt-4'>
        <button
            className='btn btn-outline-primary mx-1'
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
        >
            <ChevronLeftIcon style={{ width: "20px" }} />
        </button>

        {renderPageNumbers().map((page, index) => (
            <button
            key={page === "..." ? `ellipsis-${index}` : page}
            className={`btn mx-1 ${
                page === currentPage ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            >
            {page}
            </button>
        ))}

        <button
            className='btn btn-outline-primary mx-1'
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
        >
            <ChevronRightIcon style={{ width: "20px" }} />
        </button>
        </div>
    );
    }

    export default Pagination;
