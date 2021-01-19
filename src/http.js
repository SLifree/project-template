import axios from 'axios';
import qs from "qs";

// 第一种常用请求
axios._var1 = function () {
    let url = "";
    return new Promise((reslove, reject) => {
        axios.get(url, {
            headers: {
                key: "=",
                security: "=",
            },
        }).then(res => reslove(res.data))
            .catch(err => reject(err));
    })
}

// 第二种常用请求create
// *get
const var2 = axios.create({
    baseURL: "/",
    headers: {
        key: '',
        security: '='
    }
})

const var2Api = {
}

axios._var2 = function () {
    const type = arguments[0];
    return new Promise((reslove, reject) => {
        var2.get(var2Api[type]).then(res => reslove(res.data))
            .catch(err => reject(err));
    })
}

// *post
axios._var3= function () {
    const params = arguments[1];
    // 请求 
    const isBody = true;//是不是body传参
    const url = "";
    const data = isBody ? params : qs.stringify(params);

    // headers
    const headers = {}

    const config = { headers };
    return new Promise((reslove, reject) => {
        axios.post(url, data, config).then(res => reslove(res.data))
            .catch(err => reject(err));
    })
}

export default axios;