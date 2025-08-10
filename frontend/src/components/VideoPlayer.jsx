import React, { useState } from 'react';
import { X, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { Button } from './ui/button';
import { getYouTubeEmbedUrl } from '../data/mockData';

const VideoPlayer = ({ movie, isOpen, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  if (!isOpen || !movie) return null;

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const embedUrl = `${getYouTubeEmbedUrl(movie.video_key)}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&rel=0`;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      <div className={`relative w-full h-full flex items-center justify-center transition-all duration-300 ${
        isFullscreen ? 'p-0' : 'p-2 md:p-4 lg:p-8'
      }`}>
        
        {/* Video Container */}
        <div className={`relative bg-black rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ${
          isFullscreen ? 'w-full h-full' : 'w-full max-w-6xl h-[60vh] md:h-[70vh]'
        }`}>
          
          {/* YouTube Player */}
          <iframe
            src={embedUrl}
            title={movie.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* Control Overlay */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-3 md:p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-between">
              {/* Movie Title */}
              <h2 className="text-white text-sm md:text-lg font-semibold truncate mr-4">{movie.title}</h2>
              
              {/* Controls */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 rounded-full p-2"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="h-4 w-4 md:h-5 md:w-5" /> : <Volume2 className="h-4 w-4 md:h-5 md:w-5" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 rounded-full p-2 hidden md:flex"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 rounded-full p-2"
                  onClick={onClose}
                >
                  <X className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Overlay with Movie Details */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="text-white">
              <h3 className="text-lg md:text-xl font-bold mb-2">{movie.title}</h3>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-300 mb-2 md:mb-3">
                <span>{new Date(movie.release_date).getFullYear()}</span>
                <span>⭐ {movie.vote_average}/10</span>
                <span className="bg-red-600 px-2 py-1 text-white font-semibold rounded">HD</span>
              </div>
              <p className="text-gray-200 text-xs md:text-sm leading-relaxed max-w-2xl line-clamp-2 md:line-clamp-none">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>

        {/* Close Button (Outside video for non-fullscreen) */}
        {!isFullscreen && (
          <Button
            onClick={onClose}
            className="absolute top-2 md:top-4 right-2 md:right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm"
          >
            <X className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;