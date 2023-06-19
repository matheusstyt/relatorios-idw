import DateInput from "../../filtros/customInput/date";

const Periodo = (props : any) => {
    return (
        <div className="calendar">
            <DateInput 
                disabled={!props.disabled}
                value={props.dataInicio}
                onChangeValue={ ( value : any) => props.changeDataInicio(value) }
                label = "Dia de Início"
                helperText={"Campo obrigatório"}
            />
            <DateInput 
                disabled={!props.disabled}
                value={props.dataTermino}
                onChangeValue={ ( value : any) =>  props.changeDataTermino(value) }
                label = "Dia de Fim"
                helperText={"Campo obrigatório"}
            />
        </div>
    )
}
export default Periodo;