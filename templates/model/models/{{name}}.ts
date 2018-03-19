import * as {{name}} from '../services/{{name}}';

export interface I{{classifyName}} {
  
}

export interface I{{classifyName}}State {
  isFetching: false;
}

export interface I{{classifyName}}Action {
  type: string;
  data: any;
  payload: any;
}

export default {
  namespace: '{{name}}',
  state: {
    isFetching: false,
  },
  reducers: {
    updateState(state: I{{classifyName}}State, { payload }: I{{classifyName}}Action) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *tempEffect({ payload }: I{{classifyName}}Action, { call, put }: { call: any, put: any }) {
      yield put({ type: 'updateState', payload: { isFetching: true } });
      const res = yield call({{name}}.tempCall, payload);
      yield put({ type: 'updateState', ...res });
      yield put({ type: 'updateState', payload: { isFetching: false } });
    },
  }
}
