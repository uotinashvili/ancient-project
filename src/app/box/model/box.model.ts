export interface IBox {
  id: string;
  name: string;
  iconUrl: string;
  cost: number;
}

export interface IItemVariant {
  id: string;
  name: string;
  value: number;
}

export interface IBoxOpening {
  id: string;
  itemVariant: IItemVariant;
}

export interface IOpenBoxInput {
  boxId: string;
  amount: number;
}

export interface IUser {
  id: string;
  name: string;
  wallets: IWallet[];
}

export interface IWallet {
  id: string;
  amount: number;
  currency: string;
}
