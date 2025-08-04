"use client";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  Plus, 
  X,
  Menu
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Criar Produto', href: '/product/create', icon: Plus },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isCollapsed ? 'w-16' : 'w-64'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-gray-800">Product CRUD</h1>
            )}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'}`}
                    onClick={onClose}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {!isCollapsed && item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <Separator className="mb-4" />
            {!isCollapsed && (
              <div className="text-xs text-gray-500 text-center">
                FakeStore API
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 