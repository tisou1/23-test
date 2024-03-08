export default async function parseTar(tarfile: Blob | File) {
  if (tarfile instanceof Blob) {
    const input = new Blob([tarfile])
    const noOfBlocks = input.size / 512
    const files: Readonly<TarFile>[] = []
    let blockIdx = 0
    while (blockIdx < noOfBlocks) {
      const block = input.slice(blockIdx * 512, (blockIdx + 1) * 512)
      if (await isEmptyBlock(block))
        break
      const file = parseTarHeader(await block.arrayBuffer())
      const fileBlocksCount = Math.ceil(file.size / 512)
      // file.contents = input
      //     .slice((blockIdx + 1) * 512, (blockIdx + 1 + fileBlocksCount) * 512)
      //     .slice(0, file.size);
      files.push(Object.freeze(file!))
      blockIdx += fileBlocksCount + 1
    }
    return files
  }
}

function isEmptyBlock(block: Blob): Promise<boolean> {
  return block
    .arrayBuffer()
    .then(val => new Uint8Array(val))
    .then(buf => buf.every(val => val === 0))
    // return block.every(val => val === 0);
}

export interface TarFile {
  name: string
  size: number
  dir: boolean
}
function parseTarHeader(header: ArrayBuffer) {
  const file: TarFile = {
    name: '',
    size: 0,
    dir: false,
  }
  file.name = readString(header, 0, 100)
  file.size = readOctal(header, 124, 12)
  const ftype = readString(header, 156, 1)
  file.dir = ftype === '5'

  return file
}

function readString(header: ArrayBuffer, start = 0, size?: number): string {
  const view = new DataView(header, start, size || header.byteLength - start)
  let nullIndex = -1

  // 寻找 null 字节的索引
  for (let i = 0; i < view.byteLength; i++) {
    if (view.getUint8(i) === 0) {
      nullIndex = i
      break
    }
  }

  // 如果未找到 null 字节，使用整个视图的长度
  const length = nullIndex !== -1 ? nullIndex : view.byteLength

  // 通过 DataView 直接创建字符串
  const stringValue = new TextDecoder('utf-8').decode(new Uint8Array(header, start, length))

  return stringValue
}
function readOctal(header: ArrayBuffer, start = 0, end?: number) {
  return Number.parseInt(readString(header, start, end), 8)
}
