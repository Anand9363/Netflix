import React, { useState } from 'react';
import { Play, Info, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { featuredMovie } from '../data/mockData';

const HeroBanner = ({ onPlayMovie }) => {
  const [isMuted, setIsMuted] = useState(true);

  const handlePlayClick = () => {
    if (onPlayMovie) {
      onPlayMovie(featuredMovie);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${featuredMovie.backdrop_path})`,
        }}
      >
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="px-4 md:px-16 max-w-2xl">
          {/* Netflix Series Badge */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-red-600 text-xl font-bold">N</span>
            <span className="text-white text-sm font-medium tracking-wider">SERIES</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {featuredMovie.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-lg">
            {featuredMovie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mb-8">
            <Button
              onClick={handlePlayClick}
              className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105"
            >
              <Play className="h-6 w-6 fill-current" />
              <span>Play</span>
            </Button>
            
            <Button
              variant="secondary"
              className="bg-gray-600/70 text-white hover:bg-gray-600/90 px-8 py-3 text-lg font-semibold flex items-center space-x-2 backdrop-blur-sm transition-all duration-200 transform hover:scale-105"
            >
              <Info className="h-6 w-6" />
              <span>More Info</span>
            </Button>
          </div>

          {/* Movie Info */}
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <span className="bg-red-600 px-2 py-1 text-white font-semibold">HD</span>
            <span>{new Date(featuredMovie.release_date).getFullYear()}</span>
            <span className="border border-gray-400 px-2 py-1">16+</span>
            <span>{featuredMovie.runtime} min</span>
            <span>⭐ {featuredMovie.vote_average}/10</span>
          </div>
        </div>
      </div>

      {/* Mute Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-8 right-8 text-white hover:bg-white/10 border border-white/30 rounded-full"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default HeroBanner;