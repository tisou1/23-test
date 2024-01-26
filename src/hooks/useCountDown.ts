import { count } from 'console';
import {useEffect, useState, useRef, useCallback} from 'react';
import useInterval from './useInterval'

/**
 * 使用倒计时。
 * @param initialCountdown 初始计数时间（单位：秒）。
 * @param callback 计数结束后的回调函数。
 * @param interval 更新计数时间间隔（默认值：1000），以毫秒为单位。
 * @returns 返回当前计数时间。
 */
function useCountdown(initialCountdown: number, callback: () => void, interval = 1000) {
    const [countdown, setCountdown] = useState(initialCountdown);
    const fnRef = useRef(callback);
    const timeRef = useRef();

    useEffect(() => {
      // 这里在渲染后阶段保存, 也可以在渲染阶段
      fnRef.current = callback;
    })

    useEffect(() => {
      if(countdown == 0 ) {
        clearInterval(timeRef.current);
        console.log('清除定时器...')
        // 执行回调函数...
        fnRef.current();
      }
    }, [countdown])

    // 开启定时的effect,在参数传入不变的情况下, 只会执行一下
    useEffect(() => {
        console.log('effect执行,.,,');

        function decrementCountdown() {
            setCountdown(prevCountdown => prevCountdown - 1);
        }

        timeRef.current = setInterval(decrementCountdown, interval);

        return () => {
            if (timeRef.current) {
                console.log('卸载,.,,');
                clearInterval(timeRef.current);
            }
        };
    }, [initialCountdown, interval]);


    return countdown;
}


/*
  这里使用的useInterval参考dan的博客 https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  再次基础上来实现useCountDown

*/

export function useCountdown2(initialCountdown: number, callback: () => void, interval = 1000) {
  const [countdown, setCountdown] = useState(initialCountdown);
  const fnRef = useRef(callback);
  const [isRunning, setIsRunning] = useState<number | null>(interval)

  useEffect(() => {
    // 这里在渲染后阶段保存, 也可以在渲染阶段
    fnRef.current = callback;
  })

  const countDownFn = useCallback(() => {
    if(countdown == 0) {
      fnRef.current();
      // 停止计时器
      setIsRunning(null)
      return 
    }
    setCountdown(countdown - 1)
  },[countdown])

  useInterval(countDownFn, isRunning ? interval : null);

  return countdown;
}
export default useCountdown;
