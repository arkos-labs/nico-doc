import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Search, Plus, Loader2, X, ArrowRight } from "lucide-react";
import { CreateClientModal } from "@/components/admin/clients/CreateClientModal";

interface ClientSelectionProps {
    onClientSelect: (client: any) => void;
    selectedClient: { name: string; email: string; company: string; id: string } | null;
    onReset: () => void;
}

export function ClientSelection({ onClientSelect, selectedClient, onReset }: ClientSelectionProps) {
    const [clients, setClients] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setIsLoading(true);
        // Using 'profiles' table for clients
        const { data } = await supabase
            .from('profiles')
            .select('id, first_name, last_name, email, phone, company_name, details')
            .eq('role', 'client')
            .order('company_name');
        
        if (data) setClients(data.map(p => ({
            ...p,
            name: p.details?.full_name || `${p.first_name || ''} ${p.last_name || ''}`.trim() || p.email?.split('@')[0],
            company: p.details?.company || p.company_name || 'Particulier'
        })));
        setIsLoading(false);
    };

    const filteredClients = clients.filter(client => {
        const searchLower = searchTerm.toLowerCase();
        return client.name.toLowerCase().includes(searchLower) ||
            (client.email || '').toLowerCase().includes(searchLower) ||
            client.company.toLowerCase().includes(searchLower);
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
                <Label className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                    <User className="h-4 w-4" /> Identification Client
                </Label>
                <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="text-[10px] font-black uppercase tracking-[0.15em] text-[#ed5518] hover:text-[#ed5518]/80 transition-colors flex items-center gap-1.5"
                >
                    <Plus className="h-3 w-3" /> Nouveau client
                </button>
            </div>

            <div className="relative" ref={dropdownRef}>
                <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                        type="text"
                        placeholder="Rechercher par nom, email ou société..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`h-16 rounded-[1.5rem] border-slate-100 bg-slate-50/50 pl-14 pr-12 font-bold transition-all focus:bg-white focus:ring-[#ed5518]/10 text-slate-900 placeholder:text-slate-400 ${selectedClient?.id ? 'border-[#ed5518] bg-white ring-2 ring-[#ed5518]/5' : ''}`}
                    />
                    {selectedClient?.id && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onReset(); setSearchTerm(""); }}
                            className="absolute right-5 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm"
                        >
                            <X className="h-3 w-3" strokeWidth={3} />
                        </button>
                    )}
                </div>

                {(!selectedClient?.id) && (
                    <div className="w-full mt-6 bg-white border border-slate-100 rounded-[2.5rem] p-4 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
                        {isLoading ? (
                            <div className="p-12 text-center bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-200">
                                <Loader2 className="h-10 w-10 animate-spin mx-auto text-[#ed5518] mb-4 opacity-50" />
                                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Récupération des clients...</p>
                            </div>
                        ) : filteredClients.length > 0 ? (
                            <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar space-y-2">
                                {filteredClients.map(client => (
                                    <div
                                        key={client.id}
                                        onClick={() => {
                                            onClientSelect(client);
                                            setSearchTerm(client.name);
                                        }}
                                        className="group p-5 rounded-[1.5rem] hover:bg-slate-900 transition-all cursor-pointer border border-slate-50 hover:border-slate-800 bg-white"
                                    >
                                        <div className="flex items-center justify-between gap-6">
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-black text-slate-900 group-hover:text-white uppercase tracking-tight truncate">{client.name}</div>
                                                <div className="flex items-center gap-3 mt-1.5">
                                                    <span className="text-[10px] font-black uppercase tracking-tighter text-[#ed5518] px-2 py-0.5 rounded-lg bg-[#ed5518]/5 group-hover:bg-[#ed5518]/20 group-hover:text-white transition-colors">{client.company}</span>
                                                    <span className="h-1 w-1 rounded-full bg-slate-200 group-hover:bg-slate-700" />
                                                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-500 truncate">{client.email}</span>
                                                </div>
                                            </div>
                                            <div className="h-10 w-10 rounded-2xl bg-slate-50 group-hover:bg-[#ed5518] flex items-center justify-center text-slate-400 group-hover:text-white transition-all transform group-hover:translate-x-1 shadow-sm">
                                                <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-16 text-center bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-200">
                                <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                                    <Search className="h-8 w-8 text-slate-200" />
                                </div>
                                <p className="text-base font-black text-slate-900">Aucun client trouvé</p>
                                <p className="text-xs text-slate-400 mt-2 max-w-[200px] mx-auto leading-relaxed">Nous n'avons trouvé aucun profil correspondant à "{searchTerm}".</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {selectedClient?.id && (
                <div className="rounded-[2rem] bg-slate-50 p-6 border border-slate-100 flex items-center gap-5 relative animate-in zoom-in-95 duration-500 overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#ed5518]/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                    <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100 shrink-0">
                        <User className="h-7 w-7 text-[#ed5518]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#ed5518] mb-0.5">Client Sélectionné</div>
                        <div className="text-lg font-black text-slate-900 uppercase truncate leading-none">{selectedClient.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] font-bold text-slate-500 uppercase">{selectedClient.company}</span>
                            <span className="h-1 w-1 rounded-full bg-slate-300" />
                            <span className="text-[11px] font-medium text-slate-400 truncate tracking-tight">{selectedClient.email}</span>
                        </div>
                    </div>
                </div>
            )}

            <CreateClientModal 
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={(newClient) => {
                    fetchClients();
                    onClientSelect(newClient);
                    setShowCreateModal(false);
                }}
            />
        </div>
    );
}
