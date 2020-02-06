import * as types from "../constants";

export function setTheme(value: any) {
  return {
    type: types.SET_THEME,
    payload: value
  };
}
