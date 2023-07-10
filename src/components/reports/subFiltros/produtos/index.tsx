import { getAllProducts } from "../../../../services/filters/produto";
import SelectIDW from "../../filtros/customInput/select";
import { useEffect, useState } from "react";

const Produtos = (props : any) => {
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
                value={props.value}
                defaultValue={"todos"} 
                onChange={(value: any) => props.changed(value?.target?.value) }
            />
    )
}

export default Produtos;