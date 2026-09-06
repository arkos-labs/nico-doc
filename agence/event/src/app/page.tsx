"use client";

import { useState } from "react";
import { Search, Calendar, Users, MapPin, Download, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  // Mocks for now
  const generateProposal = () => {
    setLoading(true);
    setTimeout(() => {
      setResults({
        venues: [
          { name: "Le Grand Pavillon", price: "2500€", desc: "Espace lumineux en centre-ville." },
          { name: "Domaine des Chênes", price: "3200€", desc: "Cadre verdoyant avec terrasse." },
          { name: "Loft Industriel", price: "1800€", desc: "Style atypique, briques apparentes." },
        ],
        caterers: [
          { name: "Saveurs & Co", price: "45€/pers", desc: "Cuisine française traditionnelle." },
          { name: "Green Kitchen", price: "35€/pers", desc: "Buffet 100% végétarien." },
          { name: "Le Chef Étoilé", price: "80€/pers", desc: "Gastronomie haut de gamme." },
        ],
        transport: [
          { name: "Navettes privées", price: "400€", desc: "Aller-retour depuis la gare." },
          { name: "VTC VIP", price: "850€", desc: "Flotte de berlines noires." },
        ],
      });
      setLoading(false);
    }, 2000);
  };

  const exportToExcel = () => {
    if (!results) return;
    
    // Create workbooks
    const wb = XLSX.utils.book_new();
    
    // Venues sheet
    const wsVenues = XLSX.utils.json_to_sheet(results.venues);
    XLSX.utils.book_append_sheet(wb, wsVenues, "Lieux");
    
    // Caterers sheet
    const wsCaterers = XLSX.utils.json_to_sheet(results.caterers);
    XLSX.utils.book_append_sheet(wb, wsCaterers, "Traiteurs");

    // Transport sheet
    const wsTransport = XLSX.utils.json_to_sheet(results.transport);
    XLSX.utils.book_append_sheet(wb, wsTransport, "Transports");

    XLSX.writeFile(wb, "Proposition_Evenement.xlsx");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          EventIA Studio
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-slate-500">Connecté en tant que Freelance</span>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
            F
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Column */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Search className="w-5 h-5 mr-2 text-blue-600" />
              Nouveau Brief
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type d'événement</label>
                <input type="text" placeholder="Ex: Séminaire d'entreprise..." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ville / Secteur</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input type="text" placeholder="Ex: Paris 8ème" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Participants</label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input type="number" placeholder="50" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date estimée</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input type="text" placeholder="Octobre 2024" className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Budget global</label>
                <input type="text" placeholder="Ex: 15 000 €" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ambiance / Thème (Mots-clés)</label>
                <textarea rows={3} placeholder="Industriel, chic, verdoyant..." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"></textarea>
              </div>

              <button 
                onClick={generateProposal}
                disabled={loading}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center transition disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Search className="w-5 h-5 mr-2" />}
                {loading ? "Génération par l'IA..." : "Générer les propositions"}
              </button>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-2">
            {!results && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-white border border-dashed border-slate-300 rounded-2xl p-12">
                <Search className="w-12 h-12 mb-4 text-slate-300" />
                <p className="text-lg">Remplissez le brief pour générer des options</p>
              </div>
            )}
            
            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-blue-600 bg-white border border-slate-200 shadow-sm rounded-2xl p-12">
                <Loader2 className="w-12 h-12 mb-4 animate-spin" />
                <p className="text-lg font-medium animate-pulse">L'IA analyse les prestataires disponibles...</p>
              </div>
            )}

            {results && !loading && (
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden flex flex-col">
                <div className="bg-slate-50 border-b border-slate-200 p-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-800">Résultats de la recherche</h2>
                  <button onClick={exportToExcel} className="flex items-center text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg transition">
                    <Download className="w-4 h-4 mr-2" />
                    Exporter Excel
                  </button>
                </div>
                
                <div className="p-6 space-y-8 overflow-y-auto max-h-[700px]">
                  
                  {/* Venues */}
                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-4 text-slate-800">
                      <span className="text-2xl mr-2">🏨</span> Lieux suggérés
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {results.venues.map((venue: any, i: number) => (
                        <div key={i} className="border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md transition cursor-pointer">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-slate-900">{venue.name}</h4>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold">{venue.price}</span>
                          </div>
                          <p className="text-sm text-slate-500">{venue.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Caterers */}
                  <div>
                    <h3 className="text-lg font-semibold flex items-center mb-4 text-slate-800">
                      <span className="text-2xl mr-2">🍽️</span> Traiteurs
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {results.caterers.map((caterer: any, i: number) => (
                        <div key={i} className="border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md transition cursor-pointer">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-slate-900">{caterer.name}</h4>
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-bold">{caterer.price}</span>
                          </div>
                          <p className="text-sm text-slate-500">{caterer.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                   {/* Transport */}
                   <div>
                    <h3 className="text-lg font-semibold flex items-center mb-4 text-slate-800">
                      <span className="text-2xl mr-2">🚌</span> Logistique & Transport
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {results.transport.map((trans: any, i: number) => (
                        <div key={i} className="border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md transition cursor-pointer">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-slate-900">{trans.name}</h4>
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded font-bold">{trans.price}</span>
                          </div>
                          <p className="text-sm text-slate-500">{trans.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
