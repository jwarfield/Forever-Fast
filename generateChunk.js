!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.tooloud=t():n.tooloud=t()}(this,function(){return function(n){function t(e){if(r[e])return r[e].exports;var o=r[e]={exports:{},id:e,loaded:!1};return n[e].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=n,t.c=r,t.p="",t(0)}([function(n,t,r){n.exports=r(1)},function(n,t,r){var e=r(2),o=r(3),u=r(4),f=r(5),i=new e,c=new o,a=new u,x=new f;n.exports={Perlin:{noise:i.noise,setSeed:i.setSeed,create:function(n){return new e(n)}},Simplex:{noise:c.noise,setSeed:c.setSeed,create:function(n){return new o(n)}},Worley:{Euclidean:a.Euclidean,Manhattan:a.Manhattan,setSeed:a.setSeed,create:function(n){return new u(n)}},Fractal:{noise:x.noise,create:function(){return new f}}}},function(n,t){function r(n){function t(n){a=n?r(n):0}function r(n){return x=n^n>>12,x^=x<<25,x^=x>>27,2*x}function e(n,t,r){return t+n*(r-t)}function o(n){return n*n*n*(n*(6*n-15)+10)}function u(n,t,r,e){var o=15&n,u=8>o?t:r,f=4>o?r:12===o||14===o?t:e;return(0===(1&o)?u:-u)+(0===(2&o)?f:-f)}function f(n,t,r){n+=a,t+=a,r+=a;var f=255&Math.floor(n),i=255&Math.floor(t),x=255&Math.floor(r);n-=Math.floor(n),t-=Math.floor(t),r-=Math.floor(r);var s=o(n),l=o(t),d=o(r),p=c[f]+i,h=c[p]+x,v=c[p+1]+x,M=c[f+1]+i,y=c[M]+x,S=c[M+1]+x;return e(d,e(l,e(s,u(c[h],n,t,r),u(c[y],n-1,t,r)),e(s,u(c[v],n,t-1,r),u(c[S],n-1,t-1,r))),e(l,e(s,u(c[h+1],n,t,r-1),u(c[y+1],n-1,t,r-1)),e(s,u(c[v+1],n,t-1,r-1),u(c[S+1],n-1,t-1,r-1))))}var i=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],c=i.concat(i),a=n?r(n):0;return{noise:f,setSeed:t}}n.exports=r},function(n,t){function r(n){function t(n){M=n?r(n):0}function r(n){return x=n^n>>12,x^=x<<25,x^=x>>27,2*x}function e(n,t){return n>>t&1}function o(n,t,r,o){return v[e(n,o)<<2|e(t,o)<<1|e(r,o)]}function u(n){var t=(h[0]+h[1]+h[2])/6,r=l-h[0]+t,e=d-h[1]+t,o=p-h[2]+t,u=.6-r*r-e*e-o*o,i=f(c+h[0],a+h[1],s+h[2]);if(h[n]++,0>u)return 0;var x=i>>5&1,v=i>>4&1,M=i>>3&1,y=i>>2&1,S=3&i,w=1===S?r:2===S?e:o,z=1===S?e:2===S?o:r,m=1===S?o:2===S?r:e;return w=x===M?-w:w,z=x===v?-z:z,m=x!==(v^M)?-m:m,u*=u,8*u*u*(w+(0===S?z+m:0===y?z:m))}function f(n,t,r){return o(n,t,r,0)+o(t,r,n,1)+o(r,n,t,2)+o(n,t,r,3)+o(t,r,n,4)+o(r,n,t,5)+o(n,t,r,6)+o(t,r,n,7)}function i(n,t,r){n+=M,t+=M,r+=M;var e=(n+t+r)/3;c=Math.floor(n+e),a=Math.floor(t+e),s=Math.floor(r+e),e=(c+a+s)/6,l=n-c+e,d=t-a+e,p=r-s+e,h[0]=h[1]=h[2]=0;var o=l>=p?l>=d?0:1:d>=p?1:2,f=p>l?d>l?0:1:p>d?1:2;return u(o)+u(3-o-f)+u(f)+u(0)}var c,a,s,l,d,p,h=[0,0,0],v=[21,56,50,44,13,19,7,42],M=n?r(n):0;return{noise:i,setSeed:t}}n.exports=r},function(n,t){function r(n){function t(n){d=n}function r(n){return x=n^n>>12,x^=x<<25,x^=x>>27,2*x}function e(n,t,r){return 16777619*(16777619*(16777619*(2166136261^n)^t)^r)&4294967295}function o(n,t){return[n.x-t.x,n.y-t.y,n.z-t.z]}function u(n,t){return o(n,t).reduce(function(n,t){return n+t*t},0)}function f(n,t){return o(n,t).reduce(function(n,t){return n+Math.abs(t)},0)}function i(n){return n=4294967295&n,393325350>n?1:1022645910>n?2:1861739990>n?3:2700834071>n?4:3372109335>n?5:3819626178>n?6:4075350088>n?7:4203212043>n?8:9}function c(n,t){for(var r,e=n.length-1;e>=0&&!(t>n[e]);e--)r=n[e],n[e]=t,e+1<n.length&&(n[e+1]=r)}function a(n,t){for(var o,u,f,a,x,s={x:0,y:0,z:0},l={x:0,y:0,z:0},p=[9999999,9999999,9999999],h=-1;2>h;++h)for(var v=-1;2>v;++v)for(var M=-1;2>M;++M){f=Math.floor(n.x)+h,a=Math.floor(n.y)+v,x=Math.floor(n.z)+M,o=r(e(f+d&4294967295,4294967295&a,4294967295&x)),u=i(o);for(var y=0;u>y;++y)o=r(o),s.X=o/4294967296,o=r(o),s.Y=o/4294967296,o=r(o),s.Z=o/4294967296,l={x:s.X+f,y:s.Y+a,z:s.Z+x},c(p,t(n,l))}return p.map(function(n){return 0>n?0:n>1?1:n})}function s(n,t,r){return a({x:n,y:t,z:r},u)}function l(n,t,r){return a({x:n,y:t,z:r},f)}var d=n?n:3e3;return{Euclidean:s,Manhattan:l,setSeed:t}}n.exports=r},function(n,t){function r(){function n(n,t,r,e,o){for(var u=0,f=1,i=0,c=0;e>c;c++)i+=o(n*f,t*f,r*f)/f,u+=1/f,f*=2;return i/u}return{noise:n}}n.exports=r}])});               

