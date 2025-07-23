"use client"

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

// Toast types and utilities
type ToastType = "info" | "success" | "warning" | "error" | "loading";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  type: ToastType;
  closable?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToasterConfig {
  placement?: "top-start" | "top-end" | "bottom-start" | "bottom-end";
  pauseOnPageIdle?: boolean;
}

const createToaster = (config: ToasterConfig = {}) => {
  const { placement = "bottom-end", pauseOnPageIdle = true } = config;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // Handle page visibility changes
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!pauseOnPageIdle) return;
    
    const handleVisibilityChange = () => {
      // Implement pause/resume logic here if needed
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [pauseOnPageIdle]);

  const showToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    return id;
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return {
    show: showToast,
    dismiss: dismissToast,
    toasts,
    placement,
  };
};

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
});

export const Toaster = () => {
  const { toasts, placement } = toaster;
  const [isVisible] = useState(true);

  // Get position classes based on placement
  const getPositionClasses = () => {
    const positions: Record<string, string> = {
      "top-start": "top-4 left-4",
      "top-end": "top-4 right-4",
      "bottom-start": "bottom-4 left-4",
      "bottom-end": "bottom-4 right-4",
    };
    return positions[placement] || "bottom-4 right-4";
  };

  // Get color based on toast type
  const getColor = (type: ToastType) => {
    const colors: Record<string, string> = {
      info: "bg-blue-500",
      success: "bg-green-500",
      warning: "bg-yellow-500",
      error: "bg-red-500",
      loading: "bg-blue-500",
    };
    return colors[type] || "bg-blue-500";
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className={`fixed z-50 ${getPositionClasses()} space-y-3`}>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-4 min-w-[300px] border border-gray-200"
            >
              <div className="flex items-start">
                {/* Indicator */}
                <div className={`${getColor(toast.type)} w-1 h-full rounded-full mr-3`}></div>
                
                {/* Loading spinner */}
                {toast.type === "loading" && (
                  <FaSpinner className="animate-spin text-blue-500 mr-3 mt-1" />
                )}
                
                {/* Content */}
                <div className="flex-1">
                  {toast.title && (
                    <h3 className="font-medium text-gray-900">{toast.title}</h3>
                  )}
                  {toast.description && (
                    <p className="text-sm text-gray-600 mt-1">{toast.description}</p>
                  )}
                </div>
                
                {/* Action */}
                {toast.action && (
                  <button
                    onClick={() => {
                      toast.action?.onClick();
                      toaster.dismiss(toast.id);
                    }}
                    className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    {toast.action.label}
                  </button>
                )}
                
                {/* Close button */}
                {toast.closable && (
                  <button
                    onClick={() => toaster.dismiss(toast.id)}
                    className="ml-4 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};