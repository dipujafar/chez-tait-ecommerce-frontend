type TErrorSource = {
  path: string;
  message: string;
};

type TErrorDetails = {
  statusCode: number;
};

export type TErrorResponse = {
  success: boolean;
  message: string;
  errorSources: TErrorSource[];
  err: TErrorDetails;
  stack: string;
};

export type TError = {
  status: number;
  data: TErrorResponse;
};

type TUser = {
  _id: string;
  status: string;
  companyName: string | null;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  image: string | null;
  role: string;
  address: string;
  country: string;
  states: string;
  zipCode: string;
  registerWithGoogle: boolean;
  needsPasswordChange: boolean;
  isDeleted: boolean;
  verification: Verification;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  passwordChangedAt: string; //
};

type TBillingDetails = {
  name: string;
  companyName: string;
  street: string;
  country: string;
  states: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  _id: string;
};

export type TOrderData = {
  _id: string;
  id: string;
  user: TUser;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  transactionId: string;
  billingDetails: TBillingDetails;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TCategory = {
  _id: string;
  name: string;
  banner: string;
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

export type TProductsImage = {
  key: string;
  url: string;
  _id: string;
};

// Interface for Verification
interface Verification {
  otp: string;
  expiresAt: string; // ISO date string
  status: boolean;
}

// Interface for the Review
export type TReview = {
  _id: string;
  user: TUser;
  product: string; // This could also be a more complex type depending on the Product structure
  rating: number;
  comment: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

export type TProduct = {
  _id: string;
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  category: TCategory;
  images: TProductsImage[];
  stock: number;
  sales: number;
  size: string[]; // Assuming size is an array of strings
  discount: number;
  color: string[]; // Assuming color is an array of hex color strings
  avgRating: number;
  brand: string;
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  averageRating: number;
  reviews: TReview[]; // Assuming reviews can be of any type; define more specifically if needed
  quantity?: number; // Assuming reviews can be of any type; define more specifically if needed
};

export type TWishlistProduct = {
  _id: string;
  product: TProduct;
  createdAt: string;
  updatedAt: string;
  user: TUser;
  __v: number;
  upadatedAt: string;
  reviews: TReview[];
};

export type TCartProduct = {
  cartId: string;
  _id: string;
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  category: TCategory;
  images: TProductsImage[];
  stock: number;
  sales: number;
  size: string[]; // Assuming size is an array of strings
  discount: number;
  color: string[]; // Assuming color is an array of hex color strings
  avgRating: number;
  brand: string;
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  averageRating: number;
  reviews: TReview[];
  quantity: string; // Assuming reviews can be of any type; define more specifically if needed
};

export type TAuthUser = {
  exp: number;
  iat: number;
  role: string;
  userId: string;
};

export type TOrderItems = {
  color: string | null;
  createdAt: string; // Consider using Date object if you want to work with date types
  discount: string; // Adjust if discount should be a number
  order: string; // Assuming this is an identifier for the order
  price: number;
  product: TProduct;
  quantity: number;
  size: string | null;
  totalPrice: number;
  updatedAt: string; // Consider using Date object
  __v: number; // Version key, usually a number
  _id: string; // Identifier for the order item
};
