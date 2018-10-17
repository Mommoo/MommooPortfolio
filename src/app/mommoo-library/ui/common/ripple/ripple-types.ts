export interface RippleRef {
  view: HTMLElement,
  triggerEvent: Event,
  executeFadeOutNextFadeIn: boolean,
  status: RippleState,
  destroy: ()=>void;
}

export enum RippleState {
  NONE,
  FADE_IN_START,
  FADE_IN_END,
  FADE_OUT_START,
  FADE_OUT_END
}

export type OnTriggerEventListener = (event: Event) => void;
export type OnPressEventListener = (pageX: number, pageY: number) => void;
export type OnReleaseEventListener = () => void;
export type onRippleDoneEventListener = (rippleRef: RippleRef) => void;
