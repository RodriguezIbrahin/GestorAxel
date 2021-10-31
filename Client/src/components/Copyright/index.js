import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";

function Copyright() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Box position="absolute" bottom={40}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://mui.com/">
            {"Tienda Axel"}
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Grid>
  );
}

export default Copyright;
