import { useState } from "react";
import DateInput from "../../customInput/date";
import SelectTime from "../../customInput/time";
import "./intervaloContagem.scss";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const IntervaloContagem = () => {

    const [dataInicio, setDataInicio] = useState<any>(new Date());
    const [dataTermino, setDataTermino] = useState<any>(new Date());
    const [horaInicio, setHoraInicio] = useState<string>("");
    const [horaFim, setHoraFim] = useState<string>("");

    const [exibirProducaoSelecionado, setExibirProducaoSelecionado]= useState<any>("pecas")

    const handleChangeExibirProducao = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExibirProducaoSelecionado((event.target as HTMLInputElement).value);
      };

    const [exibirPesoSelecionado, setExibirPesoSelecionado]= useState<any>("kilograma")

    const handleChangeExibirPeso = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExibirPesoSelecionado((event.target as HTMLInputElement).value);
    };
    
    return (
        <div className="container intervalo-contagem">
            <h3>Intervalo e Contagem de Produção</h3>
            <table>
                <thead>
                    <th>Início</th>
                    <th>Fim</th>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <DateInput
                                value={dataInicio}
                                onChangeValue={ ( value : any) => {
                                    setDataInicio(value);
                                } }
                                label = "Dia de Início"
                                helperText={"Campo obrigatório"}
                            />
                        </td>
                        <td>
                            <DateInput
                                value={dataTermino}
                                onChangeValue={ ( value : any) => {
                                    setDataTermino(value);
                                } }
                                label = "Dia de Fim"
                                helperText={"Campo obrigatório"}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <SelectTime changed={ (value : string) => setHoraInicio(value)} />
                        </td>
                        <td>
                            <SelectTime changed={ (value : string) => { setHoraFim(value) }} />
                        </td>
                    </tr>
                
                </tbody>
            </table>
            <div className="group-radio">
                <RadioGroup 
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={exibirProducaoSelecionado}
                    onChange={handleChangeExibirProducao}
                    name="radio-buttons-group"
                    className="radio"
                >
                    <FormControlLabel           
                        control={<h4>Mostrar peso em: </h4>}
                        label=""
                        className="form"
                    />

                    <FormControlLabel 
                        value="pecas"
                        label="Peças"
                        name="pecas"
                        className="form"
                        control={ <Radio />}
                    />
                    <FormControlLabel 
                        value="pesoLiquido"
                        label="Peso Líquido"
                        name="pesoLiquido"
                        className="form"
                        control={ <Radio />}
                    />
                    <FormControlLabel 
                        value="pesoBruto"
                        label="Peso Bruto"
                        name="pesoBruto"
                        className="form"
                        control={ <Radio />}
                    />
                </RadioGroup>
            </div>

            {
                exibirProducaoSelecionado != "pecas" 
                ? <div className="group-radio">
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={exibirPesoSelecionado}
                        onChange={handleChangeExibirPeso}
                        name="radio-buttons-group"
                        className="radio" >
                        <FormControlLabel   
                            control={<h4>Mostrar produção em: </h4>}
                            label=""
                            className="form"
                        />
                        <FormControlLabel
                            value="kilograma"
                            control={<Radio />}
                            label="kilograma"
                            name="kilograma"
                            className="form"
                        />
                        <FormControlLabel
                            value="tonelada"
                            control={<Radio />}
                            label="Tonelada"
                            name="tonelada"
                            className="form"
                        />
                    </RadioGroup>
                </div>
                : <></>
            }

        </div>
    )
}

export default IntervaloContagem;