import Link from "next/link";
import TestA from "../../components/test/TestA";
import TestB from "../../components/test/TestB";
const Index = props => {
    return (
        <div>
            这里是移动端项目首页
            组件A <TestA/>
            组件B <TestB/>
        </div>
    )
};

export default Index