import { PropsWithChildren, ReactNode } from "react";
import checkPermissions from "./CheckPermission"
import { Authority, CurrentAuthority } from "./types";

export interface IAuthorized extends PropsWithChildren {
  authority: Authority;
  currentAuthority: CurrentAuthority;
  noMatch: ReactNode;
}

const Authorized: React.FC<IAuthorized> = ({ authority, currentAuthority, noMatch = null, children }) => {
  const childrenRender = typeof children === undefined ? null : children
  return checkPermissions(authority, currentAuthority, childrenRender, noMatch)
}

export default Authorized