
export type INFLOWTYPES = "SALARY" | "MISC";

export interface Inflow {
  id: string;
  amount: number;
  type: INFLOWTYPES;
}

export interface OutFlow{
  id: string;
  amount: number;
  type: "ELECTRIC" | "MOBILE" | "MISC";  
}

export const inflowData: Inflow[] = [
  {
    id: "0",
    amount: 5000,
    type: "SALARY",
  },
  {
    id:'1',
    amount:3000,
    type:"SALARY"
  }
];

export const outflowData: OutFlow[] = [
  {
    id: "0",
    amount: 1000,
    type: "ELECTRIC",
  },
  {
    id:'1',
    amount:2000,
    type:"MOBILE"
  }
];
