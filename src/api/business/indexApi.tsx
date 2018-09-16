import HttpClient from '../iHttpImp'

export function getIndexData () {
    return HttpClient.get('/mock')
}