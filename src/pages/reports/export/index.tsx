import "./export.scss";
export function Header(props : any) {
    return (
        <div className="export-header">
            <h2>{props.title}</h2>
            { props.components}
        </div>
    )
}
export function Table (props : any) {
    const tableHeader = [
        "ÁREA RESPONSÁVEL",
        "PARADA",
        "TEMPO",
        "ÍNDICE",
    ]
    return (
        <table>
            
        </table>
    )
}