import { Spin } from 'antd';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black/7">
      <Spin size="large" />
    </div>
  );
};

export default Loading;
