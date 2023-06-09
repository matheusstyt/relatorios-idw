import OutlinedInput from "@mui/material/OutlinedInput";
import { Theme, useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import * as React from "react";
import { getAllArea } from "../../../../services";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, areaResponsavel: readonly string[], theme: Theme) {
  return {
    fontWeight:
      areaResponsavel.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Mult(props : any) {
  const theme = useTheme();

  const [ListaAreaResponsavel, setListaAreaResponsavel] = useState<any[]>([]);

    const startGetAllArea = () => {
        getAllArea("", 1, 10000, true)
        .then((result : any) => {
            let tempList = result.data?.items.map((i: any)=>{
                return {
                  value: i?.cdAreaResponsavel,
                  name: i?.dsAreaResponsavel
                }
              }); 
              setListaAreaResponsavel(tempList);
        })
    }
    useEffect(() => {
        startGetAllArea();
    }, []);

  return (
    <FormControl sx={{ m: 1, width: "99%" }}>
        <InputLabel id="multi-area-label">Área</InputLabel>
        <Select
            labelId="multi-area-label"
            id="multi-area"
            multiple
            disabled={props.disabled}
            value={props.value}
            onChange={ (e) => { props.changed(e.target.value) }}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value : any) => <Chip key={value} label={value} /> )}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {ListaAreaResponsavel.map((area: any, index: number) => (
            <MenuItem
              key={index}
              value={`${area?.value} - ${area?.name}`}
              style={getStyles(area.name, props.value, theme)} >
              {area?.value} - {area?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}