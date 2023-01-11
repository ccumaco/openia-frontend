import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()
export const copy = async (text: string) => {
    try {
      await toClipboard(text)
    } catch (e) {
      console.error(e)
    }
  }