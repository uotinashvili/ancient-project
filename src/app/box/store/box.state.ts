import { IBox, IBoxOpening, IUser } from "../model/box.model";

export interface IAppState {
    boxes: IBoxesState;
    box: IBoxState;
    user: IUserState;
  }
  
export interface IBoxesState {
    loading: boolean;
    boxes: IBox[];
    error: string | null;
  }
  
  export interface IBoxState {
    opening: boolean;
    box: IBox;
    boxOpenings: IBoxOpening[];
    error: string | null;
  }
  
  export interface IUserState {
    loading: boolean;
    user: IUser;
    error: string | null;
  }
  