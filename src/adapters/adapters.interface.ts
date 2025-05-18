export interface IGetParams {
  orderBy?: string;
  order?: 'asc' | 'desc';
}

export type TBaseEntityAdapter<T> = {
  id: string;
  createAt: Date;
  updatedAt: Date;
} & T;
