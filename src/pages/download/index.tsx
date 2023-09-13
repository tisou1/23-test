import fs from 'node:fs'
import React from 'react'
import axios from 'axios'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import JSPDF from 'jspdf'
import html2canvas from 'html2canvas'

import { base64File } from './base64'

const new_zip = new JSZip()
// 文件流下载,以及压缩包处理
export default function Download() {
  const handleClick = async () => {
    const doc = await handleDownLoad('pdf')

    getData({
      name: 'siry',
    }, 'http://localhost:5000/download', doc)

    // list
    // getList({
    //   name: 'siry',
    // }, 'http://localhost:5000/images', doc)

    //
    // getBase64Data({
    //   name: 'siry',
    // }, 'http://localhost:5000/images', doc)

    // saveBase64Images({ content: base64File }, 'pdf')
  }
  return (
    <div>
      <button onClick={handleClick}>下载</button>
      <div className='pdf'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nostrum blanditiis quibusdam magni cumque placeat quidem saepe, ut ipsa distinctio totam ad deleniti illum voluptatum rem eveniet consectetur repellat magnam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, atque obcaecati doloribus labore et odit minus vitae reiciendis beatae aliquid, magni error numquam assumenda laudantium doloremque temporibus expedita maiores modi?
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae eum blanditiis facere inventore maiores sequi fugiat et sunt, consequatur architecto at libero excepturi qui labore dignissimos. Delectus doloremque voluptas velit?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil molestias quasi eveniet quos, omnis mollitia fugiat ipsum accusantium delectus sapiente id, ex unde minima, aperiam sint soluta excepturi tempore vero?
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos omnis quisquam temporibus modi dolores fugiat quae repudiandae, a ratione vel commodi illum quia necessitatibus veniam laboriosam itaque? Assumenda, corrupti iusto?
      </div>
    </div>
  )
}
// 接口返回数组
function getList(params, url, doc) {
  axios({
    method: 'post',
    url,
    data: params,
  }).then((res) => {
    const list = res.data.list
    list.forEach((item) => {
      const imageBlob = base64ToBlob(item.base64)
      const fileName = item.fileName
      new_zip.folder('images').file(`${fileName}`, imageBlob)
    })

    // 保存pdf
    new_zip.file('新建.pdf', doc.output('blob'))
    // 保存文件
    new_zip.generateAsync({ type: 'blob' }).then((res) => {
      // 方案一 使用file-save
      // saveAs(res, 'files.zip')

      // 方案二使用a标签
      const nextBlob = new Blob([res])
      const url = window.URL.createObjectURL(nextBlob as Blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'files.zip')
      document.body.appendChild(link)
      link.click()
      link.remove()
      // 释放url
      URL.revokeObjectURL(url)
    })
  })
}
// 接口返回文件流
function getData(params, url, doc) {
  // fetch 下载
  fetch(url, {
    method: 'post',
    body: JSON.stringify({
      name: 'siry',
    }),
  }).then(res => res.blob()).then((blob) => {
    const nextBlob = new Blob([blob])
    const url = window.URL.createObjectURL(nextBlob)
    const link = document.createElement('a')
    link.href = url
    link.style.display = 'none'
    link.setAttribute('download', 'files.zip')
    document.body.appendChild(link)
    link.click()
    link.remove()
    // 释放url
    URL.revokeObjectURL(url)
  })
  return
  // axios下载
  axios({
    method: 'post',
    url,
    data: params,
    responseType: 'blob',
  }).then((res) => {
    // , { type: 'application/zip' }
    // 第二个参数指定类型
    console.log(res.data)
    // const blob = new Blob([res.data])

    // const nextBlob = new Blob([res.data])
    // console.log(typeof res.data)
    // const url = window.URL.createObjectURL(nextBlob)
    // const link = document.createElement('a')
    // link.href = url
    // link.setAttribute('download', 'files.zip')
    // document.body.appendChild(link)
    // link.click()
    // link.remove()
    // // 释放url
    // URL.revokeObjectURL(url)

    // const fileReader = new FileReader()
    // fileReader.readAsDataURL(blob)
    // fileReader.onloadend = function (res) {
    //   console.log(fileReader.result, '>>')
    // }

    // 读取压缩包
    // new_zip.loadAsync(blob).then((zip) => {
    //   // 添加新的文件
    //   zip.file('file.txt', 'content')
    //   // 添加pdf
    //   if (typeof doc !== 'undefined') {
    //     try {
    //       zip.file('新建.pdf', doc.output('blob'))
    //     }
    //     catch {
    //       console.error('Something went wrong!')
    //     }
    //   }

    // a 这种直接利用file-save进行下载
    // zip.generateAsync({ type: 'blob' }).then((res) => {
    //   saveAs(res, '文件.zip')
    // })

    // b 将接口返回的文件流用zip打开,然后插入新文件,在将这个zip对象转为流,利用下面的a标签进行下载
    //   zip.generateAsync({ type: 'blob' }).then((res) => {
    //     const nextBlob = new Blob([res])
    //     const url = window.URL.createObjectURL(nextBlob as Blob)
    //     const link = document.createElement('a')
    //     link.href = url
    //     link.setAttribute('download', 'static.zip')
    //     document.body.appendChild(link)
    //     link.click()
    //     link.remove()
    //     // 释放url
    //     URL.revokeObjectURL(url)
    //   })
    // })
  }).catch((err) => {
    console.log(err)
  })
}

