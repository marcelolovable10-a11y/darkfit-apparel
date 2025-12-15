import { useState } from 'react';
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShopProductCardProps {
  id: string;
  nome: string;
  preco: number;
  preco_promocional?: number | null;
  imagens?: string[];
  categoria?: string;
}

const ShopProductCard = ({ 
  id, 
  nome, 
  preco, 
  preco_promocional, 
  imagens = [],
  categoria 
}: ShopProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Use placeholder if no images
  const displayImages = imagens.length > 0 
    ? imagens 
    : ['/placeholder.svg'];

  const goToPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      (prev - 1 + displayImages.length) % displayImages.length
    );
  };

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      (prev + 1) % displayImages.length
    );
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const hasDiscount = preco_promocional && preco_promocional < preco;
  const displayPrice = hasDiscount ? preco_promocional : preco;
  const installmentPrice = (displayPrice / 5).toFixed(2).replace('.', ',');

  // Random rating for demo
  const rating = 4.5 + Math.random() * 0.5;
  const reviewCount = Math.floor(Math.random() * 500) + 10;

  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-secondary overflow-hidden">
        <img
          src={displayImages[currentImageIndex]}
          alt={nome}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Navigation Arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <Button
            size="icon"
            variant="secondary"
            className="w-8 h-8 bg-background/80 hover:bg-background"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingBag size={16} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className={`w-8 h-8 bg-background/80 hover:bg-background ${
              isFavorite ? 'text-red-500' : ''
            }`}
            onClick={toggleFavorite}
            aria-label="Favoritar"
          >
            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          </Button>
        </div>

        {/* Cashback Badge */}
        {hasDiscount && (
          <div className="absolute bottom-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
            <span>🔥 OFERTA</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-foreground text-sm mb-2 line-clamp-2 min-h-[40px]">
          {nome}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted'}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(preco)}
              </span>
            )}
            <span className="font-bold text-foreground">
              {formatPrice(displayPrice)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            ou 5x de R$ {installmentPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopProductCard;
