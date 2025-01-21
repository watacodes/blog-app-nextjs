"use client";

type Props = {
  name: string;
};

const CategoryButton: React.FC<Props> = ({ name }) => {
  return (
    <button className="text-sm mx-1 text-blue-700 border border-blue-700 rounded-sm px-2 py-1">
      {name}
    </button>
  );
};

export default CategoryButton;
