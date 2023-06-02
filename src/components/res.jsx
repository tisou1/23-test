/**
 * @file modules/job/components/ResponseResizer
 * @description 响应式容器
 * @author wangtao
 */

import {useState, useRef} from 'react';

function ResponseResizer(props) {
    const {leftCard = null, rightCard = null} = props;

    const [siderWidth, setSiderWidth] = useState(594);
    const [dragging, setDragging] = useState(false);
    const [startPageX, setStartPageX] = useState(0);

    const ref = useRef(null);

    const handleMouseDown = event => {
        setStartPageX(event.pageX);
        setDragging(true);
    };
    // 实时更新位置
    const handleMouseMove = event => {
        const curParentWidth = ref?.current.offsetWidth;
        const currentSiderWidth = siderWidth + event.pageX - startPageX;
        if (currentSiderWidth < 594 || curParentWidth - currentSiderWidth < 594) {
            setDragging(false);
            return;
        }
        setSiderWidth(currentSiderWidth);
        setStartPageX(event.pageX);
    };
    const handleMouseUp = () => {
        setDragging(false);
        localStorage.setItem('siderWidth', siderWidth);
    };

    const handleMouseLeave = () => {
        setDragging(false);
    };

    return (
        <div className="response-main">
            <div className="workbench-root" ref={ref}>
                <div
                    className="workbench-card"
                    style={{userSelect: dragging ? 'none' : 'inherit'}}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="workbench-card-left card-item" style={{width: siderWidth}}>
                        {leftCard}
                    </div>
                    <div className="mosaic-split row" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                        <div className="mosaic-split-line" />
                    </div>
                    <div className="workbench-card-right card-item">{rightCard}</div>
                    <div
                        onMouseMove={handleMouseMove}
                        style={{
                            position: 'absolute',
                            inset: '0px',
                            zIndex: 90,
                            backgroundColor: 'transpratent',
                            display: dragging ? 'block' : 'none'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ResponseResizer;
