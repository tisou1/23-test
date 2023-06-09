# npm发包

## 1.注册

去[npm官网](https://www.npmjs.com/signup)注册一个npm账号

## 2. 本地登录

npm login 根据提示输入用户名,密码,邮箱, 还有验证码

> 老版本可以使用npm adduser来进行登录

此命令有两个选项参数

- registry,指定登录的注册表地址. 默认值是"https://registry.npmjs.org/", 也可以通过在项目中配置.npmrc来设置registry,或者 npm config set registry https://registry.npmjs.org/

npm login --registry="https://registry.npmjs.org/"

- scope 默认值是当前项目范围内

类似@baidu/react-common, 这里的@baidu就是一个scope

> npm login --scope=@mycompany --registry=http://registry.mycompany.com 将指定scope与源进行关联,后续安装@mycompany/packageName时,会从指定的源上安装. 后续发包也会发到该源上.  一般scope是在私有源上使用., 发布公有包,一般是不需要指定scope的

## 3. 发包

- 发包之前需要确认发布的npm包的名字在源上有没有重复的. 直接去官网搜一下.
- npm pack 可以查看要发布包的信息,本地生成一个tgz包.
- npm publish 发包 `npm publish <package-spec>`
  如果要发布的包前面有scope, 可能会报错. 发布一个带scope的包一定要加上--access=public参数，表示公开免费
  > 402 Payment Required - PUT https://registry.npmjs.org/@tisou1%2fnl - You must sign up for private packages
  
  这时候需要设置一下要发布的是公有源使用`npm publish --access=public`
  如果package.json中name中不包含scope的话, `access`默认就是public

  参数可以加--registry, 来指定要发布的源.

## 4. 删除包的某个版本

`npm unpublish [<package-spec>]`

npm unpublish lodash-es 删除最新版本
npm unpublish lodash-es@0.01 删除0.01版本

- 只能所有者使用
- 包会在注册表上保留24小时后彻底删除

## 5.百度发包(发布私有包)

[参考链接](http://fe.baidu-int.com/npm/usage)

步骤和npm发包一致, 只需要我们更换一下源(注册表URL)为`http://registry.npm.baidu-int.com`

**登录信息**
账户: 百度邮箱前缀
密码: xxx
邮箱: 百度邮箱