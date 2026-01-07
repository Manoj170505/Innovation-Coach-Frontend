import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderKanban,
    TrendingUp,
    Pencil,
    Settings,
    LogOut,
    UserRoundCog,
    Menu,
    X,
    MessageSquare
} from 'lucide-react';

const Navbar = ({ isCollapsed, setIsCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/userpage', icon: LayoutDashboard },
        { name: 'Popular', path: '/popular', icon: TrendingUp },
        { name: 'My Projects', path: '/projects', icon: FolderKanban },
        { name: 'Post', path: '/post', icon: Pencil },
    ];

    return (
        <aside className={`fixed top-0 left-0 h-screen bg-neutral-primary bg-black border-r border-white/10 transition-all duration-300 z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex flex-col h-full p-4">
                {/* Logo Section */}
                <div className="flex items-center justify-between mb-10 px-2">
                    {!isCollapsed && (
                        <span className="text-xl font-bold bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
                            I<span className='text-fg-brand bg-green-500 text-black'>C</span>
                        </span>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors"
                    >
                        {isCollapsed ? <Menu size={20} /> : <X size={20} />}
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-fg-brand/10 text-fg-brand text-white hover:bg-white/50 border border-white/20'
                                    : 'text-white/40 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Icon size={22} className={`${isActive ? 'text-fg-brand' : 'group-hover:text-white'} transition-colors`} />
                                {!isCollapsed && (
                                    <span className="ml-4 font-medium whitespace-nowrap">
                                        {item.name}
                                    </span>
                                )}
                                {!isCollapsed && isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-fg-brand shadow-[0_0_8px_rgba(var(--brand-color),0.6)]" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* User/Bottom Section */}
                <div className="pt-4 mt-4 border-t border-white/5 space-y-2">
                    <button className='w-full flex items-center p-3 text-white/40 hover:bg-white/5 hover:text-white rounded-xl transition-colors group' onClick={() => navigate('/profile')}>
                        <UserRoundCog size={22} />
                        {!isCollapsed && <span className="ml-4 font-medium">User</span>}
                    </button>
                    <button className="w-full flex items-center p-3 text-white/40 hover:bg-white/5 hover:text-white rounded-xl transition-colors group">
                        <Settings size={22} />
                        {!isCollapsed && <span className="ml-4 font-medium">Settings</span>}
                    </button>
                    <button className="w-full flex items-center p-3 text-red-400/60 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-colors group">
                        <LogOut size={22} />
                        {!isCollapsed && <span className="ml-4 font-medium">Sign out</span>}
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default Navbar