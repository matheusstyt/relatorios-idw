import { getAllProducts } from "../../services/filters/produto";
import SelectIDW from "../../filtros/customInput/select";
import { useEffect, useState } from "react";

const Produtos = (props : any) => {

    const [produtoValorSelecionado, setProdutoValorSelecionado] = useState("");
    
    const [listaProdutos, setListaProdutos] = useState<any[]>([]);
        
    const startGetAllProduct = () => {

        getAllProducts()
        .then((result : any) => {
            console.log(result)
            let lista = result.data.items.map((i: any)=>{
                return {
                    value: i?.cdProduto,
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