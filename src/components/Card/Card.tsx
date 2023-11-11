import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import {
  CardContent,
  Card as MaterialCard,
  Typography,
} from "@mui/material";
import React from "react";

interface CARDPROPS {
  title: ReactJSXElement | string;
  content: ReactJSXElement | string;
}

const Card = (props: CARDPROPS) => {
  return (
    <MaterialCard sx={{ width: "15rem" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14,fontWeight:"bold" }} color="text.secondary" gutterBottom>
          {props.title}
        </Typography>
        <CardContent>
          <Typography sx={{ fontSize: "2rem",marginTop:"1rem",fontWeight:'bolder' }} gutterBottom>
            {props.content}
          </Typography>
        </CardContent>
      </CardContent>
    </MaterialCard>
  );
};

export default Card;
