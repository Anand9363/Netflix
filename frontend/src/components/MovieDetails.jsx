import React from 'react';
import { X, Play, Plus, ThumbsUp, ThumbsDown, Calendar, Star, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { genresList } from '../data/mockData';

const MovieDetails = ({ movie, isOpen, onClose, onPlay }) => {
  if (!isOpen || !movie) return null;

  // Get genre names from IDs
  const getGenreNames = (genreIds) => {
    if (!genreIds) return [];
    return genreIds.map(id => {
      const genre = genresList.find(g => g.id === id);
      return genre ? genre.name : '';
    }).filter(Boolean);
  };

  const genres = getGenreNames(movie.genre_ids || [28, 12, 878]); // Default genres if not available

  // Mock additional data for more info
  const mockData = {
    director: "Ruben Fleischer",
    cast: ["Tom Hardy", "Michelle Williams", "Naomie Harris", "Reid Scott"],
    duration: movie.runtime || 109,
    maturityRating: "PG-13",
    audioLanguages: ["English", "Spanish", "French"],
    subtitles: ["English", "Spanish", "French", "German", "Japanese"]
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen flex items-start justify-center p-4 pt-20">
        <div className="relative w-full max-w-4xl bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
          
          {/* Close Button */}
          <Button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm"
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Hero Section */}
          <div className="relative h-64 sm:h-80 md:h-96">
            <img
              src={movie.backdrop_path}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={() => onPlay(movie)}
                className="bg-white text-black hover:bg-gray-200 rounded-full p-4 transform transition-transform duration-200 hover:scale-110"
              >
                <Play className="h-8 w-8 fill-current" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Title and Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-0">{movie.title}</h1>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="text-white font-semibold">{movie.vote_average}/10</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Button
                onClick={() => onPlay(movie)}
                className="bg-white text-black hover:bg-gray-200 px-6 py-2 flex items-center space-x-2"
              >
                <Play className="h-5 w-5 fill-current" />
                <span>Play</span>
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 border border-gray-600 px-6 py-2 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>My List</span>
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 border border-gray-600 p-2 rounded-full"
              >
                <ThumbsUp className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 border border-gray-600 p-2 rounded-full"
              >
                <ThumbsDown className="h-5 w-5" />
              </Button>
            </div>

            {/* Movie Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{mockData.duration} min</span>
                  </div>
                  <Badge variant="secondary" className="bg-red-600 text-white">
                    {mockData.maturityRating}
                  </Badge>
                  <Badge variant="outline" className="border-gray-600 text-gray-300">
                    HD
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                  {movie.overview}
                </p>

                {/* Genres */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre, index) => (
                      <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Cast */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-2">Cast</h3>
                  <p className="text-gray-300 text-sm">
                    {mockData.cast.join(', ')}
                  </p>
                </div>

                {/* Director */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-2">Director</h3>
                  <p className="text-gray-300 text-sm">{mockData.director}</p>
                </div>
              </div>

              {/* Right Column - Additional Info */}
              <div className="space-y-6">
                {/* Audio & Subtitles */}
                <div>
                  <h3 className="text-white font-semibold mb-2">Audio</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    {mockData.audioLanguages.join(', ')}
                  </p>
                  
                  <h3 className="text-white font-semibold mb-2">Subtitles</h3>
                  <p className="text-gray-300 text-sm">
                    {mockData.subtitles.join(', ')}
                  </p>
                </div>

                {/* More Like This (Placeholder) */}
                <div>
                  <h3 className="text-white font-semibold mb-3">More Like This</h3>
                  <div className="text-gray-400 text-sm">
                    Similar movies would appear here in full version
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;