export default function (obj) {
    return JSON.stringify(obj).replace(/[{}"']/g, '').replace(/:/g, '=').replace(',', '&')
}
