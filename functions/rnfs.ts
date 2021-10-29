const rnfs = require('react-native-fs');

const uploadUrl = '';

interface Files {
    name: string;
    filename: string;
    filepath: string;
    filetype: string;
}

const uploadBegin = (response: any) => {
    const jobId = response.jobId;
    console.log(`Uploading ${jobId}`);
}

const uploadProgress = (response: any) => {
    let percentage = Math.floor((response.totalBytesSent/response.totalBytesExpectedToSend)*100);
    console.log(`Uploading ${percentage}`);
}

const uploadFiles = (files: [Files]) => {
    rnfs.uploadFiles({
        toUrl: uploadUrl,
        files: files,
        method: 'POST',
        headers: { 
            'Accept': 'application/json',
        },
        fields: {

        },
        begin: uploadBegin,
        progress: uploadProgress,
    }).promise.then((response: any) => {
        if (response.statusCode == 200) {
            console.log('UPLOAD SUCCESS');
        } else {
            console.log('SERVER ERROR');
        }
    }).catch((err: any) => {
        if(err.description != "cancelled") {
            console.error(err);
        }
    })
}

export default uploadFiles;