function downloadByBlob(res: string, fileName = '未命名.zip') {
  if (!res)
    return

  const url = window.URL.createObjectURL(new Blob([res]))
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.setAttribute('download', fileName)
  document.body.appendChild(a)
  a.click()

  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

// 返回base64编码的zip包

function getBase64Data(params, url, doc) {
  const fileBlob = base64ToBlob2(base64File)
  // new_zip.file('wenjian.zip', fileBlob)

  // todo 将接口返回的压缩包,解压之后和pdf保存到新的压缩包(同级)
  new_zip.loadAsync(fileBlob).then((zip) => {
    // 添加pdf
    new_zip.file('新建.pdf', doc.output('blob'))

    zip.generateAsync({ type: 'blob' }).then((res) => {
      // 方案一 使用file-save
      saveAs(res, 'files.zip')
    })
  })
}

// pdf
const SPACE_X = 0
const SPACE_Y = 4
async function handleDownLoad(name: string) {
  const pdf = new JSPDF('', 'pt', 'a4')
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()
  const chartEles = [...document.getElementsByClassName(name)]
  chartEles[0].classList.add('jspdf-download')
  let num = 0
  const execute = async (chartEle, infoEle) => {
    const chartCanvas = await html2canvas(chartEle)
    const imgProps = pdf.getImageProperties(chartCanvas)
    const data = chartCanvas.toDataURL('image/jpeg', 1.0)
    const chartHeight = (imgProps.height * pdfWidth) / imgProps.width
    pdf.addImage(data, 'JPEG', SPACE_X, SPACE_Y, pdfWidth, chartHeight)
    if (infoEle) {
      const cloneElement = infoEle.cloneNode(true)
      cloneElement.className = 'eva-pdf-item'
      document.body.appendChild(cloneElement)
      const canvas = await html2canvas(cloneElement)
      const contentWidth = canvas.width
      const contentHeight = canvas.height

      // 一页pdf显示html页面生成的canvas高度;
      const pageHeight = (contentWidth / pdfWidth) * pdfHeight
      // 未生成pdf的html页面高度
      let leftHeight = contentHeight
      // 页面偏移
      let position = 0

      // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      const imgWidth = pdfWidth
      const imgHeight = (pdfWidth / contentWidth) * contentHeight

      const pageData = canvas.toDataURL('image/jpeg', 1.0)
      let firstPage = true

      while (leftHeight > 0) {
        const startY = firstPage ? position + chartHeight + 2 * SPACE_Y : position
        pdf.addImage(pageData, 'JPEG', SPACE_X, startY, imgWidth, imgHeight)
        leftHeight -= pageHeight
        position -= pdfHeight
        if (firstPage) {
          leftHeight = leftHeight + (contentWidth / pdfWidth) * startY
          position = position + startY
          firstPage = false
        }
        // 避免添加空白页
        if (leftHeight > 0)
          pdf.addPage()
      }
      document.body.removeChild(cloneElement)
    }

    num++
    if (num === chartEles.length) {
      // pdf.save('可解释性报告.pdf')
      // const doc = pdf.output('blob')
      console.log(pdf)
      return pdf
    }
    else {
      pdf.addPage()
      execute(chartEles[num])
    }
    chartEles[0].classList.remove('jspdf-download')
  }
  return await execute(chartEles[0])
}

function base64ToBlob(base64Image: string) {
  // Split into two parts
  const parts = base64Image.split(';base64,')

  // Hold the content type
  const imageType = parts[0].split(':')[1]

  // Decode Base64 string
  const decodedData = window.atob(parts[1])

  // Create UNIT8ARRAY of size same as row data length
  const uInt8Array = new Uint8Array(decodedData.length)

  // Insert all character code into uInt8Array
  for (let i = 0; i < decodedData.length; ++i)
    uInt8Array[i] = decodedData.charCodeAt(i)

  // Return BLOB image after conversion
  return new Blob([uInt8Array], { type: imageType })
}

function base64ToBlob2(base64Image: string) {
// // Split into two parts
// const parts = base64Image.split(';base64,')

  // // Hold the content type
  // const imageType = parts[0].split(':')[1]

  // Decode Base64 string
  const decodedData = window.atob(base64Image)

  // Create UNIT8ARRAY of size same as row data length
  const uInt8Array = new Uint8Array(decodedData.length)

  // Insert all character code into uInt8Array
  for (let i = 0; i < decodedData.length; ++i)
    uInt8Array[i] = decodedData.charCodeAt(i)

  // Return BLOB image after conversion
  return new Blob([uInt8Array])
}

function saveBase64Images2(base64Data, pdfDom = '') {
  // 创建jszip实例
  const zip = new JSZip()
  // 取出压缩包的base64编码数据
  const base64Content = base64Data.content
  const blobContent = base64ToBlob2(base64Content)

  zip.loadAsync(blobContent).then((nextZip) => {
    // 根据传入的参数来判断要不要下载pdf
    if (typeof pdfDom === 'string' && pdfDom !== '') {
      // 调用pdf下载方法
      // 下面的保存方法也是异步promise,所以这里pdf还是会先执行(eventloop)
      handleDownLoad(pdfDom).then((pdfBlob) => {
        nextZip.file(`${pdfDom}.pdf`, pdfBlob?.output('blob'))
      })
    }

    // 保存压缩包
    nextZip.generateAsync({ type: 'blob' }).then((res) => {
      const nextBlob = new Blob([res])
      const url = window.URL.createObjectURL(nextBlob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'files.zip')
      document.body.appendChild(link)
      link.click()
      link.remove()
      // 释放url
      URL.revokeObjectURL(url)
    })
  })
}

/**
 *
 * @param base64Data
 * @param pdfDom
 */
async function saveBase64Images(base64Data, pdfDom = '') {
  // 创建jszip实例
  const zip = new JSZip()
  // 取出压缩包的base64编码数据
  const base64Content = base64Data.content
  const blobContent = base64ToBlob2(base64Content)

  const nextZip = await zip.loadAsync(blobContent)

  // 根据传入的参数来判断要不要下载pdf
  if (typeof pdfDom === 'string' && pdfDom !== '') {
    // 调用pdf下载方法
    // 下面的保存方法也是异步promise,所以这里pdf还是会先执行(eventloop)
    const pdfBlob = await handleDownLoad(pdfDom)
    nextZip.file(`${pdfDom}.pdf`, pdfBlob?.output('blob'))
  }

  // 保存压缩包
  const res = await nextZip.generateAsync({ type: 'blob' })
  const nextBlob = new Blob([res])
  const url = window.URL.createObjectURL(nextBlob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'files.zip')
  document.body.appendChild(link)
  link.click()
  link.remove()
  // 释放url
  URL.revokeObjectURL(url)
}
