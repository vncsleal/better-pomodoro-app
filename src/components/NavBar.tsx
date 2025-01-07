import Link from 'next/link';
import React from 'react';
import { Timer } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const NavBar: React.FC = () => {
    return (
        <nav className="bg-zinc-50 dark:bg-zinc-900 mx-auto rounded-full border-zinc-200 dark:border-zinc-800 ">
            <div className="container flex justify-between items-center mx-auto max-w-7xl p-4 ">
            <div></div>
                <div className="flex items-center justify-center">
                
                    <Link href='/' className="flex items-center space-x-2 text-zinc-900 dark:text-white hover:opacity-80 transition-opacity">
                        <Timer className="w-6 h-6" />
                        <span className="text-lg font-medium">Better Pomodoro</span>
                    </Link>
                    
                    
                </div>
                <DarkModeToggle />
            </div>
        </nav>
    );
};

export default NavBar;