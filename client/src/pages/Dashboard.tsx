import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Mail, Calendar } from 'lucide-react';

interface ContactMessage {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

const Dashboard = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const token = localStorage.getItem('token');
        try {
            // Note: In a real app we'd have a specific GET endpoint for messages
            // For now, I'll assume we might need to create one or use an existing one.
            // Since we didn't create a GET messages route in backend yet, I will mock it 
            // OR we should quickly add it to backend. 
            // Let's assume we will add GET /api/contact endpoint protected by auth.

            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/contact`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            } else {
                if (res.status === 401) handleLogout();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">
            <header className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">Admin Dashboard</h1>
                    <p className="text-gray-400">Manage your portfolio content</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-red-500/20 hover:text-red-400 text-gray-300 px-4 py-2 rounded-lg transition-colors border border-gray-700 hover:border-red-500/50"
                >
                    <LogOut size={18} /> Logout
                </button>
            </header>

            <main className="max-w-6xl mx-auto">
                <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-800 bg-gray-800/30">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Mail className="text-amber-400" /> Recent Messages
                        </h2>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center text-gray-400">Loading messages...</div>
                    ) : messages.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">No messages yet.</div>
                    ) : (
                        <div className="divide-y divide-gray-800">
                            {messages.map((msg) => (
                                <div key={msg._id} className="p-6 hover:bg-gray-800/50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-gray-200">{msg.name}</h3>
                                        <span className="text-xs text-gray-500 flex items-center gap-1 bg-gray-950 px-2 py-1 rounded">
                                            <Calendar size={12} /> {new Date(msg.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <a href={`mailto:${msg.email}`} className="text-amber-400 text-sm hover:underline mb-3 inline-block">
                                        {msg.email}
                                    </a>
                                    <p className="text-gray-300 leading-relaxed bg-gray-950/50 p-4 rounded-lg border border-gray-800/50">
                                        {msg.message}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
