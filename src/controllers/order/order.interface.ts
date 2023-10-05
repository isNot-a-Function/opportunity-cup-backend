import { CostTypeEnum } from '@prisma/client';

export interface ICreateOrder {
  title: string;
  description?: string;
  files?: string[];
  tags?: string[];
  costType: CostTypeEnum;
  cost?: number;
  specialization: string;
}

export interface IUpdateOrder {
  orderId: string;
  title?: string;
  description?: string;
  files?: string[];
  tags?: string[];
  costType?: CostTypeEnum;
  cost?: number;
  specialization?: string;
}

export interface IArchiveOrder {
  orderId: string;
}

export interface IActiveOrder {
  orderId: string;
}

export interface IGetOrder {
  orderId: string;
}

export interface IGetOrders {
  search?: string;
  filter?: string[];
  page: string;
}

export interface IGetMyOrders {
  filter: 'active' | 'processed' | 'done' | 'archived' | 'responses'
  page: string;
}

export interface IGetUserOrders {
  userId: string;
}
