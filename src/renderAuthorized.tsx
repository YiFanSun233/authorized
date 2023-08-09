import { FunctionComponent } from "react";
import { IAuthorized } from "./Authorized";

let CURRENT: string | string[] = 'NULL';

/**
 * 缓存当前权限，方便后续使用
 * @param Authorized 
 * @returns 
 */
const renderAuthorize = (Authorized: FunctionComponent<IAuthorized>) => (currentAuthority: string | string[] | (() => string) | (() => string[])) => (props: Omit<IAuthorized, 'currentAuthority'>) => {
  if (currentAuthority) {
    if (typeof currentAuthority === 'function') {
      CURRENT = currentAuthority();
    }
    if (
      Object.prototype.toString.call(currentAuthority) === '[object String]' ||
      Array.isArray(currentAuthority)
    ) {
      CURRENT = currentAuthority as string;
    }
  } else {
    CURRENT = 'NULL';
  }
  return (
    <Authorized currentAuthority={CURRENT} {...props} />
  )
}
export default (Authorized: FunctionComponent<IAuthorized>) => renderAuthorize(Authorized)
