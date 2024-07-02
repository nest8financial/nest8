// <?xml version="1.0" encoding="UTF-8" standalone="no"?>
// <!-- Created with Inkscape (http://www.inkscape.org/) -->
import React from "react";
import { Box } from "@mui/material";
import nest8icon from "../../Assets/images/egg_icon_3.svg";

function Nest8icon() {
  return (
    <Box>
      <Box
        component="img"
        src={nest8icon}
        alt="Nest 8 Logo"
        sx={{ width: 100, height: 65 }}
      />
    </Box>
  );
}

export default Nest8icon;
