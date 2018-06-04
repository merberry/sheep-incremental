import GameObject from "./gameObject/GameObject";
import IGameObjectState from "./gameObject/IGameObjectState";
import IGameObjectTemplate from "./gameObject/IGameObjectTemplate";
import { Price, Lock, UpgradeEffect } from "./baseClasses";

export interface IIdeaState extends IGameObjectState {
    done: boolean;
}

export interface IIdeaTemplate extends IGameObjectTemplate {
    // this is ID of an object that should show this upgrade
    objectId?: string;
    effects?: UpgradeEffect[];
    unlocks?: Lock[];
}

export class Idea extends GameObject {
    readonly type = 'idea';

    template: IIdeaTemplate;

    done: boolean;

    onBuy = [] as Array<() => void>;

    public get currentPrice() {
        return this.rawCost;
    }

    constructor(template: IIdeaTemplate, state: IIdeaState) {
        super(template, state);

        this.template = template;

        this.done = state.done;
    }

    buy() {
        this.onBuy.forEach(handler => handler());
    }

    save(): IIdeaState {
        return {
            done: this.done,
            locks: this.locks
        };
    }
}
