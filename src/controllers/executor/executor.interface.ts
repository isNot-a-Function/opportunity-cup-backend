import { CostTypeEnum, ExpirienceEnum } from '@prisma/client';

export interface IUpdateExecutorInfo {
  description?: string;
  classification?: string;
  tags?: string[];
  specializations?: string[];
  expirience?: ExpirienceEnum;
  costType?: CostTypeEnum;
  cost?: number;
}

export interface IResponseOrder {
  orderId: string;
  comment: string;
}

export interface IAcceptOrder {
  orderId: string;
}

export interface IDeclineOrder {
  orderId: string;
}

export interface IDoneOrder {
  orderId: string
  comment: string
  rating: number
}
