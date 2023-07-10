import { Box, Checkbox, Chip, FormControl, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getStops } from "../../../../services";

const Paradas = (props : any) => {

    const [listParadas, setListParadas] = useState<any[]>([]);   
    
    const startGetStops = () => {

        getStops("", 1, 10000, true).then((result) => {
            if(result?.data!=null){
                let tempList = result.data?.items.map((i: any)=>{
                    return {
                    name: i?.dsParada,
                    value: i?.cdParada
                    }
                }); 
                setListParadas(tempList);
            }
        });
    }

    useEffect(() => {
        startGetStops();
    }, []);
    
    return (

        <div className="container paradas">
            <h3>Paradas</h3>
            <FormControlLabel 
                label="Todas as Paradas"
                checked={props.todasParadasSelecionado}
                control={ <Checkbox onChange={() => { 
                    props.changeTodasParadasSelecionado(!props.todasParadasSelecionado);
                 }} />}
            />
            <FormControl fullWidth>
                <InputLabel id="multi-paradas-label">Paradas</InputLabel>
                <Select
                    style={{width: "100%"}}
                    labelId="multi-paradas-label"
                    id="multi-paradas"
                    multiple
                    disabled={props.todasParadasSelecionado}
                    value={props.value}
                    onChange={(e) => { props.changed(e.target.value) }}

                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(listaParadasSelecionadas: any) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {listaParadasSelecionadas?.map((value: any) => (
                            <Chip key={value} label={value} />
                        ))}
                        </Box>
                    )} >
                    {listParadas.map((parada: any, index: number) => (
                        <MenuItem key={index} value={`${parada?.value} - ${parada?.name}`} >
                        {`${parada?.value} - ${parada?.name}`}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
export default Paradas;