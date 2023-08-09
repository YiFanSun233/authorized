# 权限组件，通过比对现有权限与准入权限，决定相关元素的展示

### API

#### 参数类型

```ts
/**
 * @param { string | array | Promise | Function } authority 权限判定
 * @param { string | string[]} currentAuthority 当前权限
 * @param { ReactNode } target 通过组件
 * @param { ReactNode } Exception 未通过组件
 * /
```

### renderPermission

```ts
  renderPermissions: (authority: Authority, currentAuthority: CurrentAuthority, target: ReactNode, Exception: ReactNode) => string | number | boolean | Iterable<ReactNode> | JSX.Element | null | undefined
```

### renderAuthorize

### Props
  
```ts
  currentAuthority: string | string[]
```

### 使用方式一

```tsx
import { renderPermission } from '@sunfy/authorized'

function App(){

  const permissionA = renderPermission(['admin'], ['admin'], 'ok', 'error')
  const permissionB = renderPermission(['admin','user'], 'user', 'ok', 'error')

  return (
    <>
      {permissionA}
      {permissionB}
    </>
  )
}

```

### 使用方式二

```tsx
import renderAuthorize from '@sunfy/authorized'

const Admin = renderAuthorize('admin')
const User = renderAuthorize('user')

function App(){
  return (
    <>
      <Admin authority={'admin'} noMatch={<>Error</>}>
        I am admin
      </Admin>
      <User authority={'user'} noMatch={<>Error</>}>
        I am user
      </User>
    </>
  )
}


```