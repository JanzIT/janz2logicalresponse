/** @type {import('next-i18next').UserConfig} */
const path = require('path')

module.exports = {
    i18n: {
        defaultLocale: 'pt',
        locales: ['en', 'es', 'pt'],
    },
    localePath: path.resolve('./public/locales'),
    localeStructure: '{{lng}}/{{ns}}',
}