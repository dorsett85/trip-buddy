import { AnyAction } from 'redux';

export interface GenericAction<TType extends string, TPayload = undefined>
  extends AnyAction {
  type: TType;
  payload: TPayload;
}

export type GenericActionCreator<
  TAction extends GenericAction<string, TPayload>,
  TPayload = TAction['payload']
> = (...payload: undefined extends TPayload ? [TPayload?] : [TPayload]) => TAction;
