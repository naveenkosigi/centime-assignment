import { useSelector } from "react-redux";
import { ExpenseFlow } from "../../data/data";
import { useEffect } from "react";
import { isEmpty } from "../../helpers/helpers";
import SankeyChart from "../SankeyChart/SankeyChart";
import Card from "../Card/Card";
import Box from "@mui/material/Box";

const ExpenseFlowChart = () => {
  const expenseInflows = useSelector((state : any) => state?.expensesFlow);

  useEffect(() => {
    if (!isEmpty(expenseInflows)) {
      console.log(convertToSankeyData(expenseInflows));
    }
  }, [expenseInflows]);

  return (
    <Card title={"Sankey Chart"}>
      <Box width={"100%"} height={"20rem"}>
        <SankeyChart data={convertToSankeyData(expenseInflows)} />
      </Box>
    </Card>
  );
};

export default ExpenseFlowChart;

const convertToSankeyData = (data: ExpenseFlow[] = []) => {
  const set = new Set<string>();

  const nodes: { id: string }[] = [];

  const links: { source: string; target: string; value: number }[] = [];

  data.forEach((expense) => {
    const source = expense.type.toUpperCase();

    if (!set.has(source)) {
      set.add(source);
      nodes.push({ id: source });
    }

    expense.outflow.forEach((outflow) => {
      const target = outflow.type.toUpperCase();

      if (!set.has(target)) {
        set.add(target);
        nodes.push({ id: target });
      }

      links.push({
        source,
        target,
        value: outflow.amount,
      });
    });
  });

  return {
    nodes,
    links,
  };
};
