import Link from "next/link"; // Import Link from Next.js
import React from "react";

interface CardProps {
  title: string;
  href: string; // URL to redirect to
  icon?: string;
}

const Card: React.FC<CardProps> = ({ title, href }) => {
  return (
    <Link href={href}>
      <div className="cursor-pointer bg-gray-300 rounded-lg w-48 h-48 flex flex-col justify-between p-4 shadow-md hover:bg-gray-400 transition-colors">
        <p className="text-lg font-medium">{title}</p>
        <div className="flex justify-end">
          <span className="text-2xl">→</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
