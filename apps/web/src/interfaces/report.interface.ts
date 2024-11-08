interface SalesReport {
  transactionId: number;
  date: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  properties: {
    propertyId: number;
    propertyName: string;
    totalSales: number;
  }[];
  transactionTotal: number;
}
