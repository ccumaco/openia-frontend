import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()
export const copy = async (text: string) => {
    try {
      await toClipboard(text)
      return true
    } catch (e) {
      console.error(e)
      return false
    }
}
export const capitalize = (str: string) => {
    if (str) {
      return str.replace(/\b[a-z]/gi, function (char) {
          return char.toUpperCase();
      });
    } else {
      return ''
    }
}
export const hasHistory = () => window.history.length > 2