export default function (obj) {
    return JSON.stringify().replace(/[{}"']/g, '').replace(/:/g, '=').replace(',', '&')
}
