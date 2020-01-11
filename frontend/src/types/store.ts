import { AnyAction } from 'redux';

export interface GenericAction<TType extends string, TPayload = undefined>
  extends AnyAction {
  type: TType;
  payload: TPayload;
}

export type GenericActionCreator<
  TAction extends GenericAction<string, TAction['payload']>
> = Extract<TAction['payload'], undefined> extends never
  ? (payload: TAction['payload']) => TAction
  : (payload?: TAction['payload']) => TAction;
