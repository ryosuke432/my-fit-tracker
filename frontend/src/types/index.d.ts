// variables
type Category = 'Electronics' | 'Books' | 'Clothing';

interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  quantity: number;
  rating: number;
  imgUrl?: string;
  createdAt: Date;
  updatedAt?: Date;
}

// functions
interface handleBtnActionProp {
  (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLButtonElement>
  ): void;
}

interface handleInputChangeProp {
  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void;
}

interface RemoveFromCartProps {
  (cartList: Product[], id: string): void;
}

// UI components
interface ButtonProps {
  label: string;
  action: handleBtnEventProp;
  disabled?: boolean;
}

interface SelectProps {
  label: string;
  options: string[];
  onChangeFunc: handleInputChangeProp;
  selectedOption?: string;
}
