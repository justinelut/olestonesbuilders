import payload from 'payload';
import APIError from 'payload/dist/errors/APIError';
import formatPhoneNumber from './formatphone';
import stkpush from './stkpush'


const usedReferenceNumbers = new Set();

function generateUniqueReferenceNumber(prefix, length) {
    let referenceNumber;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    do {
        referenceNumber = `${prefix}-`;
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            const randomChar = characters.charAt(randomIndex);
            referenceNumber += randomChar;
        }
    } while (usedReferenceNumbers.has(referenceNumber));
    usedReferenceNumbers.add(referenceNumber);
    return referenceNumber;
}

const referenceNumber = generateUniqueReferenceNumber('PL', 10);

const mpesa = stkpush(
    "x2N25naO2xU8F372IGtnAll8ZBAmgT0Y",
    "TVFuEp2Jd7PVhd8x",
    "174379",
    "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
    referenceNumber,
    "Ole Interior"
);

export const processPayment = async ({ data, req }) => {
    const phoneNumber = formatPhoneNumber(data.phonenumber.toString())
    console.log(req.query)
    if (req.body && req.body.user) {
        const url = `https://justinedev.verixr.com/api/payments?userid=${req.body.user.id}&productid=${req.body.productid}&phonenumber=${phoneNumber}`;
        const results = await mpesa.pay(data.amount, phoneNumber, url).catch(err => {
            if (err) {
                throw new APIError({ msg: "Payment was not initiated" });
            }
        })
        console.log(results)
        if (results.ResponseCode == 0) {
            data = { phonenumber: data.phonenumber, paymentstatus: "Payment initiated" }
            return data
        }
    }
}

function FormatResponse(response, userId, productId) {
    const data = {
        userId,
        productId,
    };

    if (response.Body.stkCallback.ResultCode === 0) {
        const items = response.Body.stkCallback.CallbackMetadata.Item;
        items.forEach((item) => {
            if (item.Name && item.Value) {
                data[item.Name] = item.Value;
            }
        });
    }

    return data;
}


export const SavePayment = async ({ data, req, }) => {
    const results = FormatResponse(req.body, req.query.userid, req.query.productid)
    const IfExistMpesaCode = await payload.find({
        collection: 'payments',
        where: {
            MpesaReceiptNumber: {
                equals: results.MpesaReceiptNumber
            },
        }
    })

    if (IfExistMpesaCode) {
        const findTransactionByMpesaReceiptNumber = (transactions, mpesaReceiptNumber) => {
            return transactions.find(transaction => transaction.MpesaReceiptNumber === mpesaReceiptNumber);
        };
        const foundTransaction = findTransactionByMpesaReceiptNumber(IfExistMpesaCode.docs, "RDQ73RK1QPGJH");
        if (!foundTransaction || foundTransaction == null) {
            if (req.query.userid && req.query.productid) {
                const statuscode = req.body.Body.stkCallback.ResultCode
                if (statuscode == 1019) {
                    console.log(req.body)
                    throw new APIError({ msg: "Transaction has expired" });
                } else if (statuscode == 1037) {
                    console.log(req.body)
                    throw new APIError({ msg: "Transaction has timedout" });
                } else if (statuscode == 1032) {
                    console.log(req.body)
                    throw new APIError({ msg: "The user has canceled the transaction" });
                } else if (statuscode == 2001) {
                    console.log(req.body)
                    throw new APIError({ msg: "The Phone Number provided is invalid" });
                } else {
                    const results = FormatResponse(req.body, req.query.userid, req.query.productid)
                    const users = await payload.findByID({
                        collection: 'users',
                        id: req.query.userid,
                    })
                    const updated = payload.update({
                        collection: "users", // required
                        id: users.id, // required
                        data: {
                            accbalance: users.accbalance + parseInt(results.Amount)
                        },
                    });
                    if (updated)
                        return results
                    return null
                }
            }

        } else {
            return null
        }
    }


    return null
}
