import Link from "next/link";
import TestA from "../../components/test/TestA";
import TestB from "../../components/test/TestB";
import TestAxios from "../../components/test/TestAxios";

const Index = props => {
  return (
    <div>
      这里是移动端项目首页
      <div>
        组件A <TestA/>
      </div>
      <hr/>
      <div>
        组件B <TestB/>
      </div>
      <hr/>
      <div>
        请求测试组件<TestAxios/>
      </div>
    </div>
  )
};

export default Index