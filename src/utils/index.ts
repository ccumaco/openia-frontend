import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()

export const removeTags = (str: string) => {
  if ((str===null) || (str===''))
      return '';
  else
      str = str.toString();
        
  // Regular expression to identify HTML tags in 
  // the input string. Replacing the identified 
  // HTML tag with a null string.
  return str.replace( /(<([^>]+)>)/ig, '');
}
export const copy = async (text: string) => {
  try {
    await toClipboard(removeTags(text))
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

export const makeScroll = () => {
  const parentConversation = document.querySelector('.el_cont--scroll')
  if (parentConversation) {
      console.log(parentConversation);
      setTimeout(() => {
        parentConversation.scroll(0,parentConversation.scrollHeight + 200)
      }, 100);
  }
}

export const hasHistory = () => window.history.length > 2