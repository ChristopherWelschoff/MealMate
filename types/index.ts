export type Recipe = {
  _id: string;
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  category: Category[];
  imageUrl?: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
  nutrition?: Nutrition;
  owner?: string;
  isApproved?: boolean;
};

export type Category = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Nutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};
