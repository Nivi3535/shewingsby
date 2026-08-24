"use client";

interface ArrowButtonProps {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function ArrowButton({
  page,
  totalPages,
  onPrevious,
  onNext,
}: ArrowButtonProps) {
  /* const [previousPage, setPreviousPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePrevious = () => {
    setPreviousPage((prevPage) => prevPage - 1);
  };
  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  }; */

  return (
    <div className="flex gap-4">
      <button
        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        onClick={onPrevious}
        disabled={page <= 1}
      >
        ←{"Previous"}
      </button>
      <span className="px-4 py-2 rounded bg-gray-100">
        Page {page} of {totalPages}
      </span>
      <button
        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        onClick={onNext}
        disabled={page === totalPages}
      >
        →{"Next"}
      </button>
    </div>
  );
}
