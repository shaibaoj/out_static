!function($){function rotateLeft(lValue,iShiftBits){return lValue<<iShiftBits|lValue>>>32-iShiftBits}function addUnsigned(lX,lResult){var lX8=2147483648&lX,lY8=2147483648&lResult,lX4=1073741824&lX,lY4=1073741824&lResult,lResult=(1073741823&lX)+(1073741823&lResult);return lX4&lY4?2147483648^lResult^lX8^lY8:lX4|lY4?1073741824&lResult?3221225472^lResult^lX8^lY8:1073741824^lResult^lX8^lY8:lResult^lX8^lY8}function FF(a,b,c,d,x,s,ac){return a=addUnsigned(a,addUnsigned(addUnsigned(function(x,y,z){return x&y|~x&z}(b,c,d),x),ac)),addUnsigned(rotateLeft(a,s),b)}function GG(a,b,c,d,x,s,ac){return a=addUnsigned(a,addUnsigned(addUnsigned(function(x,y,z){return x&z|y&~z}(b,c,d),x),ac)),addUnsigned(rotateLeft(a,s),b)}function HH(a,b,c,d,x,s,ac){return a=addUnsigned(a,addUnsigned(addUnsigned(b^c^d,x),ac)),addUnsigned(rotateLeft(a,s),b)}function II(a,b,c,d,x,s,ac){return a=addUnsigned(a,addUnsigned(addUnsigned(c^(b|~d),x),ac)),addUnsigned(rotateLeft(a,s),b)}function wordToHex(lValue){for(var WordToHexValue="",WordToHexValueTemp="",lCount=0;lCount<=3;lCount++)WordToHexValue+=(WordToHexValueTemp="0"+(lValue>>>8*lCount&255).toString(16)).substr(WordToHexValueTemp.length-2,2);return WordToHexValue}$.extend({md5:function(string){Array();for(var AA,BB,CC,DD,x=function(string){for(var lWordCount,lMessageLength=string.length,lNumberOfWords=lMessageLength+8,lNumberOfWords=16*(1+(lNumberOfWords-lNumberOfWords%64)/64),lWordArray=Array(lNumberOfWords-1),lBytePosition=0,lByteCount=0;lByteCount<lMessageLength;)lBytePosition=lByteCount%4*8,lWordArray[lWordCount=(lByteCount-lByteCount%4)/4]=lWordArray[lWordCount]|string.charCodeAt(lByteCount)<<lBytePosition,lByteCount++;return lWordArray[lWordCount=(lByteCount-lByteCount%4)/4]=lWordArray[lWordCount]|128<<(lBytePosition=lByteCount%4*8),lWordArray[lNumberOfWords-2]=lMessageLength<<3,lWordArray[lNumberOfWords-1]=lMessageLength>>>29,lWordArray}(string=function(string){string=string.replace(/\x0d\x0a/g,"\n");for(var output="",n=0;n<string.length;n++){var c=string.charCodeAt(n);c<128?output+=String.fromCharCode(c):(127<c&&c<2048?output+=String.fromCharCode(c>>6|192):(output+=String.fromCharCode(c>>12|224),output+=String.fromCharCode(c>>6&63|128)),output+=String.fromCharCode(63&c|128))}return output}(string)),a=1732584193,b=4023233417,c=2562383102,d=271733878,k=0;k<x.length;k+=16)a=FF(AA=a,BB=b,CC=c,DD=d,x[k+0],7,3614090360),d=FF(d,a,b,c,x[k+1],12,3905402710),c=FF(c,d,a,b,x[k+2],17,606105819),b=FF(b,c,d,a,x[k+3],22,3250441966),a=FF(a,b,c,d,x[k+4],7,4118548399),d=FF(d,a,b,c,x[k+5],12,1200080426),c=FF(c,d,a,b,x[k+6],17,2821735955),b=FF(b,c,d,a,x[k+7],22,4249261313),a=FF(a,b,c,d,x[k+8],7,1770035416),d=FF(d,a,b,c,x[k+9],12,2336552879),c=FF(c,d,a,b,x[k+10],17,4294925233),b=FF(b,c,d,a,x[k+11],22,2304563134),a=FF(a,b,c,d,x[k+12],7,1804603682),d=FF(d,a,b,c,x[k+13],12,4254626195),c=FF(c,d,a,b,x[k+14],17,2792965006),b=FF(b,c,d,a,x[k+15],22,1236535329),a=GG(a,b,c,d,x[k+1],5,4129170786),d=GG(d,a,b,c,x[k+6],9,3225465664),c=GG(c,d,a,b,x[k+11],14,643717713),b=GG(b,c,d,a,x[k+0],20,3921069994),a=GG(a,b,c,d,x[k+5],5,3593408605),d=GG(d,a,b,c,x[k+10],9,38016083),c=GG(c,d,a,b,x[k+15],14,3634488961),b=GG(b,c,d,a,x[k+4],20,3889429448),a=GG(a,b,c,d,x[k+9],5,568446438),d=GG(d,a,b,c,x[k+14],9,3275163606),c=GG(c,d,a,b,x[k+3],14,4107603335),b=GG(b,c,d,a,x[k+8],20,1163531501),a=GG(a,b,c,d,x[k+13],5,2850285829),d=GG(d,a,b,c,x[k+2],9,4243563512),c=GG(c,d,a,b,x[k+7],14,1735328473),b=GG(b,c,d,a,x[k+12],20,2368359562),a=HH(a,b,c,d,x[k+5],4,4294588738),d=HH(d,a,b,c,x[k+8],11,2272392833),c=HH(c,d,a,b,x[k+11],16,1839030562),b=HH(b,c,d,a,x[k+14],23,4259657740),a=HH(a,b,c,d,x[k+1],4,2763975236),d=HH(d,a,b,c,x[k+4],11,1272893353),c=HH(c,d,a,b,x[k+7],16,4139469664),b=HH(b,c,d,a,x[k+10],23,3200236656),a=HH(a,b,c,d,x[k+13],4,681279174),d=HH(d,a,b,c,x[k+0],11,3936430074),c=HH(c,d,a,b,x[k+3],16,3572445317),b=HH(b,c,d,a,x[k+6],23,76029189),a=HH(a,b,c,d,x[k+9],4,3654602809),d=HH(d,a,b,c,x[k+12],11,3873151461),c=HH(c,d,a,b,x[k+15],16,530742520),b=HH(b,c,d,a,x[k+2],23,3299628645),a=II(a,b,c,d,x[k+0],6,4096336452),d=II(d,a,b,c,x[k+7],10,1126891415),c=II(c,d,a,b,x[k+14],15,2878612391),b=II(b,c,d,a,x[k+5],21,4237533241),a=II(a,b,c,d,x[k+12],6,1700485571),d=II(d,a,b,c,x[k+3],10,2399980690),c=II(c,d,a,b,x[k+10],15,4293915773),b=II(b,c,d,a,x[k+1],21,2240044497),a=II(a,b,c,d,x[k+8],6,1873313359),d=II(d,a,b,c,x[k+15],10,4264355552),c=II(c,d,a,b,x[k+6],15,2734768916),b=II(b,c,d,a,x[k+13],21,1309151649),a=II(a,b,c,d,x[k+4],6,4149444226),d=II(d,a,b,c,x[k+11],10,3174756917),c=II(c,d,a,b,x[k+2],15,718787259),b=II(b,c,d,a,x[k+9],21,3951481745),a=addUnsigned(a,AA),b=addUnsigned(b,BB),c=addUnsigned(c,CC),d=addUnsigned(d,DD);return(wordToHex(a)+wordToHex(b)+wordToHex(c)+wordToHex(d)).toLowerCase()}})}(jQuery);