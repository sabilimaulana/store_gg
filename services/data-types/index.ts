export interface CategoryTypes {
  _id: string;
  name: string;
}

export interface GameItemTypes {
  _id: string;
  name: string;
  status: string;
  thumbnail: string;
  category: CategoryTypes;
}

export interface BankTypes {
  _id: string;
  bankName: string;
  noRekening: string;
  name: string;
}

export interface PaymentTypes {
  _id: string;
  type: string;
  status: string;
  banks: BankTypes[];
}

export interface NominalTypes {
  _id: string;
  coinQuantity: number;
  coinName: string;
  price: number;
}

export interface UserTypes {
  _id: string;
  avatar: string;
  name: string;
  username: string;
  email: string;
}

export interface DetailVoucherTypes {
  _id: string;
  name: string;
  category: CategoryTypes;
  isFeatured: boolean;
  status: string;
  thumbnail: string;
  user: UserTypes;
  nominals: NominalTypes[];
}

export interface DataTopup {
  verifyID: string;
  nominalItem: NominalTypes;
  paymentItem: { payment: PaymentTypes; bank: BankTypes };
  bankAccountName: string;
}

export interface CheckoutData {
  voucher: string;
  nominal: string;
  payment: string;
  bank: string;
  name: string;
  accountUser: string;
}
