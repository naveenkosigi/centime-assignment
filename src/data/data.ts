
export type INFLOWTYPES = "SALARY" | "MISC";

export interface Inflow {
  id: string;
  amount: number;
  type: INFLOWTYPES;
}

export type OUTFLOWTYPES = "ELECTRIC" | "MOBILE" | "MISC"

export interface OutFlow{
  id: string;
  amount: number;
  type: OUTFLOWTYPES;  
}

export interface ExpenseFlow{
  id : string,
  amount : number,
  type : string
  outflow : {
    id : string,
    amount : number,
    type : string
  }[]
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

export const data : ExpenseFlow[] = [
  {
    id : '0',
    amount : 5000,
    type:"SALARY",
    outflow : [
      {
        id : '0',
        amount : 1000,
        type : "Electric"
      },
      {
        id : '0',
        amount : 2000,
        type : "Mobile"
      }
    ]
  }
]
