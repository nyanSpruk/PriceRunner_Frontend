import { Item } from './item';
import { Store } from './store';

export class ProductStore {
  id?: number;
  store: Store = new Store();
  product: Item = new Item();
  price: number = 0;
}
