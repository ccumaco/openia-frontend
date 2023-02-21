import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()

const removeTags = (str: string) => {
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
  const content = document.querySelectorAll('.container-social__content')
  if (content) {
    content[1].scrollIntoView({ behavior: 'smooth' });
  }
}

export const hasHistory = () => window.history.length > 2