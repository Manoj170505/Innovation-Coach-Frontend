import React from 'react';

const EmptyState = ({
    icon,
    title,
    description,
    actionLabel,
    onAction
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
            {/* Icon */}
            <div className="mb-6 p-4 rounded-full bg-white/5 dark:bg-white/5 light:bg-gray-100 border border-white/10 dark:border-white/10 light:border-gray-200">
                {icon}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-3 text-white dark:text-white light:text-gray-900">
                {title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 max-w-md mb-8 leading-relaxed">
                {description}
            </p>

            {/* Action Button (optional) */}
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
