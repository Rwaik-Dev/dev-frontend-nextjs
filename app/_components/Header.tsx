import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, Share2 } from 'lucide-react'
import React from 'react'

export default function Header() {
    return (
        <div className="bg-white rounded shadow-sm sticky top-0 z-10 w-full col-span-3 mb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center space-x-2">

                    </div>
                </div>
            </div>
        </div>
    )
}
