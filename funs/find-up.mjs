import {findUp} from 'find-up'
import path, {resolve} from 'node:path'
import fs from 'node:fs'

// console.log(await findUp(['unicorn.png', 'index.md']));

console.log(process.cwd())
console.log(path.dirname('/home/cd/1.js'))



function findUP(path, options = {}) {
  const paths = [path].flat();// 统一成数组

  const cwd = options.cwd || process.cwd()

  const ans = []

  for(let path of paths) {
    // 检测目录文件
    let filepath = resolve(cwd, path)
    console.log(filepath,">>")
    // 判断文件存不存在
    try {
      // 第二个参数, 制定访问模式
      fs.accessSync(filepath);
      console.log('can read/write');
      ans.push(filepath)
    } catch (err) {
      console.error('no access!');
    } 
  }


  return ans
}



console.log(
  findUP(['unicorn.png', 'index.md'])
)