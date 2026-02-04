import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="flex flex-col p-6 gap-4 w-full border border-white/10 rounded-3xl bg-white/5 animate-pulse">
            {/* User info skeleton */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-white/10 rounded w-24"></div>
                </div>
            </div>

            {/* Title and description skeleton */}
            <div className="space-y-2">
                <div className="h-5 bg-white/10 rounded w-3/4"></div>
                <div className="h-4 bg-white/10 rounded w-full"></div>
                <div className="h-4 bg-white/10 rounded w-5/6"></div>
            </div>

            {/* Action buttons skeleton */}
            <div className="flex items-center gap-3">
                <div className="h-10 bg-white/10 rounded-full w-20"></div>
                <div className="h-10 bg-white/10 rounded-full w-20"></div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10"></div>
        </div>
    );
};

export default SkeletonCard;
