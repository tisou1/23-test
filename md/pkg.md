

## execa

  使用node子进程来执行命令

使用

```js
import { $, execa, execaCommand } from 'execa'

// 1. cwd的默认值就是process.cwd(), 设置子进程的当前工作目录
// const {stdout} = await execa('pnpm', ['add','axios'],  { stdio: 'inherit', cwd: process.cwd() })
// console.log(stdout);

// 2.
// const branch = await $({stdio: 'inherit'})`pnpm add dayjs`;
// console.log(branch);

// 3.
await execaCommand('pnpm add lodash-es', { stdio: 'inherit', cwd: process.cwd() })
```