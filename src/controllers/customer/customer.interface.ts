export interface IPickExecutor {
  orderId: string;
  responseId: string
}

export interface IUnPickExecutor {
  orderId: string;
  responseId: string
}

export interface IApproveOrder {
  orderId: string;
  rating: number;
  cost?: number;
}
