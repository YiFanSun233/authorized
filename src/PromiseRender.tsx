import React, { ComponentType, FC, ReactNode, useEffect, useState } from 'react';

interface IPromiseRender {
  ok: ReactNode;
  error: ReactNode;
  promise: Promise<any>;
}

const PromiseRender: FC<IPromiseRender> = ({
  ok, error, promise
}) => {
  const [Component, setComponent] = useState<ComponentType<any>>()

  useEffect(() => {
    const _ok = checkIsInstantiation(ok);
    const _error = checkIsInstantiation(error);
    promise.then(() => {
      setComponent(_ok)
    }).catch(() => {
      setComponent(_error)
    })
  })
  return Component ? (
    <Component />
  ) : (
    'lodaing'
  )
}

export default PromiseRender

const checkIsInstantiation = (target: any): any => {
  if (!React.isValidElement(target)) {
    return target;
  }
  return () => target;
};
