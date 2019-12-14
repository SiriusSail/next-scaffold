
//获取环境变量，暴露前端需要的环境变量，在pages/_document.js 引用挂载在window.process.env上
const {BASE_URL} = process.env;
export default function () {
    return {
        BASE_URL
    }
}