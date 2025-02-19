export type CategoryResponse = {
  status: string;
  message?: string;
  category: string;
};

export type CategoryFormData = {
  category: string;
};

export type CategoryType = {
  initialData?: CategoryFormData;
  onSubmit: (data: CategoryFormData) => void;
  onUpdate?: (data: CategoryFormData) => void;
  onDelete?: () => void;
};
