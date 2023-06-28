/* eslint-disable @typescript-eslint/no-unused-expressions */
import "../../filtros.scss";
import { Button, Container } from "@mui/material";
import { useState } from "react";
import Produtos from "../../../../components/reports/subFiltros/produtos";

const Filtros = (props : any) => {
    const [produtoSelecionado, setProdutoSelecionado] = useState<string>("");
  
    const verFiltros = () => {

        // carga útil
        const payload = {
            cdProduto : produtoSelecionado ? produtoSelecionado : "0",
        };

        let descricao : Object[] = [];
        descricao.push({propery : "PRODUTO", description: produtoSelecionado})
        
        console.log(payload)
        props.getPayload(payload);
        props.getDescricao(descricao);
        props.openPreview(true);

    }
    return (
        <div className="container-filtro">

            <div className="container ficha-tecnica">
                <h3>Produtos</h3>
                <Produtos changed={(value : any) => setProdutoSelecionado(value) }/>
            </div>
            <Container style={{ display : "flex", justifyContent : "flex-end", gap : "1em"}} >
                <Button variant="contained">LIMPAR</Button>
                <Button disabled={produtoSelecionado === "0"? false: true} onClick={verFiltros} variant="contained">APLICAR FILTRO</Button>
            </Container>
        </div>
    )
}

export default Filtros;