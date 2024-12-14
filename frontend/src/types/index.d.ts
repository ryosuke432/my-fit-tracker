declare module '@mapbox/mapbox-gl-draw';

// model interfaces
interface MemberInterface {
  id?: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  mobile: number;
  bodyWeight?: number;
  isPremium?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface WorkoutInterface {
  id?: string;
  name: string;
  duration_min: number;
  distance_km: number;
  calories?: number;
  createdAt?: Date;
  updatedAt?: Date;
  MemberId?: string;
}

interface NutritionInterface {
  id?: string;
  name: string;
  calories?: number;
  protein?: number;
  fat?: number;
  carbohydrates?: number;
  createdAt?: Date;
  updatedAt?: Date;
  MemberId?: string;
}

interface AggregatedWorkoutInterface {
  date?: string;
  week?: string;
  total_duration?: number;
  total_distance?: number;
  total_calories?: number;
}

interface AggregatedNutritionInterface {
  date?: string;
  week?: string;
  total_calories?: number;
  total_protein?: number;
  total_fat?: number;
  total_carbohydrates?: number;
}

interface GoalInterface {
  id: string;
  weekly_goal: number;
  total_duration: number;
  createdAt: Date;
  updatedAt: Date;
  MemberId: string;
  deletedAt?: Date;
  GoalTypeId: string;
  GoalType: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
  };
}

// functions
interface handleBtnActionProp {
  (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLButtonElement>
  ): void;
}

interface handleChangeProp {
  (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void;
}

// UI components
interface ButtonProps {
  label: string;
  action: handleBtnEventProp;
  disabled?: boolean;
}

interface FormProps {
  type: string;
  name: string;
  value?: string | number;
  placeholder?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
  readOnly?: boolean;
}
