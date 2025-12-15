import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const announcements = [
  'Parcele até 5x sem juros',
  'Frete grátis acima de R$ 299',
  '10% OFF na primeira compra',
];

const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  return (
    <div className="bg-primary text-primary-foreground py-2">
      <div className="container mx-auto px-4 flex items-center justify-center gap-4">
        <button
          onClick={goToPrev}
          className="p-1 hover:bg-primary-foreground/10 rounded transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft size={16} />
        </button>
        
        <span className="text-sm font-medium min-w-[200px] text-center">
          {announcements[currentIndex]}
        </span>
        
        <button
          onClick={goToNext}
          className="p-1 hover:bg-primary-foreground/10 rounded transition-colors"
          aria-label="Próximo"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
