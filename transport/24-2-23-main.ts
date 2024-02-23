import parseTar from '../src/parseTar';
import parseTar2 from '../src/parseTar2';

import { decompressSync,gunzip,gunzipSync } from 'fflate';
(async () => {
  // const file = await fetch(new URL('./file.tar.gz', import.meta.url)).then(val => val.blob());
  // const tar = decompressSync(new Uint8Array(await file.arrayBuffer()));
  // // const tar = await fetch(new URL('./test2.tar', import.meta.url)).then(val => val.blob());
  // console.log({ tar });
  // const files = await parseTar(tar);
  // console.log(await Promise.all([...files.map(val => val.contents.text())]));


  // ======已知是gzip压缩====  未知的话就可以使用decompressSync方法,会自动判断是gzip,还是zlib等压缩方式进行处理
  const file = await fetch(new URL('./8tb5_ligand_20.tar', import.meta.url)).then(val => val.blob());
  await gungzip(file);
  // 异步回调的方式
  // gunzip(new Uint8Array(await file.arrayBuffer()),async (_, data) => {
  //     console.log(data,'???')
  //     const files = await parseTar(data);
  //     console.log(files);
  // });

  // 同步的方式
  // const tar = gunzipSync(new Uint8Array(await file.arrayBuffer()))
  // console.log({ tar });
  // const files = await parseTar(tar);
  // console.log(files);
  // console.log(Promise.all([...files.map(val => val.contents.text())]));
})();

/**
 * 接收一个Uint8Array / (file / blob)可调用arrayBuffer()方法转为buffer,然后在使用Uint8Array构造函数转为二进制的Uint8Array 
 * 只针对.tar类型的文件
 * 
 * tar 归档文件的头部包含一个标识字段，通常称为 "magic" 字段。tar 的标识字段是一个 ASCII 字符串，它通常是 "ustar\0"（其中 \0 表示空字符）。这个字段的位置通常在文件头部的 257-262 字节。
 */
async function gungzip(file: Uint8Array | Blob){
  // 转换为Uint8Array类型
  const ifb = file instanceof Blob ? new Uint8Array(await file.arrayBuffer()) : file
  // 判断是否是经过了gzip压缩
  if(ifb[0] == 31 && ifb[1] == 139 && ifb[2] == 8) {
    console.log('gzip压缩');
    // 使用fflate进行解压成tar
    const tarfile = await gzip2Tar(ifb)
    // 解析tar文件成最终结果
    const target = await untar(tarfile)
    console.log('target:', target);
  } else if(isTar(ifb)){
    // 判断是否是tar
    console.log('tar归档')
    const res = await untar(ifb)
    console.log('res:', res);
  }
}

function isTar(file: Uint8Array): boolean {
  const tarSignature = [0x75, 0x73, 0x74, 0x61, 0x72, 0x00]; // "ustar\0"
  const fileSignature = file.subarray(257, 263);
  if (Array.from(fileSignature).every((value, index) => value === tarSignature[index])) {
    return true
  } else {
    return false
  }
}

// gzip to tar
async function gzip2Tar(file: Uint8Array): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    gunzip(file, async (err, data) => {
      if(err) {
        reject(err)
      } else {
        resolve(data)
      }
  });
  })
}

// parse tar
async function untar(file: Uint8Array) {
  // 调用手写的方法
  return await parseTar2(file);
}




export default async function parseTar2(tarfile:  Uint8Array) {
        const input = tarfile;
        const noOfBlocks = input.byteLength / 512;
        const files: Readonly<TarFile>[] = [];
        {
          let blockIdx = 0;
          while (blockIdx < noOfBlocks) {
            const block = input.slice(blockIdx * 512, (blockIdx + 1) * 512);
            if (isEmptyBlock(block)) break;
            console.log(Object.prototype.toString.call(block.buffer));
            const file = parseTarHeader(block.buffer);
            const fileBlocksCount = Math.ceil(file.size / 512);
            file.contents = input
              .slice((blockIdx + 1) * 512, (blockIdx + 1 + fileBlocksCount) * 512)
              .slice(0, file.size);
            files.push(Object.freeze(file!));
            blockIdx += fileBlocksCount + 1;
          }
          return files;
        }
}

function isEmptyBlock(block: Uint8Array): boolean {
    return block.every(val => val === 0);
}

export interface TarFile {
    name: string;
    size: number;
    dir: boolean;
    contents?: Blob | Uint8Array 
}
function parseTarHeader(header: ArrayBuffer) {
    const file: TarFile = {
        name: '',
        size: 0,
        dir: false
    };
    file.name = readString(header, 0, 100);
    file.size = readOctal(header, 124, 12);
    const ftype = readString(header, 156, 1);
    file.dir = ftype === '5';

    return file;
}

function readString(header: ArrayBuffer, start = 0, size?: number): string {
    const view = new DataView(header, start, size || header.byteLength - start);
    let nullIndex = -1;

    // 寻找 null 字节的索引
    for (let i = 0; i < view.byteLength; i++) {
        if (view.getUint8(i) === 0) {
            nullIndex = i;
            break;
        }
    }

    // 如果未找到 null 字节，使用整个视图的长度
    const length = nullIndex !== -1 ? nullIndex : view.byteLength;

    // 通过 DataView 直接创建字符串
    const stringValue = new TextDecoder('utf-8').decode(new Uint8Array(header, start, length));

    return stringValue;
}

function readOctal(header: ArrayBuffer | Uint8Array, start = 0, end?: number) {
    return parseInt(readString(header, start, end), 8);
}




<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <script>

    function createWorker(fn) {
      let blob = new Blob(['(' + fn.toString() + ')()'])
      let url = window.URL.createObjectURL(blob)
      let worker = new Worker(url)
      return worker
    }


    let workerThread = createWorker(function() {
      let count = 1
      setInterval(function(){
        console.log('workder执行');
        // 发送消息给主线程
        self.postMessage(`执行次数:${count++}`);
      }, 1000)


      self.addEventListener('message', function(e) {
        console.log('接受自主线程的消息:', e.data)
      })
    })


    // 监听worker线程的消息
    workerThread.onmessage = function (event) {
      console.log('接收来自worker线程的消息' + event.data);
    }

    // 向worker线程发送消息
    workerThread.postMessage('start...');


    // 10s后关闭worker线程
    setTimeout(() => {
      workerThread.terminate()
    }, 10000)
  </script>
</body>
</html>
