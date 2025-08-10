import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import MovieCarousel from "./components/MovieCarousel";
import VideoPlayer from "./components/VideoPlayer";
import MovieDetails from "./components/MovieDetails";
import { Toaster } from "./components/ui/toaster";
import { trendingMovies, popularMovies, topRatedMovies, comedyMovies, horrorMovies, actionMovies } from "./data/mockData";

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [isMovieDetailsOpen, setIsMovieDetailsOpen] = useState(false);

  const handlePlayMovie = (movie) => {
    setSelectedMovie(movie);
    setIsVideoPlayerOpen(true);
    setIsMovieDetailsOpen(false);
  };

  const handleMoreInfo = (movie) => {
    setSelectedMovie(movie);
    setIsMovieDetailsOpen(true);
    setIsVideoPlayerOpen(false);
  };

  const closeVideoPlayer = () => {
    setIsVideoPlayerOpen(false);
    setSelectedMovie(null);
  };

  const closeMovieDetails = () => {
    setIsMovieDetailsOpen(false);
    setSelectedMovie(null);
  };

  useEffect(() => {
    // Add custom scrollbar styles
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .line-clamp-1 {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <Navbar />

      {/* Hero Banner */}
      <HeroBanner onPlayMovie={handlePlayMovie} onMoreInfo={handleMoreInfo} />

      {/* Movie Carousels */}
      <div className="relative -mt-16 sm:-mt-24 md:-mt-32 z-10">
        <MovieCarousel
          title="Trending Now"
          movies={trendingMovies}
          onPlayMovie={handlePlayMovie}
          onMoreInfo={handleMoreInfo}
        />
        
        <MovieCarousel
          title="Popular on Netflix"
          movies={popularMovies}
          onPlayMovie={handlePlayMovie}
          onMoreInfo={handleMoreInfo}
        />
        
        <MovieCarousel
          title="Top Rated"
          movies={topRatedMovies}
          onPlayMovie={handlePlayMovie}
          onMoreInfo={handleMoreInfo}
        />
        
        <MovieCarousel
          title="Action Movies"
          movies={actionMovies}
          onPlayMovie={handlePlayMovie}
          onMoreInfo={handleMoreInfo}
        />
        
        <MovieCarousel
          title="Comedy Movies"
          movies={comedyMovies}
          onPlayMovie={handlePlayMovie}
          onMoreInfo={handleMoreInfo}
        />
        
        <MovieCarousel
          title="Horror Movies"
          movies={horrorMovies}
          onPlayMovie={handlePlayMovie}
          onMoreInfo={handleMoreInfo}
        />
      </div>

      {/* Footer Spacing */}
      <div className="h-16 md:h-20"></div>

      {/* Video Player Modal */}
      <VideoPlayer
        movie={selectedMovie}
        isOpen={isVideoPlayerOpen}
        onClose={closeVideoPlayer}
      />

      {/* Movie Details Modal */}
      <MovieDetails
        movie={selectedMovie}
        isOpen={isMovieDetailsOpen}
        onClose={closeMovieDetails}
        onPlay={handlePlayMovie}
      />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;