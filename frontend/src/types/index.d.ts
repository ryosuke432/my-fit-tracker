// model interfaces
// TODO: after id is converted to uuid in backend, id data type will be changed to string
interface MemberInterface {
  id?: number | string;
  f_name: string;
  l_name: string;
  full_name?: string;
  email: string;
  mobile: number;
  body_weight?: number;
  is_premium?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface WorkoutInterface {
  id?: number | string;
  name: string;
  duration_min: number;
  distance_km: number;
  calories?: number;
  createdAt?: Date;
  updatedAt?: Date;
  MemberId?: number;
}

interface NutritionInterface {
  id?: number | string;
  name: string;
  calories?: number;
  protein?: number;
  fat?: number;
  carbohydrates?: number;
  createdAt?: Date;
  updatedAt?: Date;
  MemberId?: number;
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
  id?: number | string;
  goal_type: string;
  weekly_goal: number;
  total_duration: number;
  createdAt?: Date;
  updatedAt?: Date;
  MemberId?: number;
}

// functions
interface handleBtnActionProp {
  (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLButtonElement>
  ): void;
}

interface handleChangeProp {
  (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void;
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
