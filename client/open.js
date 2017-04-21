import xr from 'xr';

export default function(path) {
    xr.post('/api/open', {}, { params: { path } });
}
