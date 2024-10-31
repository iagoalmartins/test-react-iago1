import Link from 'next/link';
import Image from 'next/image';

export default function Success() {
  return (
    <div className="container mx-auto px-4 py-1">
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="w-full max-w-4xl flex justify-between items-center py-5 px-4">
        <h2 className="text-3xl text-white">WeMovies</h2>
        <div className="text-white flex flex-col items-center">
        <Link href="/cart" className="text-500">
            <div className="flex items-center">
              <span>Meu Carrinho</span>
              <span>🛒</span>
            </div>
            <span className="text-gray-400 flex justify-end">0 itens</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-12 w-full max-w-4xl md:w-4/5 lg:w-3/5 text-center">
        <Image
          src="/success-image.png" 
          alt="Compra realizada com sucesso"
          width={200}
          height={200}
          className="mx-auto mb-6"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Compra realizada com sucesso!</h1>
        
        <Link href="/">
          <button className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition">
            VOLTAR
          </button>
        </Link>
      </div>
    </div></div>
  );
}
