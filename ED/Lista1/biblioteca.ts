type Livro = {
    titulo: string,
    autor: string,
    ano: number,
    codigo: string
    proximo: Livro | null
}

class Biblioteca {
    private primeiroLivro: Livro | null;

    constructor(livro: Livro) {
        this.primeiroLivro = livro;
    }

    public adicionarLivro(livro: Livro) {
        if (!this.primeiroLivro) {
            this.primeiroLivro = livro;
            return;
        }

        let atual = this.primeiroLivro;
        
        while(atual.proximo) {
            atual = atual.proximo;
        }

        atual.proximo = livro;
    }

    public buscarLivroPorTitulo(titulo: string): Livro | null {
        let current = this.primeiroLivro;

        while (current) {
            if (current.titulo === titulo) {
                return current;
            }
            current = current.proximo;
        }

        return null;
    }

    public removerLivroPorCodigo(codigo: string) {
        if (!this.primeiroLivro) return;

        // Special case: remove head
        if (this.primeiroLivro.codigo === codigo) {
            this.primeiroLivro = this.primeiroLivro.proximo;
            return;
        }

        let current = this.primeiroLivro;
        while (current.proximo) {
            if (current.proximo.codigo === codigo) {
                current.proximo = current.proximo.proximo; // Remove by skipping
                return;
            }
            current = current.proximo;
        }

    }
}