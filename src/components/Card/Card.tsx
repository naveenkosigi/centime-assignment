import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import {
  CardContent,
  Card as MaterialCard,
  Typography,
} from "@mui/material";
import React from "react";
import classes from "./Card.module.scss"

export interface CardProps {
  title: ReactJSXElement | string;
  children: ReactJSXElement | string;
}

const Card = (props: CardProps) => {
  return (
    <MaterialCard className={classes["card"]}>
      <CardContent>
        <Typography sx={{ fontSize: 14,fontWeight:"bold" }} color="text.secondary" gutterBottom>
          {props.title}
        </Typography>
        <CardContent>
          <Typography sx={{ fontSize: "2rem",marginTop:"1rem"}} gutterBottom>
            {props.children}
          </Typography>
        </CardContent>
      </CardContent>
    </MaterialCard>
  );
};

export default Card;
