import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { storage } from "../FirebaseInitialize/firebaseApp"

const metadata = {
    contentType: 'image/jpeg',
};

function getUrlFromConsole(storageUrl) {
    const storageRef = ref(storage, storageUrl)

    return getDownloadURL(storageRef)
}

function uploadPictureStorage(file, locationfire) {
    const storageRef = ref(storage, locationfire)
    
    console.log(file);

    return uploadBytes(storageRef, file, metadata);
}
export { getUrlFromConsole, uploadPictureStorage }