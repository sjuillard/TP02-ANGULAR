import {NgxsModule,Action,Selector,State, StateContext} from '@ngxs/store';
import {PanierStateModel} from './panier-state-model';
import {AddProduit} from '../actions/produit-action';
import {DelProduit} from '../actions/delProduit-action';
import {DelAllProduit} from '../actions/delAllProduit-action';

@State<PanierStateModel>({
    name: 'panier',
    defaults: {
        panier: []
    }
})

export class PanierState {

  @Selector()
    static getPanier(state: PanierStateModel) {
        return state.panier;
    }

@Action(AddProduit)
    add({getState, patchState }: StateContext<PanierStateModel>, { payload }: AddProduit) {
        const state = getState();
        patchState({
            panier: [...state.panier, payload]
        });
    }

 @Action(DelProduit)
    del ({getState, patchState }: StateContext<PanierStateModel>, { payload }: DelProduit) {
        const state = getState();
        patchState({
            panier: [...(state.panier.filter(p => !(p.nom.match(payload.nom))))]
        });
    }   

@Action(DelAllProduit)
    delAll ({getState, patchState }: StateContext<PanierStateModel>, { }: DelAllProduit) {
        const state = getState();
        patchState({
            panier: []
        });
    }
}
