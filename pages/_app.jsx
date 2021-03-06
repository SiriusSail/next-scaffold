import App from 'next/app';
import { getCookie, isServer, getUrlData } from '../hoc/commonService';
import PcCon from "../pcCommComponents/PcCon";
import MobileCon from "../commComponents/MobileCon";
const isPcOrMobile = require("../nodeApi/isPc");
import { Provider } from 'react-redux';
import withReduxStore from '../lib/with-redux-store';
// import 'antd/dist/antd.css'
class MyApp extends App {

    static getInitialProps = async ({Component, ctx}) => {
        let pageProps;
        let isPc;
        if(isServer) {
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
        const { Component, pageProps, isPc, reduxStore } = this.props;

        return (
            <Provider store={reduxStore}>
                {isPc?
                    <PcCon>
                        <Component {...this.props}/>
                    </PcCon>
                    : <MobileCon>
                        <Component {...this.props}/>
                    </MobileCon> }

            </Provider>
        )
    }
}

export default withReduxStore(MyApp);