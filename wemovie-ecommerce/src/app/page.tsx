'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

type Movie = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addToCart, removeFromCart, cartItems } = useCart();
  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);

  const fetchMovies = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get('https://wefit-movies.vercel.app/api/movies');
      setMovies(response.data.products.map((movie: Movie) => ({ ...movie, quantity: 1 })));
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const toggleSelectMovie = (movie: Movie) => {
    if (selectedMovies.includes(movie.id)) {
      setSelectedMovies(selectedMovies.filter(id => id !== movie.id));
      removeFromCart(movie.id);
    } else {
      setSelectedMovies([...selectedMovies, movie.id]);
      addToCart({ ...movie });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container  px-4 py-1">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <div className="w-full max-w-4xl flex justify-between items-center py-5 px-4">
          <h2 className="text-3xl text-white">WeMovies</h2>
          <div className="text-white flex items-center space-x-4">
            <Link href="/cart" className="text-500">
              <div className="flex items-center space-x-2">
                <span>Meu Carrinho</span>
                <span>🛒</span>
              </div>
              <span className="text-gray-400 flex justify-end">0 itens</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-40 w-full max-w-4x1 md:w4/5 lg:w-3/5 text-center">
          <Image
            src="/erro-image.png"
            alt="Error Illustration"
            width={200}
            height={200}
            className="mx-auto mb-6"
          />
          
          <button
            onClick={fetchMovies}
            className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition"
          >
            Recarregar página
          </button>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-1">
      <div className="mr-24 ml-24 flex justify-between items-center py-6">
        <h2 className="text-3xl text-white">WeMovies</h2>
        <div className="text-white flex flex-col items-center">
          <Link href="/cart" className="text-500">
            <div className="flex items-center">
              <span>Meu Carrinho</span>
              <span>🛒</span>
            </div>
            <span className="text-gray-400 flex justify-end">{cartItems.length} itens</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="mr-20 ml-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <Image src={movie.image} alt={movie.title} width={150} height={250} className="mx-auto mb-4 rounded-md" />
              <h3 className="text-lg font-semibold text-gray-800">{movie.title}</h3>
              <h2 className="text-xl font-bold text-gray-900 mt-2">R$ {movie.price.toFixed(2)}</h2>
              <button 
                onClick={() => toggleSelectMovie(movie)} 
                className={`mt-4 py-2 px-4 rounded-md flex items-center justify-center w-full transition-all ${
                  selectedMovies.includes(movie.id) ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <span className="mr-2">🛒</span> {selectedMovies.includes(movie.id) ? 'REMOVER DO CARRINHO' : 'ADICIONAR AO CARRINHO'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
