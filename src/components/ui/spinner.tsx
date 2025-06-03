"use client";

import React from "react";

// Types
interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "circular" | "dots" | "pulse";
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "white";
  className?: string;
}

interface LoadingButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  type?: "button" | "submit" | "reset";
}

// Spinner Component
export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  variant = "circular",
  color = "primary",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const colorClasses = {
    primary: "border-blue-600",
    secondary: "border-gray-600",
    success: "border-green-600",
    warning: "border-yellow-600",
    danger: "border-red-600",
    white: "border-white",
  };

  if (variant === "circular") {
    return (
      <div
        className={`inline-block ${sizeClasses[size]} ${className}`}
        role="status"
        aria-label="Loading"
      >
        <div
          className={`w-full h-full border-4 border-gray-200 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}
        />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={`flex space-x-1 ${className}`}
        role="status"
        aria-label="Loading"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${sizeClasses[size]} ${colorClasses[color].replace(
              "border-",
              "bg-"
            )} rounded-full animate-bounce`}
            style={{
              animationDelay: `${i * 0.15}s`,
              animationDuration: "0.6s",
            }}
          />
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div
        className={`${sizeClasses[size]} ${colorClasses[color].replace(
          "border-",
          "bg-"
        )} rounded-full animate-pulse ${className}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return null;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  isLoading = false,
  loadingText = "Loading...",
  disabled = false,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
}) => {
  const baseClasses =
    "px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 min-w-[120px] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300 focus:ring-blue-500",
    secondary:
      "bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-300 focus:ring-gray-500",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-blue-300 disabled:text-blue-300 focus:ring-blue-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-disabled={disabled || isLoading}
    >
      {isLoading && (
        <Spinner
          size="sm"
          color={variant === "outline" ? "primary" : "white"}
        />
      )}
      <span>{isLoading ? loadingText : children}</span>
    </button>
  );
};
  