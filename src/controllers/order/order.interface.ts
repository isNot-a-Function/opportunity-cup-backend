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

export interface IGetOrders {
  page: number;
}

export interface IGetUserOrders {
  userId: string;
}
