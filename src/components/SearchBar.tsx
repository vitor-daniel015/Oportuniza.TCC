import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

export const SearchBar: React.FC = () => {
  const [category, setCategory] = useState('Pedreiro');
  
  const categories = ['Pedreiro', 'Faxineira', 'Encanador', 'Eletricista', 'Pintor'];

  return (
    <div className="w-full max-w-4xl mx-auto -mt-8 relative z-20 px-4">
      <div className="bg-white p-2 rounded-2xl shadow-2xl border border-gray-100">
        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-2 px-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                category === cat 
                ? 'bg-brand-blue-depth text-white shadow-md' 
                : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="flex flex-col md:flex-row items-center gap-2 p-2">
          <div className="flex-1 w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="O que você precisa?" 
              className="w-full pl-12 pr-4 py-4 rounded-xl border-none bg-gray-50 focus:ring-2 focus:ring-brand-blue-depth transition-all outline-none"
            />
          </div>
          <div className="flex-1 w-full relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Localização" 
              className="w-full pl-12 pr-4 py-4 rounded-xl border-none bg-gray-50 focus:ring-2 focus:ring-brand-blue-depth transition-all outline-none"
            />
          </div>
          <button className="w-full md:w-auto bg-brand-blue-depth hover:bg-[#153a5c] text-white px-10 py-4 rounded-xl font-bold transition-all">
            Pesquisar
          </button>
        </div>
      </div>
    </div>
  );
};
