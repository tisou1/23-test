/**
 * 时间线组件Chrono使用
 */
import { Chrono } from 'react-chrono'

export default function Chrono1() {
  const items = [
    {
      title: 'May 1940',
      cardTitle: 'Dunkirk',
      url: 'http://www.history.com',
      cardSubtitle: 'Men of the British Expeditionary Force (BEF) wade out to..',
      cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
      media: {
        type: 'IMAGE',
        source: {
          url: 'http://someurl/image.jpg',
        },
      },
    },
    {
      title: 'May 1940',
      cardTitle: 'Dunkirk',
      url: 'http://www.history.com',
      cardSubtitle: 'Men of the British Expeditionary Force (BEF) wade out to..',
      cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
      media: {
        type: 'IMAGE',
        source: {
          url: 'http://someurl/image.jpg',
        },
      },
    },
    {
      title: 'May 1940',
      cardTitle: 'Dunkirk',
      url: 'http://www.history.com',
      cardSubtitle: 'Men of the British Expeditionary Force (BEF) wade out to..',
      cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
      media: {
        type: 'IMAGE',
        source: {
          url: 'http://someurl/image.jpg',
        },
      },
    },
  ]

  return (
    <div style={{ width: '500px', height: '400px' }}>
        <Chrono items={items} />
      </div>
  )
}
