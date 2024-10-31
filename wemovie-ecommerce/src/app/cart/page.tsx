'use client';

import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto text-center mt-10">
        <p className="text-2xl text-white">Seu carrinho está vazio.</p>
        <Link href="/" className="text-blue-500 underline mt-4 block">Voltar para a Home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-1">
      <div className="mr-24 ml-24 flex justify-between items-right py-6">
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

      <div className="bg-white p-6 rounded-lg shadow-md mx-4 lg:mx-24">
        {/* Table Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4 text-gray-300 font-bold">
          <span className="w-1/3">Produto</span>
          <span className="w-1/2 ml-12">QTD</span>
          <span className="w-1/3 mr-20 ">Subtotal</span>
        </div>

        <ul>
          {cartItems.map((movie) => (
            <li key={movie.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center w-1/3">
                <Image src={movie.image} alt={movie.title} width={100} height={140} className="w-30 h-30 object-cover mr-4" />
                <span className="text-gray-800 font-semibold">{movie.title}</span>                
              </div>
              <div className="flex items-center w-1/3 justify-start mr-44">
                <button className="px-4 text-blue-600 font-bold">-</button>
                <span className="mx-2 px-8 py-1 border border-gray-400 rounded text-gray-500">{movie.quantity}</span>
                <button className="px-4 text-blue-600 font-bold">+</button>
              </div>
              <div className="flex items-center w-2/5">
                <span className="text-gray-900 font-semibold mr-6">R$ {movie.price.toFixed(2)}</span>
                <button onClick={() => removeFromCart(movie.id)} className="text-blue-500 ml-60 hover:text-blue-700"> 
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="#009EDD"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 3h6a1 1 0 0 1 1 1v1h4a1 1 0 1 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7H3a1 1 0 1 1 0-2h4V4a1 1 0 0 1 1-1zm7 3V4H8v2zm2 2H6v13h12z" />
                    </svg>
                  </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center border-t pt-4 mt-4 text-lg font-semibold">
        <div className="flex justify-center mt-6">
          <Link href="/checkout">
            <button onClick={clearCart} style={{ backgroundColor: '#009EDD' }} className="bg-blue-500 text-xs text-white py-2 rounded-sm px-8 hover:bg-blue-600">FINALIZAR PEDIDO</button>
          </Link>
        </div>
          <div className="flex justify-end items-center">
            <span className="text-gray-500 mr-2">Total:</span>
            <span className="text-black font-bold">R$ {total.toFixed(2)}</span>
          </div>
        </div>

        
      </div>
    </div>
  );
}
