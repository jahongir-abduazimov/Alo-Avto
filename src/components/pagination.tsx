"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems?: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const getVisiblePages = () => {
    const pages = [];
    // Ma'lumotlarga qarab maxVisible ni belgilash
    const maxVisible = totalPages <= 10 ? totalPages : Math.min(5, totalPages);

    if (totalPages <= maxVisible) {
      // Agar jami sahifalar maxVisible dan kam yoki teng bo'lsa, barchasini ko'rsatish
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Agar ko'p sahifa bo'lsa, joriy sahifa atrofidagi sahifalarni ko'rsatish
      let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      const end = Math.min(totalPages, start + maxVisible - 1);

      // Agar oxirgi sahifaga yetib qolgan bo'lsa, boshlanishni orqaga surish
      if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="space-y-4">
      {/* Items per page selector */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-gray-500">Showing</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border border-gray-200 rounded-2xl px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Records info - only show if totalItems is provided */}
      {totalItems && (
        <p className="text-center text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)} out of {totalItems}{" "}
          records
        </p>
      )}

      {/* Page navigation */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "w-8 h-8 rounded-full text-sm font-medium transition-colors",
              currentPage === page
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// "use client";

// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   itemsPerPage: number;
//   totalItems: number;
//   onPageChange: (page: number) => void;
//   onItemsPerPageChange: (items: number) => void;
// }

// export function Pagination({
//   currentPage,
//   totalPages,
//   itemsPerPage,
//   totalItems,
//   onPageChange,
//   onItemsPerPageChange,
// }: PaginationProps) {
//   const startItem = (currentPage - 1) * itemsPerPage + 1;
//   const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//   const getVisiblePages = () => {
//     const pages = [];
//     const maxVisible = 4;

//     for (let i = 1; i <= Math.min(totalPages, maxVisible); i++) {
//       pages.push(i);
//     }

//     return pages;
//   };

//   return (
//     <div className="space-y-4">
//       {/* Items per page selector */}
//       <div className="flex items-center justify-center gap-2">
//         <span className="text-sm text-gray-500">Showing</span>
//         <select
//           value={itemsPerPage}
//           onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
//           className="border border-gray-200 rounded-2xl px-3 py-2 text-sm"
//         >
//           <option value={10}>10</option>
//           <option value={20}>20</option>
//           <option value={50}>50</option>
//         </select>
//       </div>

//       {/* Records info */}
//       <p className="text-center text-sm text-gray-500">
//         Showing {startItem} to {endItem} out of {totalItems} records
//       </p>

//       {/* Page navigation */}
//       <div className="flex items-center justify-center gap-2">
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <ChevronLeft className="w-4 h-4" />
//         </button>

//         {getVisiblePages().map((page) => (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={cn(
//               "w-8 h-8 rounded-full text-sm font-medium transition-colors",
//               currentPage === page
//                 ? "bg-blue-500 text-white"
//                 : "text-gray-600 hover:bg-gray-100"
//             )}
//           >
//             {page}
//           </button>
//         ))}

//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <ChevronRight className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// }
