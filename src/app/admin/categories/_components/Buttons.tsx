"use client";

import React from "react";
import { CategoryFormData } from "../types/types";

type Props = {
  initialData: CategoryFormData;
  isSubmitting?: boolean;
  onDelete?: () => void;
};

const Buttons: React.FC<Props> = ({ initialData, isSubmitting, onDelete }) => {
  return (
    <div className="flex">
      {initialData ? (
        <>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-600 text-white text-sm rounded-md px-3 py-1 mr-2"
          >
            更新
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            className="bg-red-600 text-white text-sm rounded-md px-3 py-1"
            onClick={onDelete}
          >
            削除
          </button>
        </>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-white bg-purple-600 rounded-md px-3 py-1 mr-2"
        >
          作成
        </button>
      )}
    </div>
  );
};

export default Buttons;
