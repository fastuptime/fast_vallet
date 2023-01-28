const axios = require('axios');
const form = require('form-data');
const crypto = require('crypto');
const buffer = require('buffer');

function createPaymentLink(data, callback) {
    if(!data.userName) throw new Error('userName is required');
    if(!data.referer) throw new Error('referer is required');
    if(!data.hash) throw new Error('hash is required Api Hash Anahtarı');
    if(!data.password) throw new Error('password is required');
    if(!data.shopCode) throw new Error('shopCode is required');
    if(!data.productName) throw new Error('productName is required');
    if(!data.productData)  throw new Error('productData is required');
    if(!data.productType) throw new Error('productType is required');
    if(!data.productsTotalPrice) throw new Error('productsTotalPrice is required');
    if(!data.orderPrice) throw new Error('orderPrice is required');
    if(!data.currency) throw new Error('currency is required');
    if(!data.orderId) throw new Error('orderId is required');
    if(!data.locale) throw new Error('locale is required');
    if(!data.conversationId) throw new Error('conversationId is required');
    if(!data.buyerName) throw new Error('buyerName is required');
    if(!data.buyerSurName) throw new Error('buyerSurName is required');
    if(!data.buyerGsmNo) throw new Error('buyerGsmNo is required');
    if(!data.buyerMail) throw new Error('buyerMail is required');
    if(!data.buyerIp) throw new Error('buyerIp is required');
    if(!data.buyerAdress) throw new Error('buyerAdress is required');
    if(!data.BuyerCountry) throw new Error('BuyerCountry is required');
    if(!data.BuyerCity) throw new Error('BuyerCity is required');
    if(!data.buyerDistrict) throw new Error('buyerDistrict is required');
    if(!data.callbackOkUrl) throw new Error('callbackOkUrl is required');
    if(!data.callbackFailUrl) throw new Error('callbackFailUrl is required');

    const userName = data.userName;
    const password = data.password;
    const shopCode = data.shopCode;
    const string = data.orderPrice + data.currency + data.orderPrice + data.productsTotalPrice + data.productType + data.callbackOkUrl + data.callbackFailUrl;
    const hash = data.hash;

    const sha1Hash = crypto.createHash('sha1').update(userName + password + shopCode + string + hash).digest('hex');
    const packedHash = buffer.Buffer.from(sha1Hash, 'hex');
    const base64EncodedHash = packedHash.toString('base64');
    data.hash = base64EncodedHash;

    const formdata = new form();
    for (const key in data) {
        formdata.append(key, data[key]);
    }
    axios({
        method: 'post',
        url: 'https://www.vallet.com.tr/api/v1/create-payment-link',
        data: formdata,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Referer': data.referer,
        }
    }).then((response) => {
        callback(response.data);
    }).catch((error) => {
        callback(error);
    });
}

module.exports = { createPaymentLink };