/*
 * @Author: your name
 * @Date: 2020-01-08 18:31:03
 * @LastEditTime: 2020-01-08 18:56:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \xianxiapai-admin\src\lang\index.js
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import elementEsLocale from 'element-ui/lib/locale/lang/es'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'
import esLocale from './es'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  es: {
    ...esLocale,
    ...elementEsLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: Cookies.get('language') || 'zh',
  // set locale messages
  messages
})

export default i18n
