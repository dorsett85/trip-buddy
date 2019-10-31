import { Action } from 'redux';

export interface ActionWithPayload<TType extends string, TPayload> extends Action<TType> {
  payload: TPayload;
}

export type GenericActionCreator<TAction extends ActionWithPayload<string, any>> = (
  payload: TAction['payload']
) => TAction;
