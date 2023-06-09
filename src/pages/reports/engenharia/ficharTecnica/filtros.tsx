/* eslint-disable @typescript-eslint/no-unused-expressions */
import "../../filtros.scss";
import { Button, Checkbox, Container, FormControlLabel } from "@mui/material";
import { useState } from "react";
import Produtos from "../../../../components/reports/subFiltros/produtos";

const Filtros = (props : any) => {
    const [produtoSelecionado, setProdutoSelecionado] = useState<string>("");
    const [isTodosOSProdutos, setIsTodosOSProdutos] = useState<boolean>(false);

    const LimparFiltro = () => {
        setProdutoSelecionado("");
        setIsTodosOSProdutos(false);
        props.closeReport(false);
    }

    const AplicarFiltro = () => {
        // cortar apenas o cdProduto
        const produto = produtoSelecionado.split(" - ");
        // carga útil
        const payload = {
            cdProduto : isTodosOSProdutos ? "" : produto[0] ? produto[0] : "",
        };

        let descricao : Object[] = [];
        descricao.push({propery : "PRODUTO", description: isTodosOSProdutos ? "TODOS OS PRODUTOS" : produto[1]})
        
        console.log(payload)
        props.getPayload(payload);
        props.getDescricao(descricao);
        props.openPreview(true);
    }
    return (
        <div className="container-filtro">
            <div className="container ficha-tecnica">
                <h3>Produtos</h3>
                <Produtos 
                    value={produtoSelecionado}
                    changed={(value : any) => setProdutoSelecionado(value) }
                    disabled={!isTodosOSProdutos}
                />
                <FormControlLabel 
                    value="Produtos"
                    label="Todos os Produtos"
                    name="Produtos"
                    className="form"
                    control={
                        <Checkbox 
                            value={isTodosOSProdutos}
                            onChange={() => {
                                setIsTodosOSProdutos(!isTodosOSProdutos);
                            }}
                        />
                    }
                />
            </div>
            <Container style={{ display : "flex", justifyContent : "flex-end", gap : "1em"}} >
                <Button onClick={LimparFiltro} variant="contained">LIMPAR</Button>
                <Button disabled={ !isTodosOSProdutos && produtoSelecionado === "" } onClick={AplicarFiltro} variant="contained">APLICAR FILTRO</Button>
            </Container>
        </div>
    )
}

export default Filtros;