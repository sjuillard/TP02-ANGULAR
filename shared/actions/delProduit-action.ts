import { Produit } from '../models/produit'

export class DelProduit {
    static readonly type = '[Produit] Del';

    constructor(public payload: Produit) {}
    
}

