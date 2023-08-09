import { ReactNode } from "react";
import { Authority, CurrentAuthority } from "./types";
import PromiseRender from "./PromiseRender";

/**
 * 判断参数是否为promise
 * @param { Promise } obj 返回权限函数
 * @returns boolean
 */
const isPromise = (obj: any): boolean => {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

/**
 * 通用权限检查方法
 * @param { string | array | Promise | Function } authority 权限判定
 * @param { string | string[]} currentAuthority 当前权限
 * @param { ReactNode } target 通过组件
 * @param { ReactNode } Exception 未通过组件
 */
const checkPermissions = (authority: Authority, currentAuthority: CurrentAuthority, target: ReactNode, Exception: ReactNode) => {
  // 没有判定权限.默认查看所有
  if (!authority) {
    return target;
  }
  // 数组处理
  if (Array.isArray(authority)) {
    if (typeof currentAuthority === 'string' && authority.indexOf(currentAuthority) >= 0) {
      return target;
    }
    if (Array.isArray(currentAuthority)) {
      for (let i = 0; i < currentAuthority.length; i += 1) {
        const element = currentAuthority[i];
        if (authority.indexOf(element) >= 0) {
          return target;
        }
      }
    }
    return Exception;
  }

  // string 处理
  if (typeof authority === 'string') {
    if (authority === currentAuthority) {
      return target;
    }
    if (Array.isArray(currentAuthority)) {
      for (let i = 0; i < currentAuthority.length; i += 1) {
        const element = currentAuthority[i];
        if (authority === element) {
          return target;
        }
      }
    }
    return Exception;
  }

  // Promise 处理
  if (isPromise(authority)) {
    return <PromiseRender ok={target} error={Exception} promise={authority as Promise<any>} />;
  }

  // Function 处理
  if (typeof authority === 'function') {
    try {
      const bool = authority(currentAuthority);
      // 函数执行后返回值是 Promise
      if (isPromise(bool)) {
        return <PromiseRender ok={target} error={Exception} promise={bool as Promise<any>} />;
      }
      if (bool) {
        return target;
      }
      return Exception;
    } catch (error) {
      throw error;
    }
  }
  throw new Error('unsupported parameters');
};


export default checkPermissions;