const chunkWidth = 16;
//ex: Chunk coordinate (1,1,1) -> Absolute coordinates of (64, 64, 64).   
//For some (x,y,z) relative to a chunk, calculate the index of the coordinate.
function ridx(x, y, z) {
    return z+y*chunkWidth+x*chunkWidth**2;
}

function noise(x, y, z) {
    var n = tooloud.Worley.Euclidean(x, y, z);
    return Math.floor(255 * (n[2]*n[0]));
} 

//Generate a chunk at some chunk coordinate
const chunkArraySize = 4*chunkWidth**3;
function generateChunk(cx, cy, cz) {
    cx *= chunkWidth;
    cy *= chunkWidth;
    cz *= chunkWidth;
    let buffer = new ArrayBuffer(chunkArraySize);
    let float32View = new Float32Array(buffer);
    for (let i = 0; i < chunkWidth; i++) {
        for (let j = 0; j < chunkWidth; j++) {
            for (let k = 0; k < chunkWidth; k++) {
                let v = 0;
                if (noise((i+cx)*.05,(j+cy)*.05,(k+cz)*.05) > 40) {
                    v = 1
                }
                float32View[ridx(i,j,k)] = v;
            }
        }
    }
    return [[cx/chunkWidth, cy/chunkWidth, cz/chunkWidth], float32View];
}

self.addEventListener("message", function (e) {
    let chunk = generateChunk(e.data[0],e.data[1],e.data[2]);
    self.postMessage(chunk);
}, false)