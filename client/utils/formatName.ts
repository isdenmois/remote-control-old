
export default function (name: string, parentName: string = '') {
    const result = parentName.length > 0 ? name.replace(parentName, '') : name
    return result
        .replace(/(3xRus|ru|en|eng|rus)\./gi, '.')
        .replace(/(1080p|720p|480p|1080i|pk|1024x)/gi, '')
        .replace(/(mkv|avi|ts|m4v|m4b)$/gi, '')
        .replace(/(webrip|x264|5\.1|dd|HDTVRip|BDRip|WEB-DLRip|XviD|HDTV|WEB-DL|BluRay|BD|SD)/gi, '')
        .replace(/(GeneralFilm|HDCLUB|Кравец|Doc66|\(\)|\[])/gi, '')
        .replace(/([_.\/\\])/g, ' ')
}
