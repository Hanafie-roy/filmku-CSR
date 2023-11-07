import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/InfoModal';
import useInfoModalStore from '@/hooks/useInfoModalStore';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { isOpen, closeModal } = useInfoModalStore();

  useEffect(() => {
    fetch('/api/movies')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));

    fetch('/api/favorites') 
      .then((response) => response.json())
      .then((data) => setFavorites(data))
      .catch((error) => console.error('Error fetching favorites:', error));
  }, []);

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
};

export default Home;
