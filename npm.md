# npm发包

## 1.注册

去[npm官网](https://www.npmjs.com/signup)注册一个npm账号

## 2. 本地登录

npm login 根据提示输入用户名,密码,邮箱, 还有验证码

> 老版本可以使用npm adduser来进行登录

此命令有两个选项参数

- registry,指定登录的注册表地址. 默认值是"https://registry.npmjs.org/", 也可以通过在项目中配置.npmrc来设置registry

npm login --registry="https://registry.npmjs.org/"

- scope 默认值是当前项目范围内

类似@baidu/react-common, 这里的@baidu就是一个scope

这里需要再详细一点, 自己有点晕

> pm WARN adduser `adduser` will be split into `login` and `register` in a future version. `adduser` will become an > alias of `register`. `login` (currently an alias) will become its own command.


## 3. 发包

- 发包之前需要确认发布的npm包的名字在源上有没有重复的. 直接去官网搜一下.
- npm pack 可以查看要发布包的信息,本地生成一个tgz包.
- npm publish 发包 `npm publish <package-spec>`
  如果要发布的包前面有scope, 可能会报错
  > 402 Payment Required - PUT https://registry.npmjs.org/@tisou1%2fnl - You must sign up for private packages
  这时候需要设置一下要发布的是公有源使用`npm publish --access=public`
  如果package.json中name中不包含scope的话, `access`默认就是public

  参数可以加--registry, 来指定要发布的源.



## 删除包的某个版本

`npm unpublish [<package-spec>]`

npm unpublish lodash-es 删除最新版本
npm unpublish lodash-es@0.01 删除0.01版本

- 只能所有者使用
- 包会在注册表上保留24小时后彻底删除