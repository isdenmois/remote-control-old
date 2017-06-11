
export default function (name: string, parentName: string = '') {
    const result = parentName.length > 0 ? name.replace(parentName, '') : name
    return result
        .replace(/(\.ru\.|\.en\.|\.eng\.|\.rus\.)/gi, '.')
        .replace(/(1080p|720p)/gi, '')
        .replace(/(mkv|avi)/gi, '')
        .replace(/(webrip|x264|5\.1|dd|HDTVRip|BDRip|WEB-DLRip|XviD)/gi, '')
        .replace(/([_.\/\\])/g, ' ')
}
