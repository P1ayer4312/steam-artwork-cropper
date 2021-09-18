(()=>{"use strict";var e,r={53:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.deinterlace=void 0,r.deinterlace=function(e,r){for(var t=new Array(e.length),n=e.length/r,i=function(n,i){var a=e.slice(i*r,(i+1)*r);t.splice.apply(t,[n*r,r].concat(a))},a=[0,4,2,1],o=[8,8,4,2],d=0,s=0;s<4;s++)for(var u=a[s];u<n;u+=o[s])i(u,d),d++;return t}},119:(e,r,t)=>{r.zw=r.vq=void 0;var n,i=(n=t(674))&&n.__esModule?n:{default:n},a=t(50),o=t(673),d=t(53),s=t(188);r.vq=function(e){var r=new Uint8Array(e);return(0,a.parse)((0,o.buildStream)(r),i.default)};r.zw=function(e,r){return e.frames.filter((function(e){return e.image})).map((function(t){return function(e,r,t){if(e.image){var n=e.image,i=n.descriptor.width*n.descriptor.height,a=(0,s.lzw)(n.data.minCodeSize,n.data.blocks,i);n.descriptor.lct.interlaced&&(a=(0,d.deinterlace)(a,n.descriptor.width));var o={pixels:a,dims:{top:e.image.descriptor.top,left:e.image.descriptor.left,width:e.image.descriptor.width,height:e.image.descriptor.height}};return n.descriptor.lct&&n.descriptor.lct.exists?o.colorTable=n.lct:o.colorTable=r,e.gce&&(o.delay=10*(e.gce.delay||10),o.disposalType=e.gce.extras.disposal,e.gce.extras.transparentColorGiven&&(o.transparentIndex=e.gce.transparentColorIndex)),t&&(o.patch=function(e){for(var r=e.pixels.length,t=new Uint8ClampedArray(4*r),n=0;n<r;n++){var i=4*n,a=e.pixels[n],o=e.colorTable[a]||[0,0,0];t[i]=o[0],t[i+1]=o[1],t[i+2]=o[2],t[i+3]=a!==e.transparentIndex?255:0}return t}(o)),o}console.warn("gif frame does not have associated image.")}(t,e.gct,r)}))}},188:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.lzw=void 0,r.lzw=function(e,r,t){var n,i,a,o,d,s,u,c,l,f,p,y,g,v,h,x,B=4096,m=t,w=new Array(t),b=new Array(B),k=new Array(B),A=new Array(4097);for(d=1+(i=1<<(f=e)),n=i+2,u=-1,a=(1<<(o=f+1))-1,c=0;c<i;c++)b[c]=0,k[c]=c;for(p=y=g=v=h=x=0,l=0;l<m;){if(0===v){if(y<o){p+=r[x]<<y,y+=8,x++;continue}if(c=p&a,p>>=o,y-=o,c>n||c==d)break;if(c==i){a=(1<<(o=f+1))-1,n=i+2,u=-1;continue}if(-1==u){A[v++]=k[c],u=c,g=c;continue}for(s=c,c==n&&(A[v++]=g,c=u);c>i;)A[v++]=k[c],c=b[c];g=255&k[c],A[v++]=g,n<B&&(b[n]=u,k[n]=g,0==(++n&a)&&n<B&&(o++,a+=n)),u=s}v--,w[h++]=A[v],l++}for(l=h;l<m;l++)w[l]=0;return w}},50:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.loop=r.conditional=r.parse=void 0,r.parse=function e(r,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:n;if(Array.isArray(t))t.forEach((function(t){return e(r,t,n,i)}));else if("function"==typeof t)t(r,n,i,e);else{var a=Object.keys(t)[0];Array.isArray(t[a])?(i[a]={},e(r,t[a],n,i[a])):i[a]=t[a](r,n,i,e)}return n},r.conditional=function(e,r){return function(t,n,i,a){r(t,n,i)&&a(t,e,n,i)}},r.loop=function(e,r){return function(t,n,i,a){for(var o=[];r(t,n,i);){var d={};a(t,e,n,d),o.push(d)}return o}}},673:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.readBits=r.readArray=r.readUnsigned=r.readString=r.peekBytes=r.readBytes=r.peekByte=r.readByte=r.buildStream=void 0,r.buildStream=function(e){return{data:e,pos:0}};r.readByte=function(){return function(e){return e.data[e.pos++]}},r.peekByte=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return function(r){return r.data[r.pos+e]}};var t=function(e){return function(r){return r.data.subarray(r.pos,r.pos+=e)}};r.readBytes=t,r.peekBytes=function(e){return function(r){return r.data.subarray(r.pos,r.pos+e)}},r.readString=function(e){return function(r){return Array.from(t(e)(r)).map((function(e){return String.fromCharCode(e)})).join("")}},r.readUnsigned=function(e){return function(r){var n=t(2)(r);return e?(n[1]<<8)+n[0]:(n[0]<<8)+n[1]}},r.readArray=function(e,r){return function(n,i,a){for(var o="function"==typeof r?r(n,i,a):r,d=t(e),s=new Array(o),u=0;u<o;u++)s[u]=d(n);return s}},r.readBits=function(e){return function(r){for(var t=function(e){return e.data[e.pos++]}(r),n=new Array(8),i=0;i<8;i++)n[7-i]=!!(t&1<<i);return Object.keys(e).reduce((function(r,t){var i=e[t];return i.length?r[t]=function(e,r,t){for(var n=0,i=0;i<t;i++)n+=e[r+i]&&Math.pow(2,t-i-1);return n}(n,i.index,i.length):r[t]=n[i.index],r}),{})}}},674:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n=t(50),i=t(673),a={blocks:function(e){for(var r=[],t=e.data.length,n=0,a=(0,i.readByte)()(e);0!==a;a=(0,i.readByte)()(e)){if(e.pos+a>=t){var o=t-e.pos;r.push((0,i.readBytes)(o)(e)),n+=o;break}r.push((0,i.readBytes)(a)(e)),n+=a}for(var d=new Uint8Array(n),s=0,u=0;u<r.length;u++)d.set(r[u],s),s+=r[u].length;return d}},o=(0,n.conditional)({gce:[{codes:(0,i.readBytes)(2)},{byteSize:(0,i.readByte)()},{extras:(0,i.readBits)({future:{index:0,length:3},disposal:{index:3,length:3},userInput:{index:6},transparentColorGiven:{index:7}})},{delay:(0,i.readUnsigned)(!0)},{transparentColorIndex:(0,i.readByte)()},{terminator:(0,i.readByte)()}]},(function(e){var r=(0,i.peekBytes)(2)(e);return 33===r[0]&&249===r[1]})),d=(0,n.conditional)({image:[{code:(0,i.readByte)()},{descriptor:[{left:(0,i.readUnsigned)(!0)},{top:(0,i.readUnsigned)(!0)},{width:(0,i.readUnsigned)(!0)},{height:(0,i.readUnsigned)(!0)},{lct:(0,i.readBits)({exists:{index:0},interlaced:{index:1},sort:{index:2},future:{index:3,length:2},size:{index:5,length:3}})}]},(0,n.conditional)({lct:(0,i.readArray)(3,(function(e,r,t){return Math.pow(2,t.descriptor.lct.size+1)}))},(function(e,r,t){return t.descriptor.lct.exists})),{data:[{minCodeSize:(0,i.readByte)()},a]}]},(function(e){return 44===(0,i.peekByte)()(e)})),s=(0,n.conditional)({text:[{codes:(0,i.readBytes)(2)},{blockSize:(0,i.readByte)()},{preData:function(e,r,t){return(0,i.readBytes)(t.text.blockSize)(e)}},a]},(function(e){var r=(0,i.peekBytes)(2)(e);return 33===r[0]&&1===r[1]})),u=(0,n.conditional)({application:[{codes:(0,i.readBytes)(2)},{blockSize:(0,i.readByte)()},{id:function(e,r,t){return(0,i.readString)(t.blockSize)(e)}},a]},(function(e){var r=(0,i.peekBytes)(2)(e);return 33===r[0]&&255===r[1]})),c=(0,n.conditional)({comment:[{codes:(0,i.readBytes)(2)},a]},(function(e){var r=(0,i.peekBytes)(2)(e);return 33===r[0]&&254===r[1]})),l=[{header:[{signature:(0,i.readString)(3)},{version:(0,i.readString)(3)}]},{lsd:[{width:(0,i.readUnsigned)(!0)},{height:(0,i.readUnsigned)(!0)},{gct:(0,i.readBits)({exists:{index:0},resolution:{index:1,length:3},sort:{index:4},size:{index:5,length:3}})},{backgroundColorIndex:(0,i.readByte)()},{pixelAspectRatio:(0,i.readByte)()}]},(0,n.conditional)({gct:(0,i.readArray)(3,(function(e,r){return Math.pow(2,r.lsd.gct.size+1)}))},(function(e,r){return r.lsd.gct.exists})),{frames:(0,n.loop)([o,u,c,d,s],(function(e){var r=(0,i.peekByte)()(e);return 33===r||44===r}))}];r.default=l}},t={};e=function e(n){var i=t[n];if(void 0!==i)return i.exports;var a=t[n]={exports:{}};return r[n](a,a.exports,e),a.exports}(119),window.gifuct={parseGIF:e.vq,decompressFrames:e.zw}})();