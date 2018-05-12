import IProducerState from "./IProducerState";
import IProducerTemplate from "./IProducerTemplate";
import { Price, Lock } from "../baseClasses";
import IBuyable from "../IBuyable";
import GameObject from "../gameObject/GameObject";
import { PriceHelper } from "../helpers";

export default class Producer extends GameObject implements IProducerTemplate, IProducerState, IBuyable {
  readonly type = "producer";

  rawProduction: Price;
  rawConsumption: Price;

  onBuy: (() => void)[];

  quantity: number;

  public get currentPrice(): Price {
    return PriceHelper.mulPriceByNumber(this.rawCost, Math.pow(1.15, this.quantity));
  }

  constructor(template: IProducerTemplate, state: IProducerState) {
    super(template, state);

    this.rawProduction = template.rawProduction;
    this.rawConsumption = template.rawConsumption;

    this.quantity = state.quantity;

    this.onBuy = [];
  }

  buy() {
    this.onBuy.forEach(handler => handler());
  }

  getConsumption(deltaT: number): Price {
    return PriceHelper.mulPriceByNumber(this.rawConsumption, this.quantity * deltaT / 1000);
  }

  getProduction(deltaT: number): Price {
    return PriceHelper.mulPriceByNumber(this.rawProduction, this.quantity * deltaT / 1000);
  }

  save(): IProducerState {
    return { quantity: this.quantity, locks: this.locks };
  }
}
