import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const MovieCard = ({ movie, onPlay, onMoreInfo }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer transition-all duration-300 transform hover:scale-105 hover:z-20"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {/* Movie Poster */}
      <div className="relative w-32 h-48 sm:w-40 sm:h-60 md:w-48 md:h-72 rounded-lg overflow-hidden shadow-lg">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          showDetails ? 'opacity-100' : 'opacity-0'
        } flex items-center justify-center`}>
          <div className="flex space-x-2">
            <Button
              onClick={() => onPlay(movie)}
              className="bg-white text-black hover:bg-gray-200 rounded-full p-2 sm:p-3 transform transition-transform duration-200 hover:scale-110"
            >
              <Play className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 fill-current" />
            </Button>
            <Button
              onClick={() => onMoreInfo(movie)}
              variant="ghost"
              className="text-white hover:bg-white/10 rounded-full p-2 sm:p-3 border border-white/30"
            >
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Details Card - Hidden on mobile */}
      {showDetails && (
        <div className="absolute top-0 left-0 w-72 sm:w-80 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 transform transition-all duration-300 scale-105 z-30 hidden md:block">
          {/* Movie Image */}
          <div className="relative h-40 sm:h-44 rounded-t-lg overflow-hidden">
            <img
              src={movie.backdrop_path}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={() => onPlay(movie)}
                className="bg-white text-black hover:bg-gray-200 rounded-full p-2"
              >
                <Play className="h-5 w-5 fill-current" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Action Buttons */}
            <div className="flex items-center space-x-2 mb-3">
              <Button
                onClick={() => onPlay(movie)}
                className="bg-white text-black hover:bg-gray-200 rounded-full p-2"
              >
                <Play className="h-4 w-4 fill-current" />
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 rounded-full p-2 border border-gray-600"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 rounded-full p-2 border border-gray-600"
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => onMoreInfo(movie)}
                variant="ghost"
                className="text-white hover:bg-white/10 rounded-full p-2 border border-gray-600 ml-auto"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Movie Info */}
            <div className="flex items-center space-x-2 text-xs text-gray-300 mb-2">
              <span className="text-green-500 font-semibold">{Math.round(movie.vote_average * 10)}% Match</span>
              <span className="bg-gray-600 px-1 rounded">HD</span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>

            {/* Title */}
            <h3 className="text-white font-semibold text-sm mb-2 line-clamp-1">{movie.title}</h3>

            {/* Description */}
            <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
              {movie.overview}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const MovieCarousel = ({ title, movies, onPlayMovie, onMoreInfo }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 800;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 800;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(updateScrollButtons, 300);
    }
  };

  React.useEffect(() => {
    updateScrollButtons();
    const handleResize = () => updateScrollButtons();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [movies]);

  return (
    <div className="relative mb-8 md:mb-12 group">
      {/* Section Title */}
      <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-3 md:mb-4 px-4 md:px-16">
        {title}
      </h2>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <Button
            onClick={scrollLeft}
            className="absolute left-1 md:left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 md:p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20"
          >
            <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
          </Button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <Button
            onClick={scrollRight}
            className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 md:p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20"
          >
            <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
          </Button>
        )}

        {/* Movies Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide px-4 md:px-16 pb-4 md:pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={updateScrollButtons}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0">
              <MovieCard movie={movie} onPlay={onPlayMovie} onMoreInfo={onMoreInfo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;