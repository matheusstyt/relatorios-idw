import { Box, Checkbox, Chip, FormControl, FormControlLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getStops } from "../../services";

const Paradas = (props : any) => {

    const [todasSelecionado, setTodasSelecionado] = useState<boolean>(false);
    
    const [listParadas, setListParadas] = useState<any[]>([]);
    const [listaParadasSelecionadas, setlistaParadasSelecionadas] = useState<any[]>([]);
    
    
    const startGetStops = () => {

        getStops("", 1, 10000, false).then((result) => {
            console.log(result.data)
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
    
    function handleParada (value : any) {
        setlistaParadasSelecionadas(value);
        props.changed(value);
        console.log(value)
        
    }
    return (
        <div className="container paradas">
            <h3>Paradas</h3>
            <FormControlLabel 
                label="Todas as Paradas"
                value={todasSelecionado}
                control={ <Checkbox onChange={() => { 
                    setTodasSelecionado(!todasSelecionado);
                    props.todasSelecionado(!todasSelecionado);
                 }} />}
            />
            <FormControl fullWidth>
                <Select
                    style={{width: "100%"}}
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    disabled={todasSelecionado}
                    value={listaParadasSelecionadas}
                    onChange={(e) => { handleParada(e.target.value) }}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(listaParadasSelecionadas: any) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {listaParadasSelecionadas?.map((value: any) => (
                            <Chip key={value} label={value} />
                        ))}
                        </Box>
                    )}
                    // MenuProps={MenuProps}
                    >
                  {listParadas.map((parada: any, index: number) => (
                    <MenuItem
                      key={index}
                      value={`${parada?.value} - ${parada?.name}`}

                    >
                      {`${parada?.value} - ${parada?.name}`}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>
        </div>
    )
}
export default Paradas;