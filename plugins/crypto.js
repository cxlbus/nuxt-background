import Vue from 'vue'
import crypto from 'crypto'

class Crypto {
  constructor() {

  }

  md5(string) {
    let hash = crypto.createHash('md5')
    hash.update(string)
    return hash.digest('hex')
  }

  cipher(password, key) {
    var encrypted = ''
    var cip = crypto.createCipher('aes192', key)
    encrypted += cip.update(password, 'utf8', 'base64')
    encrypted += cip.final('base64')
    return encrypted
  }

//解密
  decipher(encrypted, key) {
    var decrypted = ''
    var decipher = crypto.createDecipher('aes192', key)
    decrypted += decipher.update(encrypted,'base64', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  }
}

const a = new Crypto()
export default ({ app }, inject) => {
  inject('crypto', (string) => {
    return a
  })
}
