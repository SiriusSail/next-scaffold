import App from 'next/app';
import { getCookie, isServer, getUrlData } from './../lib/commonService';
import PcCon from "../pcCommComponents/PcCon";
import MobileCon from "../commComponents/MobileCon";
const isPcOrMobile = require("../nodeApi/isPc");
// import 'antd/dist/antd.css'
class MyApp extends App {

    static getInitialProps = async ({Component, ctx}) => {
        let pageProps;
        let isPc;
        if(isServer) {
            console.log("HELLO_MSG="+process.env.HELLO_MSG);
            isPc = isPcOrMobile(ctx.req).isPc;
            ctx.res.cookie('isPc', isPc);
        }else{
            // alert(navigator.cookieEnabled);
            const cookiePc = cookies.get('isPc');
            isPc = parseInt(cookiePc);
        }
        if(Component.getInitialProps) {
            pageProps = await Component.getInitialProps()
        }
        return {
            pageProps,
            isPc
        }
    };

    render() {
        const { Component, pageProps, isPc } = this.props;

        return (
            <div>
                {isPc?
                    <PcCon>
                        <Component {...this.props}/>
                    </PcCon>
                    : <MobileCon>
                        <Component {...this.props}/>
                    </MobileCon> }

            </div>
        )
    }
}

export default MyApp