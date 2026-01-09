import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

// TERIMA PROP 'lastPage' DISINI
const Pagination = ({ page, setPage, hasNextPage, lastPage }) => {
  
  const handlePageChange = (newPage) => {
    if (newPage === page || newPage < 1) return;
    // Safety check: Jangan pindah ke halaman yang lebih besar dari total
    if (lastPage && newPage > lastPage) return;
    
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    let pages = [];
    // Logika agar halaman aktif selalu di tengah (jika memungkinkan)
    let startPage = Math.max(1, page - 2);
    
    // Loop maksimal 5 kali
    for (let i = 0; i < 5; i++) {
      let p = startPage + i;
      
      // === LOGIKA PENTING: STOP LOOP ===
      // Jika angka (p) sudah melebihi Total Halaman (lastPage), BERHENTI membuat tombol.
      if (lastPage && p > lastPage) break;
      
      pages.push(p);
    }
    return pages;
  };

  // Jika total halaman cuma 1, atau tidak ada data, sembunyikan pagination sepenuhnya
  if (lastPage && lastPage <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-10 mb-20 animate-fade-in-up">
      
      {/* Tombol First Page (<<) - Muncul jika kita ada di page 4 ke atas */}
      {page > 3 && (
        <button 
          onClick={() => handlePageChange(1)}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:border-yellow-500 hover:text-yellow-500 bg-[#152232] transition-all hidden sm:flex"
        >
          <ChevronsLeft size={16} />
        </button>
      )}

      {/* Tombol PREV (<) */}
      <button 
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all ${
           page === 1 
           ? 'border-white/5 text-gray-600 cursor-not-allowed' 
           : 'border-white/10 text-gray-400 hover:border-yellow-500 hover:text-yellow-500 bg-[#152232]'
        }`}
      >
        <ChevronLeft size={16} />
      </button>

      {/* ANGKA HALAMAN (Dinamis) */}
      {getPageNumbers().map((num) => (
        <button
          key={num}
          onClick={() => handlePageChange(num)}
          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
            num === page
              ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 scale-105' 
              : 'bg-[#152232] text-gray-400 border border-white/10 hover:border-yellow-500 hover:text-yellow-500'
          }`}
        >
          {num}
        </button>
      ))}

      {/* Tombol NEXT (>) */}
      <button 
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasNextPage}
        className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all ${
           !hasNextPage
           ? 'border-white/5 text-gray-600 cursor-not-allowed' 
           : 'border-white/10 text-gray-400 hover:border-yellow-500 hover:text-yellow-500 bg-[#152232]'
        }`}
      >
        <ChevronRight size={16} />
      </button>
      
      {/* Tombol Last Page (>>) - Muncul jika kita belum sampai di akhir */}
      {lastPage && page < lastPage - 2 && (
        <button 
          onClick={() => handlePageChange(lastPage)}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:border-yellow-500 hover:text-yellow-500 bg-[#152232] transition-all hidden sm:flex"
        >
          <ChevronsRight size={16} />
        </button>
      )}

    </div>
  );
};

export default Pagination;