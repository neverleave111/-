import type { FC } from "react";
import { Button } from "antd";
import "antd/dist/reset.css";
import "./App.css";

const App: FC = () => {
  console.log(1)
  console.log('main')
  return (
    <div className="App">
      <Button type="primary">Button</Button>
    </div>
  );
};

export default App;
