"use client";

import { Button } from "./types/types";

type AdminButtonProps = {
  buttonProperty: Button;
};

export const AdminButton: React.FC<AdminButtonProps> = ({
  buttonProperty: { color, text, fontColor },
}) => {
  return (
    <div>
      {text.map((b, idx) => {
        return (
          <button
            key={idx}
            className={`${color} text-${fontColor} rounded-sm px-3 py-1 mr-2`}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
};
