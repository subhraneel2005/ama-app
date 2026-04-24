import FingerprintJS from '@fingerprintjs/fingerprintjs'

export const fpPromise = FingerprintJS.load();

const fp = await fpPromise
    const fpResult = await fp.get()

    if(!fpResult){
      console.error("fingerprint result malformed");
    }

    console.log("user fingerprint: ", JSON.stringify(fpResult)); //remove this log, only for tsting purpose in development