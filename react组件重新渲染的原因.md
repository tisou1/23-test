## react组件重新渲染的原因

1. state改变
2. 父组件重新渲染
3. context变化
4. hooks变化
5. ±—props的改变

props发生改变,说明父组件重新渲染了



[参考链接](https://www.developerway.com/posts/react-re-renders-guide)



## 阻止重新渲染

错误方式: 在组件渲染阶段声明子组件

```jsx
import { useState, useEffect } from "react";
import "./styles.css";

const Component = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  const VerySlowComponent = () => {
    console.log("Very slow component re-renders");
    useEffect(() => {
      console.log("Very slow component re-mounts");
    }, []);
    return <div>Very slow component</div>;
  };

  return (
    <>
      <button onClick={onClick}>click here</button>
      <VerySlowComponent />
    </>
  );
};

const App = () => {
  return (
    <>
      <h2>Open console, click a button</h2>
      <p>Slow component will re-mount on every click</p>

      <Component />
    </>
  );
};

export default App;

```

当state每次变化时, `VerySlowComponent`都会重新创建



### 状态下移

将变化的部分移动到子组件中

```jsx
import { useState } from "react";
import "./styles.css";

const VerySlowComponent = () => {
  console.log("Very slow component re-renders");
  return <div>Very slow component</div>;
};

const FullComponent = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <>
      <h3>component with everything</h3>
      <p>Click this button - "slow" component will re-render</p>
      <p>Re-render count: {state}</p>
      <button onClick={onClick}>click here</button>
      <VerySlowComponent />
    </>
  );
};

const ComponentWithButton = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <>
      <p>Re-render count: {state}</p>
      <button onClick={onClick}>click here</button>
    </>
  );
};

const SplitComponent = () => {
  return (
    <>
      <h3>component with state moved down</h3>
      <p>Click this button - "slow" component will NOT re-render</p>
      <ComponentWithButton />
      <VerySlowComponent />
    </>
  );
};

const App = () => {
  return (
    <>
      <h2>Open console, click a button</h2>
      <p>Re-render should be logged on every click</p>

      <FullComponent />
      <hr />
      <hr />
      <SplitComponent />
    </>
  );
};

export default App;

```

这里  `<FullComponent />`和 `<SplitComponent />`就是两种方式, 后者就是状态下移后的优化

### 使用children作为props

变化的部分单独成一个组件,把不变的部分通过children传递给变化的组件

```jsx
import { useState } from "react";
import "./styles.css";

const VerySlowComponent = () => {
  console.log("Very slow component re-renders");
  return <div>Very slow component</div>;
};

const FullComponent = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <div onClick={onClick} className="click-block">
      <h3>component with everything</h3>
      <p>Click this component - "slow" component will re-render</p>
      <p>Re-render count: {state}</p>
      <VerySlowComponent />
    </div>
  );
};

const ComponentWithClick = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <div onClick={onClick} className="click-block">
      <p>Re-render count: {state}</p>
      {children}
    </div>
  );
};

const SplitComponent = () => {
  return (
    <>
      <ComponentWithClick>
        <>
          <h3>component with slow component passed as children</h3>
          <p>Click the block - "slow" component will NOT re-render</p>

          <VerySlowComponent />
        </>
      </ComponentWithClick>
    </>
  );
};

const App = () => {
  return (
    <>
      <h2>Open console, click a button</h2>
      <p>Re-render should be logged on every click</p>

      <FullComponent />
      <hr />
      <hr />
      <SplitComponent />
    </>
  );
};

export default App;

```

### 组件作为props

将状态封装在较小的组件内，并且重型组件作为 props 传递给它。道具不受状态变化的影响，因此重型组件不会重新渲染。

```jsx
import { useState, ReactNode } from "react";
import "./styles.css";

const VerySlowComponent = () => {
  console.log("Very slow component re-renders");
  return <div>Very slow component</div>;
};

const AnotherSlowComponent = () => {
  console.log("Another slow component re-renders");
  return <div>Another slow component</div>;
};

const FullComponent = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <div onClick={onClick} className="click-block">
      <h3>component with everything</h3>
      <p>Click this component - "slow" component will re-render</p>
      <p>Re-render count: {state}</p>
      <VerySlowComponent />
      <p>Something</p>
      <AnotherSlowComponent />
    </div>
  );
};

const ComponentWithClick = ({
  left,
  right
}: {
  left: ReactNode;
  right: ReactNode;
}) => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <div onClick={onClick} className="click-block">
      <p>Re-render count: {state}</p>
      {left}
      <p>Something</p>
      {right}
    </div>
  );
};

const SplitComponent = () => {
  const left = (
    <>
      <h3>component with slow components passed as props</h3>
      <p>Click the block - "slow" components will NOT re-render</p>

      <VerySlowComponent />
    </>
  );

  const right = <AnotherSlowComponent />;

  return (
    <>
      <ComponentWithClick left={left} right={right} />
    </>
  );
};

const App = () => {
  return (
    <>
      <h2>Open console, click a button</h2>
      <p>Re-render should be logged on every click</p>

      <FullComponent />
      <hr />
      <hr />
      <SplitComponent />
    </>
  );
};

export default App;

```

### 使用Memo

#### 子组件未接收props情况(单使用memo)

```jsx
import React, { useState } from "react";
import "./styles.css";

const Child = () => {
  console.log("Child re-renders");
  return <></>;
};

const ChildMemo = React.memo(Child);

const App = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <>
      <h2>Open console, click a button</h2>
      <p>Re-render should not happen since the child is memoized</p>
      <button onClick={onClick}>click here {state}</button>

      <ChildMemo />
    </>
  );
};

export default App;

```

#### 子组件接收props情况(memo + useMemo/useCallback)

当子组件有props时, 就需要搭配`useMemo`或者`useCallback`来进行缓存优化了

经过`useMemo`或者`useCallback`缓存之后,Memo在浅对比组件的`props`时就会通过,不会重新渲染子组件

```jsx
import React, { useState, useMemo } from "react";
import "./styles.css";

const Child = ({ value }: { value: { value: string } }) => {
  console.log("Child re-renders", value.value);
  return <>{value.value}</>;
};

const ChildMemo = React.memo(Child);

const App = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  const memoValue = useMemo(() => ({ value: "second" }), []);

  return (
    <>
      <h2>Open console, click a button</h2>
      <p>First child re-renders, since its props are not memoised</p>
      <p>Second child doesn't re-render</p>

      <button onClick={onClick}>click here</button>
      <br />
      <ChildMemo value={{ value: "first" }} />
      <br />
      <ChildMemo value={memoValue} />
    </>
  );
};

export default App;

```



> Memo必须作用于子元素/通过props传递的属性, 作用在父组件上是不行的
> 
> 下面例子中`ParentMemo`组件就没起到缓存作用



```jsx
import React, { useState, useMemo, ReactNode } from "react";
import "./styles.css";

const Child = ({ value }: { value: { value: string } }) => {
  console.log("Child re-renders", value.value);
  return <>{value.value}</>;
};

const ChildMemo = React.memo(Child);

const Parent = ({
  left,
  children
}: {
  children: ReactNode;
  left: ReactNode;
}) => {
  return (
    <div>
      {left}
      {children}
    </div>
  );
};

const ParentMemo = React.memo(Parent);

const App = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  const memoValue = useMemo(() => ({ value: "memoized" }), []);

  return (
    <>
      <h2>Open console, click a button</h2>
      <p>Children of memoized Parent should re-render</p>
      <p>Memoized children of not memoized parent should not</p>

      <button onClick={onClick}>click here</button>

      <ParentMemo
        left={<Child value={{ value: "left child of ParentMemo" }} />}
      >
        <Child value={{ value: "child of ParentMemo" }} />
      </ParentMemo>

      <Parent left={<ChildMemo value={memoValue} />}>
        <ChildMemo value={memoValue} />
      </Parent>
    </>
  );
};

export default App;

```



> 如果组件使用非原始值作为 `useEffect` 、 `useMemo` 、 `useCallback` 等挂钩中的依赖项，则应将其记忆化。

```jsx
import React, { useState, useMemo, useEffect } from "react";
import "./styles.css";

const App = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  const value = { value: "not memoized" };

  const memoValue = useMemo(() => ({ value: "memoized" }), []);

  useEffect(() => {
    console.log("never triggered");
  }, [memoValue]);

  useEffect(() => {
    console.log("triggered on every re-render");
  }, [value]);

  return (
    <>
      <h2>Open console, click a button</h2>
      <p>One of the effects will be triggered on every render</p>

      <button onClick={onClick}>click here</button>
    </>
  );
};

export default App;

```



#### useMemo用于昂贵的计算

useMemo的作用之一是避免每次重新渲染的昂贵计算

但是`useMemo`也是有成本的(小号一点内存并使初始化渲染稍慢),因此不应该讲useMemo应用在每个计算上

>  因此`useMemo`的典型应用是记忆React元素

```jsx
import React, { useState, useMemo } from "react";
import "./styles.css";

const Child = ({ value }: { value: { value: number } }) => {
  console.log("Child re-renders", value.value);
  return <>{value.value}</>;
};

const values = [1, 2, 3];

const App = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  const items = useMemo(() => {
    return values.map((val) => <Child value={{ value: val }} />);
  }, []);

  return (
    <>
      <h2>Open console, click a button</h2>
      <p>Children should not re-render</p>

      <button onClick={onClick}>click here {state}</button>
      <br />
      <br />
      {items}
    </>
  );
};

export default App;

```



### 提高列表渲染的性能

1. key属性会影响列表的性能

>  如果列表是静态的,不会进行添加/删除/插入/重排操作可以用index作为key

2. 随机值不能作为列表中的key,他们将导致每次组件重新渲染是都是一个新key,

### 防止context上下文重新渲染: 记忆Provider的值

```jsx
import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  ReactNode
} from "react";
import "./styles.css";

const Context = createContext<{ value: number }>({ value: 1 });
const Context2 = createContext<{ value: number }>({ value: 1 });

const Provider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  const value = useMemo(
    () => ({
      value: state
    }),
    [state]
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const Provider2 = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  const value = {
    value: state
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useValue = () => useContext(Context);
const useValue2 = () => useContext(Context2);

const Child1 = () => {
  const { value } = useValue();
  const { value: value2 } = useValue2();
  console.log("Child1 re-renders: ", value, value2);
  return <></>;
};

const Child2 = () => {
  const { value } = useValue();
  const { value: value2 } = useValue2();
  console.log("Child2 re-renders", value, value2);
  return <></>;
};

const Child1Memo = React.memo(Child1);
const Child2Memo = React.memo(Child2);

const App = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <Provider>
      <Provider2>
        <h2>Open console, click a button</h2>
        <p>
          Children will unnecessary re-render because of the second provider,
          which doesn't memoize value
        </p>
        <button onClick={onClick}>button {state}</button>
        <Child1Memo />
        <Child2Memo />
      </Provider2>
    </Provider>
  );
};

export default App;

```

> Children will unnecessary re-render because of the second provider, which doesn't memoize value

### 防止context上下文重新渲染: 拆分数据和api

```jsx
import {
  useState,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction
} from "react";
import "./styles.css";

const ContextData = createContext<number>(1);
const ContextApi = createContext<Dispatch<SetStateAction<number>>>(
  () => undefined
);
const Provider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(1);

  return (
    <ContextData.Provider value={state}>
      <ContextApi.Provider value={setState}>{children}</ContextApi.Provider>
    </ContextData.Provider>
  );
};

const useData = () => useContext(ContextData);
const useApi = () => useContext(ContextApi);

const Child1 = () => {
  const api = useApi();
  console.log("Child that uses API re-renders");

  const onClick = () => {
    api(Math.random());
  };

  return <button onClick={onClick}>Set random value to context</button>;
};

const Child2 = () => {
  const value = useData();
  console.log("Data child re-renders", value);
  return <>{value}</>;
};

const App = () => {
  return (
    <Provider>
      <h2>Open console, click a button</h2>
      <p>Only child that uses data will re-render</p>
      <p>Child that triggers data update doesn't</p>

      <Child1 />
      <Child2 />
    </Provider>
  );
};

export default App;

```



###  将多个数据拆分

```jsx
import {
  useState,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction
} from "react";
import "./styles.css";

const ContextData1 = createContext<number>(1);
const ContextData2 = createContext<string>("bla");

const Provider = ({ children }: { children: ReactNode }) => {
  const [numState, setNumState] = useState(1);
  const [strState, setStrState] = useState("bla");

  return (
    <ContextData1.Provider value={numState}>
      <ContextData2.Provider value={strState}>
        <button onClick={() => setNumState(numState + 1)}>
          click to change number
        </button>
        <button onClick={() => setStrState(`${strState}a`)}>
          click to change string
        </button>
        {children}
      </ContextData2.Provider>
    </ContextData1.Provider>
  );
};

const useNumData = () => useContext(ContextData1);
const useStrData = () => useContext(ContextData2);

const Child1 = () => {
  const num = useNumData();
  console.log("Child that uses num data re-renders");

  return <>{num}</>;
};

const Child2 = () => {
  const str = useStrData();
  console.log("Child that uses string data re-renders");

  return <>{str}</>;
};

const App = () => {
  return (
    <Provider>
      <h2>Open console, click a button</h2>
      <p>Click buttons to trigger independent data updates</p>
      <p>
        Children under the same context "provider", but updated independently
      </p>
      <Child1 />
      <Child2 />
    </Provider>
  );
};

export default App;

```

### 上下文选择器

上下文选择器可以通过使用高阶组件和 `React.memo` 来伪造。

```jsx
import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  ReactNode
} from "react";
import "./styles.css";

const Context = createContext<{ value: number; staticValue: string }>({
  value: 1,
  staticValue: ""
});

const Provider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  const value = useMemo(
    () => ({
      value: state,
      staticValue: "1"
    }),
    [state]
  );
  return (
    <Context.Provider value={value}>
      <button onClick={onClick}>click here</button>
      {children}
    </Context.Provider>
  );
};

const useValue = () => useContext(Context);

const Child1 = () => {
  const { value } = useValue();
  console.log("Child with dynamic value re-renders: ", value);
  return <>{value}</>;
};

const withStaticValueFromContext = (Component) => {
  const ComponentMemo = React.memo(Component);

  return () => {
    const { staticValue } = useValue();
    return <ComponentMemo staticValue={staticValue} />;
  };
};

const Child2 = ({ staticValue }: { staticValue: string }) => {
  console.log("Child with static value re-renders", staticValue);
  return <>{staticValue}</>;
};

const Child2WithStaticValue = withStaticValueFromContext(Child2);

const App = () => {
  return (
    <Provider>
      <h2>Open console, click a button</h2>
      <p>Only child with dynamic content will re-render</p>
      <p>Child that uses context "selector" won't</p>

      <Child1 />
      <Child2WithStaticValue />
    </Provider>
  );
};

export default App;

```

