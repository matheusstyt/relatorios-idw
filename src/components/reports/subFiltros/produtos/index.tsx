import { getAllProducts } from "../../services/filters/produto";
import SelectIDW from "../../filtros/customInput/select";
import { useEffect, useState } from "react";
import { Checkbox, Divider, FormControlLabel } from "@mui/material";

const Produtos = (props : any) => {

    const [produtoValorSelecionado, setProdutoValorSelecionado] = useState("");
    const [isTodosOSProdutos, setIsTodosOSProdutos] = useState<boolean>(true);
    const [listaProdutos, setListaProdutos] = useState<any[]>([]);
        
    const startGetAllProduct = () => {

        getAllProducts()
        .then((result : any) => {
            let lista = result.data.items.map((i: any)=>{
                return {
                    value: `${i?.cdProduto} - ${i?.dsProduto}`,
                    name: `${i?.cdProduto} - ${i?.dsProduto}`,
                    id: i?.idProduto
                }
            });
            setListaProdutos(lista);
        })
    }

    useEffect(() => {
        startGetAllProduct();
    }, []);

    return (
            <SelectIDW
                id="Produto"
                label="Produtos"
                disabled={!props.disabled}
                name="Produto"
                options={listaProdutos}
                width="100%"
                value={produtoValorSelecionado}
                defaultValue={"todos"} 
                onChange={(value: any) => {
                    setProdutoValorSelecionado(value?.target?.value);
                    props.changed(value?.target?.value);
                } }
            />
    )
}

export default Produtos;