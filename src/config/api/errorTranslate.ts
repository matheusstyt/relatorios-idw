import { RESULTADO_ERROR_DICTIONARY } from "../../mocks/dicionario-erros/resultado.erro.mock";

export class ErrorTranslate {
    static codes = RESULTADO_ERROR_DICTIONARY;

    static ObterErrorMessage(code: string) {
        const codeMessage = this.codes.find(i => i.codigoRetorno == code)
        return codeMessage != null ? codeMessage?.descricao : "ERRO NÃO CATALOGADO";
    }
}